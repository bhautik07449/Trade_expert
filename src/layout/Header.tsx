"use client";
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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import React, { useState, useEffect, useRef } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CategoryIcon from '@mui/icons-material/Category';
import WidgetsIcon from '@mui/icons-material/Widgets';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import SourceIcon from '@mui/icons-material/Source';
import VerifiedIcon from '@mui/icons-material/Verified';
import PaymentsIcon from '@mui/icons-material/Payments';
import BusinessIcon from '@mui/icons-material/Business';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { toast } from "react-toastify";
import Buyerservice from "../service/buyes.service";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { fetchFlatPage } from "../store/slice/pageSlice";
import QuotationDialog from "../component/Dialog/quote-dialog";
import { fetchFlatCategories } from "../store/slice/categoriesSlice";

interface Props {
    firstName?: string,
    lastName?: string
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

    useEffect(() => {
        const token = localStorage.getItem("token");
        const buyer = localStorage.getItem("buyer");

        if (token && buyer === "true") {
            setIsLoggedIn(true);
            setId(token)
        }
    }, []);

    const [mobileOpen, setMobileOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
    const [submenuTimeout, setSubmenuTimeout] = useState<NodeJS.Timeout | null>(null);

    const handleMouseEnter = (label: string) => {
        if (submenuTimeout) {
            clearTimeout(submenuTimeout);
            setSubmenuTimeout(null);
        }
        setOpenSubmenu(label);
    };

    const handleMouseLeave = () => {
        const timeout = setTimeout(() => {
            setOpenSubmenu(null);
        }, 150);
        setSubmenuTimeout(timeout);
    };

    const [menuStack, setMenuStack] = useState<any[]>([]);

    const navigate = useNavigate();
    const navRef = useRef<HTMLDivElement>(null);

    const toggleDrawer = (open: boolean) => () => {
        setMobileOpen(open);
        if (!open) setMenuStack([]);
    };

    const dispatch = useDispatch<AppDispatch>()

    useSelector(
        (state: any) => state.page
    )

    const { categories, loading: categoriesLoading } = useSelector(
        (state: any) => state.categories
    );

    useEffect(() => {
        dispatch(fetchFlatPage())
        dispatch(fetchFlatCategories())
    }, [dispatch])


    const navItems: any[] = [
        { label: "Home", path: "/", icon: <HomeIcon fontSize="small" /> },
        {
            label: "About",
            path: "/about_us",
            icon: <InfoIcon fontSize="small" />,
            subItems: [
                { label: "Know Us", path: "/about_us#know-us" },
                { label: "Vision Mission", path: "/about_us#vision-mission" },
                { label: "Our Team", path: "/about_us#our-team" },
                { label: "Delivery Reach", path: "/about_us#delivery-reach" },
            ],
        },
        {
            label: "Products",
            path: "/product-list",
            icon: <CategoryIcon fontSize="small" />,
            subItems:
                categories?.map((cat: any) => ({
                    label: cat?.name,
                    path: `/product-list/${cat?.slug}`,
                    subItems:
                        cat?.children?.map((sub: any) => ({
                            label: sub?.name,
                            path: `/product-list/${sub?.slug}`,
                            subItems:
                                sub?.children?.map((child: any) => ({
                                    label: child?.name,
                                    path: `/product-list/${child?.slug}`,
                                    subItems:
                                        child?.children?.map((last: any) => ({
                                            label: last?.name,
                                            path: `/product-list/${last?.slug}`,
                                        })) || [],
                                })) || [],
                        })) || [],
                })) || [],
        },
        {
            label: "Resource",
            icon: <SourceIcon fontSize="small" />,
            subItems: [
                { label: "Gallery", path: "/pages/gallery" },
                { label: "CSR", path: "/pages/csr" },
                { label: "Career", path: "/pages/career" },
                { label: "FAQ", path: "/pages/faq" },
            ],
        },
        { label: "Quality Policy", path: "/quality_policies", icon: <VerifiedIcon fontSize="small" /> },
        { label: "How to Pay", path: "/how-to-pay", icon: <PaymentsIcon fontSize="small" /> },
        { label: "Brands", path: "/brands", icon: <BusinessIcon fontSize="small" /> },
        { label: "Get in Touch", path: "/get-in-touch", icon: <ContactSupportIcon fontSize="small" /> },
        { label: "Trader Offer", path: "/trade-offers", icon: <LocalOfferIcon fontSize="small" /> },
        { label: "Abc", path: "/abc", icon: <DashboardIcon fontSize="small" /> },
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setOpenSubmenu(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const getData = async (id: any) => {
            try {
                const res = await Buyerservice.getProfile(id)
                if (res) {
                    setProfile(res?.data)
                }
            } catch (error) {
                toast.error("Buyer Profile not Found")
                handleLogout()
            }
        }
        if (id) {
            getData(id)
        }
    }, [id])

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("buyer");
        window.location.reload();
        toast.success("Buyer Logout Successfully")
    };

