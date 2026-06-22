import {
    Box,
    Typography,
    AppBar,
    Toolbar,
    IconButton,
    useScrollTrigger,
    Slide,
    Drawer,
    List,
    ListItemText,
    ListItem,
    ListItemButton,
    ListItemIcon,
    Paper,
    Link,
    Button,
    Skeleton,
    Select,
    MenuItem,
    FormControl,
    ListSubheader,
    TextField,
    Popper,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import React, { useState, useEffect, useRef } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CategoryIcon from "@mui/icons-material/Category";
import WidgetsIcon from "@mui/icons-material/Widgets";
import HomeIcon from "@mui/icons-material/Home";
import SourceIcon from "@mui/icons-material/Source";
import BusinessIcon from "@mui/icons-material/Business";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import { toast } from "react-toastify";
import Buyerservice from "../service/buyes.service";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { fetchFlatPage } from "../store/slice/pageSlice";
import QuotationDialog from "../component/Dialog/quote-dialog";
import { fetchFlatCategories } from "../store/slice/categoriesSlice";
import HomePageservice from "../service/homepages.service";
import { setSelectedCountry } from "../store/slice/countrySlice";
import NoDataFound from "../commonUI/NoDataFound";
import CMSservice from "../service/cms.service";

interface Props {
    firstName?: string;
    lastName?: string;
}

function HideOnScroll({ children }: { children: React.ReactElement }) {
    const trigger = useScrollTrigger({ threshold: 50 });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [id, setId] = useState<string>();
    const [profile, setProfile] = useState<Props>();
    const [openRFQ, setOpenRFQ] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
    const [submenuTimeout, setSubmenuTimeout] = useState<NodeJS.Timeout | null>(null);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [menuStack, setMenuStack] = useState<any[]>([]);
    const [countries, setCountries] = useState<string[]>([]);
    const [allCountries, setAllCountries] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [presenceOpen, setPresenceOpen] = useState(true);
    const [allOpen, setAllOpen] = useState(true);
    const [contactNo, setContactNo] = useState<string>("NA");

    const navigate = useNavigate();
    const location = useLocation();
    const navRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch<AppDispatch>();
    const logoSrc = "/logo.jpg";

    useSelector((state: any) => state.page);
    const selectedCountry = useSelector((state: any) => state.country.selectedCountry);

    const { categories, loading: categoriesLoading } = useSelector(
        (state: any) => state.categories
    );

    useEffect(() => {
        const fetchContact = async () => {
            if (selectedCountry) {
                try {
                    const res = await CMSservice.getContactNo(selectedCountry);
                    let responseData = res?.data?.data || res?.data;
                    
                    // If the data is an array, take the first item
                    if (Array.isArray(responseData) && responseData.length > 0) {
                        responseData = responseData[0];
                    }

                    const number = responseData?.contactNo || responseData?.phone || responseData?.contact_number || responseData?.number || (typeof responseData === "string" ? responseData : null);
                    setContactNo(number ? number : "NA");
                } catch (error) {
                    console.error("Failed to fetch contact number", error);
                    setContactNo("NA");
                }
            } else {
                setContactNo("NA");
            }
        };
        fetchContact();
    }, [selectedCountry]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const buyer = localStorage.getItem("buyer");

        if (token && buyer === "true") {
            setIsLoggedIn(true);
            // Remove quotes if the token was stored with JSON.stringify
            setId(token.replace(/^"|"$/g, ''));
        } else {
            setIsLoggedIn(false);
            setId(undefined);
            setProfile(undefined);
        }
    }, [location.pathname]);

    useEffect(() => {
        dispatch(fetchFlatPage());
        dispatch(fetchFlatCategories());

        const getPresencesData = async () => {
            try {
                const response = await HomePageservice.getPresences();
                const fetchedCountries = response?.data?.countries || [];
                setCountries(fetchedCountries);

                if (fetchedCountries.length > 0 && !selectedCountry) {
                    dispatch(setSelectedCountry("India"));
                }
            } catch (error: any) {
                console.log("Presences data not fetch");
            }
        };
        getPresencesData();

        const getAllCountries = async () => {
            try {
                const res = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json");
                const data = await res.json();
                const names = data.objects.countries.geometries.map((g: any) => g.properties.name).sort();
                setAllCountries(names);
            } catch (error) {
                console.log("Failed to fetch all countries");
            }
        };
        getAllCountries();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const handleMouseEnter = (e: React.MouseEvent<HTMLElement>, label: string) => {
        if (submenuTimeout) {
            clearTimeout(submenuTimeout);
            setSubmenuTimeout(null);
        }
        setAnchorEl(e.currentTarget);
        setOpenSubmenu(label);
    };

    const handleMouseLeave = () => {
        const timeout = setTimeout(() => {
            setOpenSubmenu(null);
            setAnchorEl(null);
        }, 150);

        setSubmenuTimeout(timeout);
    };

    const toggleDrawer = (open: boolean) => () => {
        setMobileOpen(open);
        if (!open) setMenuStack([]);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("buyer");
        window.location.reload();
        toast.success("Buyer Logout Successfully");
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setOpenSubmenu(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const getData = async (id: any) => {
            try {
                const res = await Buyerservice.getProfile(id);

                if (res) {
                    setProfile(res?.data);
                }
            } catch (error) {
                toast.error("Buyer Profile not Found");
                handleLogout();
            }
        };

        if (id) {
            getData(id);
        }
    }, [id]);

    const navItems: any[] = [
        {
            label: "Home",
            path: "/",
            icon: <HomeIcon fontSize="small" />,
        },
        {
            label: "Offerings",
            icon: <CategoryIcon fontSize="small" />,
            subItems: (() => {
                const currentCountryData = Array.isArray(categories)
                    ? categories.find((c: any) => c.country === selectedCountry)
                    : null;
                const categoriesList = currentCountryData ? currentCountryData.categories : [];
                return Array.isArray(categoriesList) ? categoriesList.map((category: any) => ({
                    label: category?.name,
                    type: "category",
                    path: `/category/${category?.id}`,
                    subItems:
                        Array.isArray(category?.subcategories) ? category.subcategories.map((subcategory: any) => ({
                            label: subcategory?.name,
                            type: "subcategory",
                            subItems:
                                Array.isArray(subcategory?.products) ? subcategory.products.map((product: any) => ({
                                    label: product?.name,
                                    type: "product",
                                    path: `/product-details/${product?.id}`,
                                })) : [],
                        })) : [],
                })) : [];
            })(),
        },
        {
            label: "Trade Diversity",
            path: "/abc",
            icon: <HomeIcon fontSize="small" />,
        },
        {
            label: "Trade Offers",
            path: "/trade-offers",
            icon: <HomeIcon fontSize="small" />,
        },
        {
            label: "Trade Specific",
            icon: <SourceIcon fontSize="small" />,
            subItems: [
                { label: "Commedium", path: "/commedium" },
                { label: "Trade Bureau", path: "/trade-view" }
            ],
        },
        {
            label: "News & Events",
            path: "/news_and_events",
            icon: <BusinessIcon fontSize="small" />
        },
        {
            label: "IR",
            path: "/investor_relations",
            icon: <BusinessIcon fontSize="small" />
        },
        {
            label: "Initiatives Resources",
            icon: <SourceIcon fontSize="small" />,
            subItems: [
                { label: "ESG", path: "/pages/csr" },
                { label: "Brands", path: "/pages/brands" },
                { label: "Quality Policy", path: "/pages/quality_policies" },
                { label: "FAQ", path: "/pages/faq" },
                { label: "Gallery", path: "/pages/gallery" },
                { label: "About", path: "/about_us" },
                { label: "Career", path: "/pages/career" },
            ],
        },
        {
            label: "Get in Touch",
            path: "/get-in-touch",
            icon: <ContactSupportIcon fontSize="small" />,
        },
    ];

    return (
        <>
            <HideOnScroll>
                <AppBar position="sticky" sx={{ bgcolor: "secondary.main", color: "white" }}>
                    <Toolbar
                        variant="dense"
                        sx={{
                            display: { xs: "none", sm: "flex" },
                            justifyContent: "space-between",
                            minHeight: "40px",
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 600,
                                fontSize: "14px",
                            }}
                        >
                            Welcome to Sourceseas - Best Exporter
                        </Typography>

                        <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 4, alignItems: "center" }}>
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <LocalPhoneIcon sx={{ fontSize: 18, mr: 0.5 }} />
                                {contactNo}
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <AccessTimeIcon sx={{ fontSize: 18, mr: 0.5 }} />
                                Mon-Fri: 9:00am - 8:00pm
                            </Typography>
                        </Box>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>

            <Box sx={{ position: "sticky", top: 0, zIndex: 1100, width: "100%", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}>
                <AppBar
                    position="static"
                    sx={{
                        bgcolor: "white",
                        color: "black",
                        borderBottom: "1px solid #ddd",
                    }}
                >
                    <Toolbar sx={{ display: "flex", justifyContent: "space-between", py: 1 }}>
                        <Link
                            component={RouterLink}
                            to="/"
                            sx={{ display: "flex", gap: 3, alignItems: "center" }}
                        >
                            <img
                                src={logoSrc}
                                alt="logo"
                                style={{
                                    maxWidth: "100%",
                                    height: "auto",
                                    maxHeight: "50px",
                                }}
                            />
                        </Link>

                        <Box
                            sx={{
                                display: { xs: "none", md: "flex" },
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            <FormControl size="small" sx={{ minWidth: 120 }}>
                                <Select
                                    value={selectedCountry || ""}
                                    onChange={(e) => {
                                        const newCountry = e.target.value as string;
                                        if (newCountry) {
                                            dispatch(setSelectedCountry(newCountry));
                                        }
                                    }}
                                    displayEmpty
                                    sx={{
                                        height: 36,
                                        bgcolor: "white",
                                        fontSize: "14px",
                                        fontWeight: 500
                                    }}
                                >
                                    <MenuItem disableRipple sx={{ '&:hover': { bgcolor: 'transparent' }, cursor: 'default', py: 1 }} onKeyDownCapture={(e) => e.stopPropagation()} onClickCapture={(e) => e.stopPropagation()}>
                                        <TextField size="small" placeholder="Search Country..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => e.stopPropagation()} fullWidth />
                                    </MenuItem>
                                    <ListSubheader
                                        sx={{ fontWeight: 700, lineHeight: '30px', bgcolor: '#f5f5f5', color: 'primary.main', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                        onClickCapture={(e) => { e.stopPropagation(); e.preventDefault(); setPresenceOpen(prev => !prev); }}
                                        onMouseDownCapture={(e) => e.stopPropagation()}
                                    >
                                        Presence Country {presenceOpen ? <KeyboardArrowUpIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
                                    </ListSubheader>
                                    {presenceOpen && (Array.isArray(countries) ? countries : []).filter(c => c.toLowerCase().includes(searchQuery.toLowerCase())).map((c) => (
                                        <MenuItem key={`presence-${c}`} value={c}>
                                            {c}
                                        </MenuItem>
                                    ))}
                                    <ListSubheader
                                        sx={{ fontWeight: 700, lineHeight: '30px', bgcolor: '#f5f5f5', color: 'primary.main', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                        onClickCapture={(e) => { e.stopPropagation(); e.preventDefault(); setAllOpen(prev => !prev); }}
                                        onMouseDownCapture={(e) => e.stopPropagation()}
                                    >
                                        All Country {allOpen ? <KeyboardArrowUpIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
                                    </ListSubheader>
                                    {allOpen && allCountries.filter(c => c.toLowerCase().includes(searchQuery.toLowerCase())).map((c) => (
                                        <MenuItem key={`all-${c}`} value={c}>
                                            {c}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {!isLoggedIn ? (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        if (location.pathname === '/') {
                                            const el = document.getElementById('supplier-tab-section');
                                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                                        } else {
                                            navigate("/#supplier-tab-section");
                                        }
                                    }}
                                    sx={{
                                        textTransform: "none",
                                        fontWeight: 600,
                                        px: 3,
                                        borderRadius: "8px",
                                    }}
                                >
                                    Join the Platform
                                </Button>
                            ) : (
                                <>
                                    <Typography
                                        sx={{
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 0.5,
                                            fontSize: "14px",
                                            fontWeight: 500
                                        }}
                                        onClick={() => navigate("/buyer-dashboard")}
                                    >
                                        <AccountCircleIcon sx={{ fontSize: 20 }} />
                                        {profile?.firstName + " " + profile?.lastName}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 0.5,
                                            fontSize: "14px",
                                            fontWeight: 500
                                        }}
                                        onClick={handleLogout}
                                    >
                                        <LoginIcon sx={{ fontSize: 20 }} />
                                        Logout
                                    </Typography>
                                </>
                            )}

                            <Button
                                variant="contained"
                                color="success"
                                sx={{ px: 3, fontWeight: 600 }}
                                onClick={() => setOpenRFQ(true)}
                            >
                                Request for Quote
                            </Button>
                        </Box>

                        <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", gap: 1 }}>
                            <FormControl size="small" sx={{ minWidth: 90 }}>
                                <Select
                                    value={selectedCountry || ""}
                                    onChange={(e) => {
                                        const newCountry = e.target.value as string;
                                        if (newCountry) {
                                            dispatch(setSelectedCountry(newCountry));
                                        }
                                    }}
                                    displayEmpty
                                    sx={{
                                        height: 30,
                                        bgcolor: "white",
                                        fontSize: "12px",
                                        fontWeight: 500
                                    }}
                                >
                                    <MenuItem disableRipple sx={{ '&:hover': { bgcolor: 'transparent' }, cursor: 'default', py: 1 }} onKeyDownCapture={(e) => e.stopPropagation()} onClickCapture={(e) => e.stopPropagation()}>
                                        <TextField size="small" placeholder="Search Country..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => e.stopPropagation()} fullWidth />
                                    </MenuItem>
                                    <ListSubheader
                                        sx={{ fontWeight: 700, lineHeight: '30px', bgcolor: '#f5f5f5', color: 'primary.main', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                        onClickCapture={(e) => { e.stopPropagation(); e.preventDefault(); setPresenceOpen(prev => !prev); }}
                                        onMouseDownCapture={(e) => e.stopPropagation()}
                                    >
                                        Presence Country {presenceOpen ? <KeyboardArrowUpIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
                                    </ListSubheader>
                                    {presenceOpen && (Array.isArray(countries) ? countries : []).filter(c => c.toLowerCase().includes(searchQuery.toLowerCase())).map((c) => (
                                        <MenuItem key={`presence-${c}`} value={c}>
                                            {c}
                                        </MenuItem>
                                    ))}
                                    <ListSubheader
                                        sx={{ fontWeight: 700, lineHeight: '30px', bgcolor: '#f5f5f5', color: 'primary.main', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                        onClickCapture={(e) => { e.stopPropagation(); e.preventDefault(); setAllOpen(prev => !prev); }}
                                        onMouseDownCapture={(e) => e.stopPropagation()}
                                    >
                                        All Country {allOpen ? <KeyboardArrowUpIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
                                    </ListSubheader>
                                    {allOpen && allCountries.filter(c => c.toLowerCase().includes(searchQuery.toLowerCase())).map((c) => (
                                        <MenuItem key={`all-${c}`} value={c}>
                                            {c}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <IconButton
                                onClick={toggleDrawer(true)}
                                sx={{ p: 0.5 }}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>

                <AppBar
                    position="static"
                    sx={{
                        bgcolor: "secondary.dark",
                        display: { xs: "none", md: "flex" },
                    }}
                >
                    <Toolbar
                        ref={navRef}
                        sx={{
                            display: "flex",
                            justifyContent: { xs: "flex-start", md: "center" },
                            gap: 4,
                            position: "relative",
                            overflowX: "auto",
                            whiteSpace: "nowrap",
                            scrollbarWidth: 'none', // For Firefox
                            '&::-webkit-scrollbar': { height: '0px' }, // For Chrome/Safari, hide scrollbar visually but allow scroll
                        }}
                    >
                        {(Array.isArray(navItems) ? navItems : []).map((item) => (
                            <Box
                                key={item.label}
                                sx={{
                                    position: item.label === "Offerings" ? "static" : "relative",
                                    pb: 2,
                                    mb: -2,
                                    display: "flex",
                                    alignItems: "center",
                                    flexShrink: 0,
                                }}
                                onMouseEnter={(e) => handleMouseEnter(e, item.label)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <Typography
                                    onClick={() => item.path && navigate(item.path)}
                                    sx={{
                                        cursor: item.path ? "pointer" : "default",
                                        px: 2,
                                        py: 1,
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 0.5,
                                        fontSize: { xs: "0.95rem", md: "1.1rem" },
                                        color: "white",
                                        fontWeight: 500,
                                        "&:hover": { color: "primary.light" },
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {item.label}

                                    {item.subItems && (
                                        <KeyboardArrowUpIcon
                                            sx={{
                                                fontSize: 20,
                                                ml: 0.5,
                                                transform:
                                                    openSubmenu === item.label
                                                        ? "rotate(0deg)"
                                                        : "rotate(180deg)",
                                                transition: "0.3s",
                                            }}
                                        />
                                    )}
                                </Typography>

                                {item.subItems && (
                                    <Popper
                                        open={openSubmenu === item.label}
                                        anchorEl={item.label === "Offerings" || item.label === "Sectors" ? navRef.current : anchorEl}
                                        placement={item.label === "Offerings" || item.label === "Sectors" ? "bottom" : "bottom-start"}
                                        style={{ zIndex: 1300 }}
                                        onMouseEnter={() => {
                                            if (submenuTimeout) {
                                                clearTimeout(submenuTimeout);
                                                setSubmenuTimeout(null);
                                            }
                                        }}
                                        onMouseLeave={handleMouseLeave}
                                        modifiers={[
                                            {
                                                name: 'offset',
                                                options: {
                                                    offset: [0, 8],
                                                },
                                            },
                                        ]}
                                    >
                                        <Paper
                                            elevation={16}
                                            sx={{
                                                width: item.label === "Offerings" || item.label === "Sectors" ? "840px" : "auto",
                                                maxWidth: "98vw",
                                                overflow: "hidden",
                                                border: "1px solid rgba(0,0,0,0.08)",
                                                backgroundColor: "white",
                                                boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
                                                position: "relative"
                                            }}
                                        >
                                            {item.label === "Offerings" || item.label === "Sectors" ? (
                                                categoriesLoading ? (
                                                    <Box
                                                        sx={{
                                                            p: 4,
                                                            display: "grid",
                                                            gridTemplateColumns: "repeat(4, 1fr)",
                                                            gap: 4,
                                                        }}
                                                    >
                                                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                                            <Box key={i}>
                                                                <Skeleton
                                                                    variant="text"
                                                                    width="60%"
                                                                    height={30}
                                                                />
                                                                <Skeleton variant="text" width="80%" />
                                                                <Skeleton variant="text" width="70%" />
                                                                <Skeleton variant="text" width="75%" />
                                                            </Box>
                                                        ))}
                                                    </Box>
                                                ) : (
                                                    <CategoriesMegaMenu
                                                        items={item.subItems}
                                                        navigate={navigate}
                                                        onClose={() => {
                                                            setOpenSubmenu(null);
                                                            setAnchorEl(null);
                                                        }}
                                                    />
                                                )
                                            ) : (
                                                <NestedMenu
                                                    items={item.subItems}
                                                    navigate={navigate}
                                                    onClose={() => {
                                                        setOpenSubmenu(null);
                                                        setAnchorEl(null);
                                                    }}
                                                />
                                            )}
                                        </Paper>
                                    </Popper>
                                )}
                            </Box>
                        ))}
                    </Toolbar>
                </AppBar>
            </Box>

            <Drawer
                anchor="left"
                open={mobileOpen}
                onClose={toggleDrawer(false)}
                PaperProps={{ sx: { width: { xs: "85%", sm: 320 } } }}
            >
                <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                    <Box
                        sx={{
                            p: 2,
                            borderBottom: "1px solid #eee",
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            bgcolor: "secondary.main",
                            color: "white",
                        }}
                    >
                        <img
                            src={logoSrc}
                            alt="logo"
                            width={40}
                            height={40}
                            style={{ borderRadius: 4 }}
                        />
                        <Typography variant="subtitle1" fontWeight={700}>
                            Menu
                        </Typography>
                    </Box>

                    <List sx={{ flexGrow: 1, overflowY: "auto", py: 0 }}>
                        {menuStack.length > 0 && (
                            <ListItem disablePadding>
                                <ListItemButton
                                    onClick={() => setMenuStack((prev) => prev.slice(0, -1))}
                                >
                                    <ListItemText primary="← Back" />
                                </ListItemButton>
                            </ListItem>
                        )}

                        {menuStack.length > 0 &&
                            menuStack[menuStack.length - 1].label === "Offerings" &&
                            categoriesLoading ? (
                            <Box sx={{ px: 2 }}>
                                <Skeleton variant="text" height={50} />
                                <Skeleton variant="text" height={50} />
                                <Skeleton variant="text" height={50} />
                                <Skeleton variant="text" height={50} />
                            </Box>
                        ) : (
                            (Array.isArray(menuStack.length === 0 ? navItems : menuStack[menuStack.length - 1].subItems)
                                ? (menuStack.length === 0 ? navItems : menuStack[menuStack.length - 1].subItems)
                                : []
                            )?.map((item: any) => (
                                <ListItem key={item.label} disablePadding>
                                    <ListItemButton
                                        onClick={() => {
                                            if (item.subItems && item.subItems.length > 0) {
                                                setMenuStack((prev) => [...prev, item]);
                                            } else if (item.path) {
                                                navigate(item.path);
                                                setMobileOpen(false);
                                                setMenuStack([]);
                                            }
                                        }}
                                        sx={{
                                            py: 1.5,
                                            borderBottom: "1px solid #f9f9f9",
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{ minWidth: 40, color: "secondary.main" }}
                                        >
                                            {item.icon || <WidgetsIcon />}
                                        </ListItemIcon>

                                        <ListItemText
                                            primary={item.label}
                                            primaryTypographyProps={{
                                                fontWeight: 600,
                                                fontSize: "1rem",
                                            }}
                                        />

                                        {item.subItems && item.subItems.length > 0 && (
                                            <KeyboardArrowRightIcon color="disabled" />
                                        )}
                                    </ListItemButton>
                                </ListItem>
                            ))
                        )}
                    </List>

                    <Box
                        sx={{
                            borderTop: "2px solid #f0f0f0",
                            p: 2,
                            bgcolor: "#fafafa",
                        }}
                    >
                        {isLoggedIn ? (
                            <>
                                <ListItem disablePadding>
                                    <ListItemButton
                                        onClick={() => {
                                            navigate("/buyer-dashboard");
                                            setMobileOpen(false);
                                        }}
                                    >
                                        <AccountCircleIcon sx={{ mr: 1 }} />
                                        <ListItemText
                                            primary={`${profile?.firstName ?? ""} ${profile?.lastName ?? ""
                                                }`}
                                        />
                                    </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding>
                                    <ListItemButton
                                        onClick={() => {
                                            handleLogout();
                                            setMobileOpen(false);
                                        }}
                                    >
                                        <LoginIcon sx={{ mr: 1 }} />
                                        <ListItemText primary="Logout" />
                                    </ListItemButton>
                                </ListItem>
                            </>
                        ) : (
                            <>
                                <ListItem disablePadding>
                                    <ListItemButton
                                        onClick={() => {
                                            if (location.pathname === '/') {
                                                const el = document.getElementById('supplier-tab-section');
                                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                                            } else {
                                                navigate("/#supplier-tab-section");
                                            }
                                            setMobileOpen(false);
                                        }}
                                    >
                                        <LoginIcon sx={{ mr: 1 }} />
                                        <ListItemText primary="Join the Platform" />
                                    </ListItemButton>
                                </ListItem>
                            </>
                        )}

                        <Button
                            variant="contained"
                            color="success"
                            size="small"
                            sx={{
                                px: 3,
                                fontWeight: 600,
                                mx: 3,
                                borderTop: "1px solid #ddd",
                                mt: 1,
                            }}
                            onClick={() => setOpenRFQ(true)}
                        >
                            Request for Quote
                        </Button>
                    </Box>
                </Box>
            </Drawer>

            <QuotationDialog open={openRFQ} onClose={() => setOpenRFQ(false)} />
        </>
    );
}

function NestedMenu({
    items,
    navigate,
    onClose,
}: {
    items: any[];
    navigate: any;
    onClose?: () => void;
}) {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <Box sx={{ minWidth: 220 }}>
            {(Array.isArray(items) ? items : []).map((item, index) => (
                <Box
                    key={item.label}
                    sx={{
                        position: "relative",
                        "&:not(:last-child)": { mb: 0.5 },
                    }}
                    onMouseEnter={() => setHovered(index)}
                    onMouseLeave={() => setHovered(null)}
                >
                    <Typography
                        onMouseDown={(e) => {
                            e.preventDefault();
                            if (item.path) {
                                navigate(item.path);
                                if (onClose) onClose();
                            }
                        }}
                        sx={{
                            px: 2,
                            py: 1.2,
                            cursor: item.path ? "pointer" : "default",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            fontSize: "16px",
                            fontWeight: 500,
                            color: "text.primary",
                            transition: "all 0.2s ease-in-out",
                            "&:hover": {
                                bgcolor: "primary.light",
                                color: "primary.dark",
                            },
                        }}
                    >
                        {item.label}

                        {item.subItems?.length > 0 && (
                            <KeyboardArrowRightIcon
                                sx={{
                                    fontSize: 20,
                                    color:
                                        hovered === index
                                            ? "primary.dark"
                                            : "text.secondary",
                                }}
                            />
                        )}
                    </Typography>

                    {item.subItems?.length > 0 && hovered === index && (
                        <Paper
                            elevation={4}
                            sx={{
                                position: "absolute",
                                top: 0,
                                left: "100%",
                                minWidth: 240,
                                zIndex: 999,
                                p: 1,
                                borderRadius: 2,
                            }}
                        >
                            <NestedMenu items={item.subItems} navigate={navigate} onClose={onClose} />
                        </Paper>
                    )}
                </Box>
            ))}
        </Box>
    );
}

function CategoriesMegaMenu({
    items,
    navigate,
    onClose,
}: {
    items: any[];
    navigate: any;
    onClose: () => void;
}) {
    const [hoveredCategory, setHoveredCategory] = useState<any>(items[0] || null);
    const [hoveredSubcategory, setHoveredSubcategory] = useState<any>(null);

    useEffect(() => {
        setHoveredCategory(items[0] || null);
        setHoveredSubcategory(null);
    }, [items]);

    useEffect(() => {
        setHoveredSubcategory(null);
    }, [hoveredCategory]);

    return (
        <Box sx={{ display: "flex", height: 550, width: 840 }}>
            <Box
                sx={{
                    width: 260,
                    flexShrink: 0,
                    borderRight: "1px solid",
                    borderColor: "divider",
                    bgcolor: "#fcfcfc",
                    overflowY: "auto",
                }}
            >
                <List sx={{ p: 0 }}>
                    {(Array.isArray(items) ? items : []).map((category: any) => (
                        <ListItem key={category.label} disablePadding>
                            <ListItemButton
                                onMouseEnter={() => setHoveredCategory(category)}
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    if (category.path) {
                                        navigate(category.path);
                                        onClose();
                                    }
                                }}
                                selected={hoveredCategory?.label === category.label}
                                sx={{
                                    py: 1.5,
                                    px: 2,
                                    "&.Mui-selected": {
                                        bgcolor: "primary.light",
                                        color: "primary.dark",
                                        "& .MuiListItemIcon-root": {
                                            color: "primary.dark",
                                        },
                                    },
                                    "&:hover": {
                                        bgcolor: "primary.light",
                                    },
                                }}
                            >
                                <ListItemText
                                    primary={category.label}
                                    primaryTypographyProps={{
                                        fontWeight: 700,
                                        fontSize: "1.05rem",
                                        noWrap: true,
                                    }}
                                />

                                {category.subItems?.length > 0 && (
                                    <KeyboardArrowRightIcon
                                        sx={{ fontSize: 18, color: "divider" }}
                                    />
                                )}
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>

            <Box
                sx={{
                    width: 280,
                    flexShrink: 0,
                    borderRight: "1px solid",
                    borderColor: "divider",
                    py: 1,
                    bgcolor: "white",
                    overflowY: "auto",
                }}
            >
                <List sx={{ p: 0 }}>
                    {hoveredCategory?.subItems?.length > 0 ? ((Array.isArray(hoveredCategory.subItems) ? hoveredCategory.subItems : []).map((subcategory: any) => (
                        <ListItem key={subcategory.label} disablePadding>
                            <ListItemButton
                                onMouseEnter={() => setHoveredSubcategory(subcategory)}
                                selected={hoveredSubcategory?.label === subcategory.label}
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    if (subcategory.path) {
                                        navigate(subcategory.path);
                                        onClose();
                                    }
                                }}
                                sx={{
                                    py: 1.2,
                                    px: 2,
                                    "&.Mui-selected": {
                                        bgcolor: "rgba(0,0,0,0.03)",
                                        color: "primary.main",
                                        fontWeight: 700,
                                    },
                                }}
                            >
                                <ListItemText
                                    primary={subcategory.label}
                                    primaryTypographyProps={{
                                        fontSize: "1rem",
                                        fontWeight:
                                            hoveredSubcategory?.label === subcategory.label
                                                ? 700
                                                : 500,
                                        noWrap: true,
                                    }}
                                />

                                {subcategory.subItems?.length > 0 && (
                                    <KeyboardArrowRightIcon
                                        sx={{ fontSize: 16, color: "divider" }}
                                    />
                                )}
                            </ListItemButton>
                        </ListItem>
                    ))
                    ) : (
                        <Box sx={{ p: 2 }}>
                            <NoDataFound message="No subcategories found" />
                        </Box>
                    )}
                </List>
            </Box>

            <Box
                sx={{
                    width: 300,
                    flexGrow: 1,
                    py: 1,
                    bgcolor: "#f5f5f5",
                    overflowY: "auto",
                }}
            >
                <List sx={{ p: 0 }}>
                    {hoveredSubcategory?.subItems?.length > 0 ? ((Array.isArray(hoveredSubcategory.subItems) ? hoveredSubcategory.subItems : []).map((product: any) => (
                        <ListItem key={product.label} disablePadding>
                            <ListItemButton
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    if (product.path) {
                                        navigate(product.path);
                                        onClose();
                                    }
                                }}
                                sx={{
                                    py: 1.2,
                                    px: 2,
                                    mx: 1,
                                    borderRadius: 1,
                                    "&:hover": {
                                        bgcolor: "white",
                                        transform: "translateX(4px)",
                                    },
                                    transition: "all 0.2s",
                                }}
                            >
                                <ListItemText
                                    primary={product.label}
                                    primaryTypographyProps={{
                                        fontSize: "0.9rem",
                                        color: "text.secondary",
                                        fontWeight: 500,
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))
                    ) : (
                        <Box
                            sx={{
                                height: "100%",
                                minHeight: 250,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                p: 3,
                            }}
                        >
                            <Box sx={{ textAlign: "center", opacity: 0.5 }}>
                                <CategoryIcon
                                    sx={{
                                        fontSize: 48,
                                        mb: 2,
                                        color: "text.disabled",
                                    }}
                                />

                                <Typography variant="body2" color="text.disabled">
                                    Select subcategory to view products
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </List>
            </Box>
        </Box>
    );
}