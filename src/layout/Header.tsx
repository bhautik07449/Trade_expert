"use client";
import {
    Box,
    Typography,
    FormControl,
    Select,
    MenuItem,
    SelectChangeEvent,
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
    Paper,
    Link,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useEffect, useRef } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function HideOnScroll({ children }: { children: React.ReactElement }) {
    const trigger = useScrollTrigger({ threshold: 50 });
    return <Slide appear={false} direction="down" in={!trigger}>{children}</Slide>;
}

export default function Header() {
    const [language, setLanguage] = useState("en");
    const [country, setCountry] = useState("in");
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
    const navigate = useNavigate();
    const navRef = useRef<HTMLDivElement>(null);

    const handleLanguageChange = (event: SelectChangeEvent) => setLanguage(event.target.value);
    const handleCountryChange = (event: SelectChangeEvent) => setCountry(event.target.value);
    const toggleDrawer = (open: boolean) => () => setMobileOpen(open);

    const navItems: { label: string; subItems?: any[]; path?: string }[] = [
        { label: "Home", path: "/" },
        {
            label: "About", path: "/about_us", subItems: [
                { label: "Know Us", path: "/about_us" }, { label: "Vision Mission", path: "/vision-mission" }, { label: "Our Team", path: "/our-team" }, { label: "Delivery Reach", path: "/delivery-reach" }
            ]
        },
        {
            label: "Products", subItems: [
                {
                    label: "Agri & Foods", path: "/products/ginger", SubItems: [
                        { label: "Ginger", path: "/products/ginger" },
                        { label: "Garlic", path: "/products/garlic" },
                        { label: "Onion", path: "/products/onion" },
                    ]
                },
                { label: "Electronics", path: "/products/spices" },
                { label: "Wired Electronics", path: "/products/spices" }
            ]
        },
        { label: "Resource", path: "/" },
        { label: "Quality Policy", path: "/quality-policy" },
        { label: "How to Pay", path: "/how-to-pay" },
        { label: "Brands", path: "/brands" },
        { label: "Get in Touch", path: "/contact" },
        { label: "Tradology", path: "/tradology" },
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setOpenSubmenu(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <HideOnScroll>
                <AppBar position="sticky" sx={{ bgcolor: "secondary.main", color: "white", boxShadow: "none", zIndex: (theme) => theme.zIndex.appBar + 1 }}>
                    <Toolbar sx={{ display: { xs: "none", sm: "flex" }, justifyContent: "space-between", px: { xs: 2, sm: 4, md: 6 }, flexDirection: { xs: "column", sm: "row" }, gap: { xs: 1, sm: 0 }, minHeight: "48px !important" }}>
                        <Box sx={{ display: "flex", gap: 3 }}>
                            <FormControl variant="standard" sx={{ minWidth: 90 }}>
                                <Select value={language} onChange={handleLanguageChange} sx={{ color: "white", fontSize: "0.85rem" }}>
                                    <MenuItem value="en">English</MenuItem>
                                    <MenuItem value="es">Spanish</MenuItem>
                                    <MenuItem value="fr">French</MenuItem>
                                    <MenuItem value="hi">Hindi</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl variant="standard" sx={{ minWidth: 90 }}>
                                <Select value={country} onChange={handleCountryChange} sx={{ color: "white", fontSize: "0.85rem" }}>
                                    <MenuItem value="in">India</MenuItem>
                                    <MenuItem value="us">USA</MenuItem>
                                    <MenuItem value="uk">UK</MenuItem>
                                    <MenuItem value="ca">Canada</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ display: "flex", gap: 3, fontSize: "0.85rem", flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "center", sm: "flex-end" } }}>
                            <Typography>+91 87653 37336</Typography>
                            <Typography>Mon - Fri: 9:30 - 8:30</Typography>
                        </Box>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>

            <AppBar position="sticky" sx={{ bgcolor: "white", color: "black", boxShadow: "none", borderBottom: "1px solid #ddd" }}>
                <Toolbar sx={{ px: { xs: 2, sm: 4, md: 6 }, display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: "1rem", md: "1.25rem" } }}>
                        Sourceseas - Best Exporter
                    </Typography>

                    <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
                        <Typography variant="body2" sx={{ cursor: "pointer" }}>
                            <Link component={RouterLink} to="/login" underline="none" sx={{ color: "text.primary", "&:hover": { color: "primary.main" }, fontWeight: 500 }}>
                                Login
                            </Link>
                        </Typography>
                        <Typography variant="body2" sx={{ cursor: "pointer" }}>
                            <Link component={RouterLink} to="/sign-up" underline="none" sx={{ color: "text.primary", "&:hover": { color: "primary.main" }, fontWeight: 500 }}>
                                Register
                            </Link>
                        </Typography>
                    </Box>

                    <IconButton onClick={toggleDrawer(true)} sx={{ display: { xs: "flex", sm: "none" } }}>
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <AppBar position="sticky" sx={{ bgcolor: "secondary.dark", display: { xs: "none", sm: "flex" } }}>
                <Toolbar
                    ref={navRef}
                    sx={{
                        px: { xs: 1, sm: 3, md: 6 },
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        gap: { xs: 2, md: 4 },
                    }}
                >
                    {navItems.map((item) => (
                        <Box
                            key={item.label}
                            sx={{ position: "relative" }}
                            onMouseEnter={() => setOpenSubmenu(item.label)}
                            onMouseLeave={() => setOpenSubmenu(null)}
                        >
                            <Typography
                                onClick={() => item.path && navigate(item.path)}
                                variant="body2"
                                sx={{
                                    fontSize: { xs: "0.85rem", md: "1rem" },
                                    fontWeight: 500,
                                    cursor: "pointer",
                                    px: 1.5,
                                    py: 0.5,
                                    borderRadius: 1,
                                    "&:hover": { color: "primary.light" },
                                    transition: "all 0.2s",
                                }}
                            >
                                {item.label} {item.subItems && (
                                    <KeyboardArrowUpIcon
                                        sx={{
                                            fontSize: '22px',
                                            verticalAlign: 'middle',
                                            ml: 0.5,
                                            transform: openSubmenu === item.label ? 'rotate(0deg)' : 'rotate(180deg)',
                                            transition: 'transform 0.3s ease',
                                        }}
                                    />
                                )}
                            </Typography>

                            {item.subItems && openSubmenu === item.label && (
                                <>
                                    <Paper
                                        elevation={3}
                                        sx={{
                                            position: "absolute",
                                            top: "100%",
                                            left: 0,
                                            minWidth: 150,
                                            width: "max-content",
                                            bgcolor: "background.paper",
                                            borderRadius: 0,
                                            p: 1,
                                            boxShadow: 3,
                                        }}
                                    >
                                        {item.subItems.map((sub, index) => (
                                            <Typography
                                                key={sub.label}
                                                onClick={() => {
                                                    navigate(sub.path);
                                                    setOpenSubmenu(null);
                                                }}
                                                sx={{
                                                    px: 1.5,
                                                    py: 1,
                                                    fontSize: { xs: "0.85rem", md: "1rem" },
                                                    color: "text.primary",
                                                    borderBottom: index !== (item?.subItems?.length || 0) - 1 ? "2px solid #ddd" : "none",
                                                    borderRadius: 1,
                                                    cursor: "pointer",
                                                    textAlign: "left",
                                                    "&:hover": { bgcolor: "primary.light", color: "primary.dark" },
                                                }}
                                            >
                                                {sub.label}
                                            </Typography>
                                        ))}
                                    </Paper>
                                    <div></div>
                                </>
                            )}
                        </Box>
                    ))}
                </Toolbar>
            </AppBar>

            <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 250, p: 2 }}>
                    <List>
                        {navItems.map((item) => (
                            <Box key={item.label}>
                                <ListItem disablePadding>
                                    <ListItemButton
                                        onClick={() => {
                                            if (item.subItems) {
                                                setOpenSubmenu(prev => (prev === item.label ? null : item.label));
                                            } else if (item.path) {
                                                navigate(item.path);
                                                setMobileOpen(false);
                                            }
                                        }}
                                        sx={{
                                            transition: "all 0.3s ease",
                                            borderRadius: 1,
                                            "&:hover": { bgcolor: "primary.light" },
                                        }}
                                    >
                                        <ListItemText primary={item.label} />
                                    </ListItemButton>
                                </ListItem>

                                {item.subItems && openSubmenu === item.label && (
                                    <List component="div" disablePadding>
                                        {item.subItems.map((sub) => (
                                            <ListItem key={sub.label} sx={{ pl: 4 }}>
                                                <ListItemButton
                                                    onClick={() => {
                                                        navigate(sub.path);
                                                        setMobileOpen(false);
                                                        setOpenSubmenu(null); // Close submenu after navigation
                                                    }}
                                                >
                                                    <ListItemText primary={sub.label} />
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                )}
                            </Box>
                        ))}

                        <ListItem disablePadding>
                            <ListItemButton onClick={() => navigate("/login")}>
                                <ListItemText primary="Login" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton onClick={() => navigate("/sign-up")}>
                                <ListItemText primary="Register" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );
}