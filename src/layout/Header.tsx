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
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState, useEffect, useRef } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import path from "path";

function HideOnScroll({ children }: { children: React.ReactElement }) {
    const trigger = useScrollTrigger({ threshold: 50 });
    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

export default function Header() {
    const [language, setLanguage] = useState("en");
    const [country, setCountry] = useState("in");
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

    const [menuStack, setMenuStack] = useState<any[]>([]);

    const navigate = useNavigate();
    const navRef = useRef<HTMLDivElement>(null);

    const handleLanguageChange = (event: SelectChangeEvent) =>
        setLanguage(event.target.value);
    const handleCountryChange = (event: SelectChangeEvent) =>
        setCountry(event.target.value);
    const toggleDrawer = (open: boolean) => () => {
        setMobileOpen(open);
        if (!open) setMenuStack([]);
    };

    const navItems: any[] = [
        { label: "Home", path: "/" },
        {
            label: "About",
            path: "/about_us",
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
            subItems: [
                {
                    label: "Agri & Foods",
                    path: "/product-list",
                    subItems: [
                        { label: "Ginger", path: "/product-details" },
                        { label: "Garlic", path: "/product-details" },
                        { label: "Onion", path: "/product-details" },
                    ],
                },
                { label: "Electronics", path: "/product-list" },
                { label: "Wired Electronics", path: "/product-list" },
            ],
        },
        {
            label: "Resource",
            subItems: [
                { label: "Gallery", path: "/resource/gallery" },
                { label: "CSR", path: "/resource/csr" },
                { label: "Careers", path: "/resource/careers" },
                { label: "FAQ", path: "/resource/faq" },
            ],
        },
        { label: "Quality Policy", path: "/quality_policies" },
        { label: "How to Pay", path: "/how-to-pay" },
        { label: "Brands", path: "/brands" },
        { label: "Get in Touch", path: "/get-in-touch" },
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

    return (
        <>
            <HideOnScroll>
                <AppBar position="sticky" sx={{ bgcolor: "secondary.main", color: "white" }}>
                    <Toolbar sx={{ display: { xs: "none", sm: "flex" }, justifyContent: "space-between" }}>
                        <Box sx={{ display: "flex", gap: 3 }}>
                            <FormControl variant="standard">
                                <Select value={country} onChange={handleCountryChange} sx={{ color: "white", fontSize: "14px" }}>
                                    <MenuItem value="in">India</MenuItem>
                                    <MenuItem value="us">USA</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
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
                            xs: "16px",
                            sm: "18px",
                            md: "20px",
                            lg: "22px",
                        },
                    }}>
                        Welcome to Sourceseas - Best Exporter
                    </Typography>
                    <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
                        <Typography variant="body2" sx={{ cursor: "pointer" }}>
                            <Link component={RouterLink} to="/login" underline="none" sx={{ color: "text.primary", "&:hover": { color: "primary.main" }, fontWeight: 500, display: "flex", alignItems: "center", gap: 0.5 }}>
                                <AccountCircleIcon sx={{ fontSize: 20, mr: 0.5 }} />
                                Login
                            </Link>
                        </Typography>
                        <Typography variant="body2" sx={{ cursor: "pointer" }}>
                            <Link component={RouterLink} to="/sign-up" underline="none" sx={{ color: "text.primary", "&:hover": { color: "primary.main" }, fontWeight: 500, display: "flex", alignItems: "center", gap: 0.5 }}>
                                <LoginIcon sx={{ fontSize: 20, mr: 0.5 }} />
                                Register
                            </Link>
                        </Typography>
                    </Box>
                    <IconButton onClick={toggleDrawer(true)} sx={{ display: { xs: "flex", md: "none" } }}>
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <AppBar position="sticky" sx={{ bgcolor: "secondary.dark", display: { xs: "none", md: "flex" } }}>
                <Toolbar ref={navRef} sx={{ display: "flex", justifyContent: "center", gap: 4 }}>
                    {navItems.map((item) => (
                        <Box
                            key={item.label}
                            sx={{ position: "relative" }}
                            onMouseEnter={() => setOpenSubmenu(item.label)}
                            onMouseLeave={() => setOpenSubmenu(null)}
                        >
                            <Typography
                                onClick={() => item.path && navigate(item.path)}
                                sx={{ cursor: "pointer", px: 1.5, py: 0.5, display: "flex", alignItems: "center", gap: 0.5, fontSize: { xs: "0.85rem", md: "1rem" }, color: "white" }}
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
                                <Paper sx={{ position: "absolute", top: "100%", left: 0, minWidth: 150, width: "max-content", p: 1 }}>
                                    {item.subItems.map((sub: any, index: number) => (
                                        <Typography
                                            key={sub.label}
                                            onClick={() => navigate(sub.path)}
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
                                                mb: index === (item?.subItems?.length || 0) - 1 ? 0 : 1,
                                            }}
                                        >
                                            {sub.label}
                                        </Typography>
                                    ))}
                                </Paper>
                            )}
                        </Box>
                    ))}
                </Toolbar>
            </AppBar>

            <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 260 }}>
                    <List>
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

                        {(menuStack.length === 0
                            ? navItems
                            : menuStack[menuStack.length - 1].subItems
                        )?.map((item: any) => (
                            <ListItem key={item.label} disablePadding>
                                <ListItemButton
                                    onClick={() => {
                                        if (item.subItems) {
                                            setMenuStack((prev) => [...prev, item]);
                                        } else if (item.path) {
                                            navigate(item.path);
                                            setMobileOpen(false);
                                            setMenuStack([]);
                                        }
                                    }}
                                >
                                    <ListItemText primary={item.label} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </>
    );
}