    return (
        <>
            <HideOnScroll>
                <AppBar position="sticky" sx={{ bgcolor: "secondary.main", color: "white" }}>
                    <Toolbar sx={{ display: { xs: "none", sm: "flex" }, justifyContent: "space-between" }}>
                        <Link component={RouterLink} to="/" sx={{ display: "flex", gap: 3, alignItems: "center" }}>
                            <img src="./logo.jpg" alt="logo" style={{ maxWidth: "100%", height: "auto", maxHeight: "50px" }} />
                        </Link>
                        <Box sx={{ display: "flex", gap: 4, alignItems: "center" }}>
                            <Typography sx={{ fontSize: "14px", display: 'flex', alignItems: 'center' }}><LocalPhoneIcon sx={{ fontSize: 20, mr: 0.5 }} /> +91 87653 37336</Typography>
                            <Typography sx={{ fontSize: "14px", display: 'flex', alignItems: 'center' }}><AccessTimeIcon sx={{ fontSize: 20, mr: 0.5 }} />Mon-Fri: 9:00am - 8:00pm</Typography>
                        </Box>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>

            <AppBar position="sticky" sx={{ bgcolor: "white", color: "black", borderBottom: "1px solid #ddd" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h6" sx={{
                        fontWeight: 600, fontSize: {
                            xs: "14px",
                            sm: "18px",
                            md: "20px",
                            lg: "22px",
                        },
                    }}>
                        Welcome to Sourceseas - Best Exporter
                    </Typography>
                    <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
                        {!isLoggedIn ? (
                            <>
                                <Typography variant="body2">
                                    <Link
                                        component={RouterLink}
                                        to="/login"
                                        underline="none"
                                        sx={{
                                            color: "text.primary",
                                            "&:hover": { color: "primary.main" },
                                            fontWeight: 500,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 0.5
                                        }}
                                    >
                                        <AccountCircleIcon sx={{ fontSize: 20 }} />
                                        Login
                                    </Link>
                                </Typography>

                                <Typography variant="body2">
                                    <Link
                                        component={RouterLink}
                                        to="/sign-up"
                                        underline="none"
                                        sx={{
                                            color: "text.primary",
                                            "&:hover": { color: "primary.main" },
                                            fontWeight: 500,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 0.5
                                        }}
                                    >
                                        <LoginIcon sx={{ fontSize: 20 }} />
                                        Register
                                    </Link>
                                </Typography>
                            </>
                        ) : (
                            <>
                                <Typography
                                    sx={{
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 0.5
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
                                        gap: 0.5
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
                            size="small"
                            sx={{ px: 3, fontWeight: 600 }}
                            onClick={() => setOpenRFQ(true)}
                        >
                            Request for Quote
                        </Button>
                    </Box>
                    <IconButton onClick={toggleDrawer(true)} sx={{ display: { xs: "flex", md: "none" } }}>
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <AppBar position="sticky" sx={{ bgcolor: "secondary.dark", display: { xs: "none", md: "flex" } }}>
                <Toolbar ref={navRef} sx={{ display: "flex", justifyContent: "center", gap: 4, position: "relative" }}>
                    {navItems.map((item) => (
                        <Box
                            key={item.label}
                            sx={{
                                position: item.label === "Products" ? "static" : "relative",
                                pb: 2,
                                mb: -2,
                                display: "flex",
                                alignItems: "center",
                            }}
                            onMouseEnter={() => handleMouseEnter(item.label)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Typography
                                onClick={() => item.path && navigate(item.path)}
                                sx={{ 
                                    cursor: "pointer", 
                                    px: 2, 
                                    py: 1, 
                                    display: "flex", 
                                    alignItems: "center", 
                                    gap: 0.5, 
                                    fontSize: { xs: "0.95rem", md: "1.1rem" },
                                    color: "white",
                                    fontWeight: 500,
                                    "&:hover": { color: "primary.light" }
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

                            {item.subItems && openSubmenu === item.label && (
                                <Paper
                                    elevation={16}
                                    sx={{
                                        position: "absolute",
                                        top: "100%", // Removed gap
                                        left: item.label === "Products" ? "50%" : 0,
                                        transform: item.label === "Products" ? "translateX(-50%)" : "none",
                                        width: item.label === "Products" ? "950px" : "auto",
                                        maxWidth: "98vw",
                                        zIndex: 999,
                                        overflow: "hidden",
                                        border: "1px solid rgba(0,0,0,0.08)",
                                        backgroundColor: "white",
                                        boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
                                        // Invisible bridge to prevent closing on gap hover
                                        "&::after": {
                                            content: '""',
                                            position: "absolute",
                                            top: -20,
                                            left: 0,
                                            right: 0,
                                            height: 20,
                                            zIndex: -1,
                                        },
                                        "&::before": item.label === "Products" ? {
                                            content: '""',
                                            position: "absolute",
                                            top: -10, // Back to -10 to peek out
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                            borderLeft: "10px solid transparent",
                                            borderRight: "10px solid transparent",
                                            borderBottom: "10px solid white",
                                        } : {},
                                    }}
                                >
                                    {item.label === "Products" ? (
                                        categoriesLoading ? (
                                            <Box sx={{ p: 4, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
                                                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                                    <Box key={i}>
                                                        <Skeleton variant="text" width="60%" height={30} />
                                                        <Skeleton variant="text" width="80%" />
                                                        <Skeleton variant="text" width="70%" />
                                                        <Skeleton variant="text" width="75%" />
                                                    </Box>
                                                ))}
                                            </Box>
                                        ) : (
                                            <ProductMegaMenu
                                                items={item.subItems}
                                                navigate={navigate}
                                                onClose={() => setOpenSubmenu(null)}
                                            />
                                        )
                                    ) : (
                                        <NestedMenu
                                            items={item.subItems}
                                            navigate={navigate}
                                        />
                                    )}
                                </Paper>
                            )}
                        </Box>
                    ))}
                </Toolbar>
            </AppBar>

            <Drawer 
                anchor="left" 
                open={mobileOpen} 
                onClose={toggleDrawer(false)}
                PaperProps={{ sx: { width: { xs: "85%", sm: 320 } } }}
            >
                <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                    <Box sx={{ p: 2, borderBottom: "1px solid #eee", display: "flex", alignItems: "center", gap: 2, bgcolor: "secondary.main", color: "white" }}>
                        <img src="./logo.jpg" alt="logo" width={40} height={40} style={{ borderRadius: 4 }} />
                        <Typography variant="subtitle1" fontWeight={700}>Menu</Typography>
                    </Box>
                    <List sx={{ flexGrow: 1, overflowY: "auto", py: 0 }}>
                        {menuStack.length > 0 && (
                            <ListItem disablePadding>
                                <ListItemButton
                                    onClick={() =>
                                        setMenuStack((prev) => prev.slice(0, -1))
                                    }
                                >
                                    <ListItemText primary="← Back" />
                                </ListItemButton>
                            </ListItem>
                        )}

                        {menuStack.length > 0 && menuStack[menuStack.length - 1].label === "Products" && categoriesLoading ? (
                            <Box sx={{ px: 2 }}>
                                <Skeleton variant="text" height={50} />
                                <Skeleton variant="text" height={50} />
                                <Skeleton variant="text" height={50} />
                                <Skeleton variant="text" height={50} />
                            </Box>
                        ) : (
                            (menuStack.length === 0
                                ? navItems
                                : menuStack[menuStack.length - 1].subItems
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
                                        sx={{ py: 1.5, borderBottom: "1px solid #f9f9f9" }}
                                    >
                                        <ListItemIcon sx={{ minWidth: 40, color: "secondary.main" }}>
                                            {item.icon || <WidgetsIcon />}
                                        </ListItemIcon>
                                        <ListItemText 
                                            primary={item.label} 
                                            primaryTypographyProps={{ fontWeight: 600, fontSize: "1rem" }}
                                        />
                                        {item.subItems && item.subItems.length > 0 && <KeyboardArrowRightIcon color="disabled" />}
                                    </ListItemButton>
                                </ListItem>
                            ))
                        )}
                    </List>
                    <Box sx={{ borderTop: "2px solid #f0f0f0", p: 2, bgcolor: "#fafafa" }}>
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
                                                primary={`${profile?.firstName ?? ""} ${profile?.lastName ?? ""}`}
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
                                                navigate("/login");
                                                setMobileOpen(false);
                                            }}
                                        >
                                            <AccountCircleIcon sx={{ mr: 1 }} />
                                            <ListItemText primary="Login" />
                                        </ListItemButton>
                                    </ListItem>

                                    <ListItem disablePadding>
                                        <ListItemButton
                                            onClick={() => {
                                                navigate("/sign-up");
                                                setMobileOpen(false);
                                            }}
                                        >
                                            <LoginIcon sx={{ mr: 1 }} />
                                            <ListItemText primary="Register" />
                                        </ListItemButton>
                                    </ListItem>
                                </>
                            )}

                            <Button
                                variant="contained"
                                color="success"
                                size="small"
                                sx={{ px: 3, fontWeight: 600, mx: 3, borderTop: "1px solid #ddd", mt: 1 }}
                                onClick={() => setOpenRFQ(true)}
                            >
                                Request for Quote
                            </Button>
                        </Box>
                </Box>
            </Drawer>

            <QuotationDialog
                open={openRFQ}
                onClose={() => setOpenRFQ(false)}
            />
        </>
    );
}

function NestedMenu({
    items,
    navigate,
}: {
    items: any[];
    navigate: any;
}) {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <Box sx={{ minWidth: 220 }}>
            {items.map((item, index) => (
                <Box
                    key={item.label}
                    sx={{ position: "relative", "&:not(:last-child)": { mb: 0.5 } }}
                    onMouseEnter={() => setHovered(index)}
                    onMouseLeave={() => setHovered(null)}
                >
                    <Typography
                        onClick={() => item.path && navigate(item.path)}
                        sx={{
                            px: 2,
                            py: 1.2,
                            cursor: "pointer",
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
                            <NestedMenu items={item.subItems} navigate={navigate} />
                        </Paper>
                    )}
                </Box>
            ))}
        </Box>
    );
}

