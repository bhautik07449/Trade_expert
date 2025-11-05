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

    const navItems: { label: string; subItems?: string[]; path?: string }[] = [
        { label: "Home", path: "/" },
        { label: "About", path: "/about" },
        { label: "Products", subItems: ["Suran", "Ginger", "Spices"] },
        { label: "Resource", path: "/" },
        { label: "Quality Policy", path: "/quality-policy" },
        { label: "How to Pay", path: "/how-to-pay" },
        { label: "Brands", path: "/brands" },
        { label: "Get in Touch", path: "/contact" },
        { label: "Tradology", path: "/tradology" },
    ];

    const toggleSubmenu = (label: string) => {
        setOpenSubmenu(prev => (prev === label ? null : label));
    };

    // Close submenu if click outside
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
            {/* Top bar */}
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

            {/* Main header */}
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

            {/* Navigation bar */}
            <AppBar position="sticky" sx={{ bgcolor: "secondary.dark", display: { xs: "none", sm: "flex" } }}>
                <Toolbar ref={navRef} sx={{ px: { xs: 1, sm: 3, md: 6 }, display: "flex", justifyContent: "center", flexWrap: "wrap", gap: { xs: 2, md: 4 } }}>
                    {navItems.map((item) => (
                        <Box key={item.label} sx={{ position: "relative" }}>
                            <Typography
                                onClick={() => item.subItems ? toggleSubmenu(item.label) : item.path && navigate(item.path)}
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
                                {item.label}
                            </Typography>

                            {/* Submenu dropdown */}
                            {item.subItems && openSubmenu === item.label && (
                                <Paper
                                    elevation={3}
                                    sx={{
                                        position: "absolute",
                                        top: "100%",
                                        left: 0,
                                        mt: 1,
                                        minWidth: 320,
                                        bgcolor: "background.paper",
                                        borderRadius: 2,
                                        p: 2,
                                        boxShadow: 3,
                                        display: "grid",
                                        gridTemplateColumns: "repeat(4, minmax(120px, 1fr))", // 4 items per row
                                        gap: 1.5,
                                    }}
                                >
                                    {item.subItems.map((sub) => (
                                        <Typography
                                            key={sub}
                                            onClick={() => navigate(`/products/${sub.toLowerCase()}`)}
                                            sx={{
                                                px: 1.5,
                                                py: 1,
                                                fontSize: "0.9rem",
                                                color: "text.primary",
                                                borderRadius: 1,
                                                cursor: "pointer",
                                                textAlign: "center",
                                                "&:hover": { bgcolor: "primary.light", color: "primary.dark" },
                                            }}
                                        >
                                            {sub}
                                        </Typography>
                                    ))}
                                </Paper>
                            )}

                        </Box>
                    ))}
                </Toolbar>
            </AppBar>

            {/* Mobile Drawer */}
            {/* Mobile Drawer */}
            <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 250, p: 2 }}>
                    <List>
                        {navItems.map((item) => (
                            <Box key={item.label}>
                                <ListItem disablePadding>
                                    <ListItemButton
                                        onClick={() => {
                                            if (item.subItems) {
                                                // Toggle submenu
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

                                {/* Render subItems only if this item's submenu is open */}
                                {item.subItems && openSubmenu === item.label && (
                                    <List component="div" disablePadding>
                                        {item.subItems.map((sub) => (
                                            <ListItem key={sub} sx={{ pl: 4 }}>
                                                <ListItemButton
                                                    onClick={() => {
                                                        navigate(`/products/${sub.toLowerCase()}`);
                                                        setMobileOpen(false); // close drawer after navigation
                                                    }}
                                                >
                                                    <ListItemText primary={sub} />
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