function ProductMegaMenu({
    items,
    navigate,
    onClose,
}: {
    items: any[];
    navigate: any;
    onClose: () => void;
}) {
    const [hoveredCat, setHoveredCat] = useState<any>(items[0] || null);
    const [hoveredSub, setHoveredSub] = useState<any>(null);

    useEffect(() => {
        setHoveredSub(null);
    }, [hoveredCat]);

    return (
        <Box sx={{ display: "flex", height: 550, width: 950 }}>
            <Box
                sx={{
                    width: 300,
                    flexShrink: 0,
                    borderRight: "1px solid",
                    borderColor: "divider",
                    bgcolor: "#fcfcfc",
                    overflowY: "auto",
                }}
            >
                <List sx={{ p: 0 }}>
                    {items.map((cat) => (
                        <ListItem key={cat.label} disablePadding>
                            <ListItemButton
                                onMouseEnter={() => setHoveredCat(cat)}
                                onClick={() => {
                                    navigate(cat.path);
                                    onClose();
                                }}
                                selected={hoveredCat?.label === cat.label}
                                sx={{
                                    py: 1.5,
                                    px: 2,
                                    "&.Mui-selected": {
                                        bgcolor: "primary.light",
                                        color: "primary.dark",
                                        "& .MuiListItemIcon-root": { color: "primary.dark" },
                                    },
                                    "&:hover": {
                                        bgcolor: "primary.light",
                                    },
                                }}
                            >
                                <ListItemText
                                    primary={cat.label}
                                    primaryTypographyProps={{
                                        fontWeight: 700,
                                        fontSize: "1.05rem",
                                        noWrap: true,
                                    }}
                                />
                                {cat.subItems?.length > 0 && (
                                    <KeyboardArrowRightIcon sx={{ fontSize: 18, color: "divider" }} />
                                )}
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>

            {hoveredCat?.subItems?.length > 0 && (
                <Box
                    sx={{
                        width: 300,
                        flexShrink: 0,
                        borderRight: "1px solid",
                        borderColor: "divider",
                        py: 1,
                        bgcolor: "white",
                        overflowY: "auto",
                    }}
                >
                    <List sx={{ p: 0 }}>
                        {hoveredCat.subItems.map((sub: any) => (
                            <ListItem key={sub.label} disablePadding>
                                <ListItemButton
                                    onMouseEnter={() => setHoveredSub(sub)}
                                    onClick={() => {
                                        navigate(sub.path);
                                        onClose();
                                    }}
                                    selected={hoveredSub?.label === sub.label}
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
                                        primary={sub.label}
                                        primaryTypographyProps={{
                                            fontSize: "1rem",
                                            fontWeight: hoveredSub?.label === sub.label ? 700 : 500,
                                            noWrap: true,
                                        }}
                                    />
                                    {sub.subItems?.length > 0 && (
                                        <KeyboardArrowRightIcon sx={{ fontSize: 16, color: "divider" }} />
                                    )}
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}

            {hoveredSub?.subItems?.length > 0 ? (
                <Box
                    sx={{
                        width: 350,
                        flexGrow: 1,
                        py: 2,
                        px: 1,
                        bgcolor: "#fafafa",
                        overflowY: "auto",
                    }}
                >
                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 0.5 }}>
                        {hoveredSub.subItems.map((child: any) => (
                            <ListItemButton
                                key={child.label}
                                onClick={() => {
                                    navigate(child.path);
                                    onClose();
                                }}
                                sx={{
                                    borderRadius: 1,
                                    mx: 1,
                                    "&:hover": { bgcolor: "white", transform: "translateX(4px)" },
                                    transition: "all 0.2s",
                                }}
                            >
                                <ListItemText
                                    primary={child.label}
                                    primaryTypographyProps={{
                                        fontSize: "0.9rem",
                                        color: "text.secondary",
                                    }}
                                />
                            </ListItemButton>
                        ))}
                    </Box>
                </Box>
            ) : (
                <Box
                    sx={{
                        width: 350,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "#f5f5f5",
                        p: 3,
                    }}
                >
                    <Box sx={{ textAlign: "center", opacity: 0.5 }}>
                        <CategoryIcon sx={{ fontSize: 48, mb: 2, color: "text.disabled" }} />
                        <Typography variant="body2" color="text.disabled">
                            Explore {hoveredSub?.label || hoveredCat?.label} Products
                        </Typography>
                    </Box>
                </Box>
            )}
        </Box>
    );
}