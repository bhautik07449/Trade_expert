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
    Link,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

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
    const navigate = useNavigate()

    const handleLanguageChange = (event: SelectChangeEvent) => {
        setLanguage(event.target.value);
    };

    const handleCountryChange = (event: SelectChangeEvent) => {
        setCountry(event.target.value);
    };

    const toggleDrawer = (open: boolean) => () => {
        setMobileOpen(open);
    };

    const navItems = [
        "Home",
        "About",
        "Products",
        "Resource",
        "Quality Policy",
        "How to Pay",
        "Brands",
        "Get in Touch",
        "Tradology",
    ];

    return (
        <>
            <HideOnScroll>
                <AppBar
                    position="sticky"
                    sx={{
                        bgcolor: "secondary.main",
                        color: "common.white",
                        boxShadow: "none",
                        zIndex: (theme) => theme.zIndex.appBar + 1,
                    }}
                >
                    <Toolbar
                        sx={{
                            display: { xs: "none", sm: "flex" },
                            justifyContent: "space-between",
                            px: { xs: 2, sm: 4, md: 6 },
                            flexDirection: { xs: "column", sm: "row" },
                            gap: { xs: 1, sm: 0 },
                            minHeight: "48px !important",
                        }}
                    >
                        <Box sx={{ display: "flex", gap: 3 }}>
                            <FormControl variant="standard" sx={{ minWidth: 90 }}>
                                <Select
                                    value={language}
                                    onChange={handleLanguageChange}
                                    sx={{ color: "white", fontSize: "0.85rem" }}
                                >
                                    <MenuItem value="en">English</MenuItem>
                                    <MenuItem value="es">Spanish</MenuItem>
                                    <MenuItem value="fr">French</MenuItem>
                                    <MenuItem value="hi">Hindi</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl variant="standard" sx={{ minWidth: 90 }}>
                                <Select
                                    value={country}
                                    onChange={handleCountryChange}
                                    sx={{ color: "white", fontSize: "0.85rem" }}
                                >
                                    <MenuItem value="in">India</MenuItem>
                                    <MenuItem value="us">USA</MenuItem>
                                    <MenuItem value="uk">UK</MenuItem>
                                    <MenuItem value="ca">Canada</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                gap: 3,
                                fontSize: "0.85rem",
                                flexDirection: { xs: "column", sm: "row" },
                                alignItems: { xs: "center", sm: "flex-end" },
                            }}
                        >
                            <Typography>+91 87653 37336</Typography>
                            <Typography>Mon - Fri: 9:30 - 8:30</Typography>
                        </Box>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>

            <AppBar
                position="sticky"
                sx={{
                    bgcolor: "white",
                    color: "black",
                    boxShadow: "none",
                    borderBottom: "1px solid #ddd",
                }}
            >
                <Toolbar
                    sx={{
                        px: { xs: 2, sm: 4, md: 6 },
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, fontSize: { xs: "1rem", md: "1.25rem" } }}
                    >
                        Sourceseas - Best Exporter
                    </Typography>

                    <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
                        <Typography variant="body2" sx={{ cursor: "pointer" }}>
                            <Link
                                component={RouterLink}
                                to="/login"
                                underline="none"
                                sx={{
                                    color: "text.primary",
                                    "&:hover": { color: "primary.main" },
                                    fontWeight: 500,
                                }}
                            >
                                Login
                            </Link>
                        </Typography>

                        <Typography variant="body2" sx={{ cursor: "pointer" }}>
                            <Link
                                component={RouterLink}
                                to="/sign-up"
                                underline="none"
                                sx={{
                                    color: "text.primary",
                                    "&:hover": { color: "primary.main" },
                                    fontWeight: 500,
                                }}
                            >
                                Register
                            </Link>
                        </Typography>
                    </Box>

                    <IconButton
                        onClick={toggleDrawer(true)}
                        sx={{ display: { xs: "flex", sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <AppBar
                position="sticky"
                sx={{ bgcolor: "secondary.dark", display: { xs: "none", sm: "flex" } }}
            >
                <Toolbar
                    sx={{
                        px: { xs: 1, sm: 3, md: 6 },
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        gap: { xs: 2, md: 4 },
                    }}
                >
                    {navItems.map((item) => (
                        <Typography
                            key={item}
                            variant="body2"
                            sx={{
                                fontSize: { xs: "0.85rem", md: "1rem" },
                                fontWeight: 500,
                                cursor: "pointer",
                                "&:hover": { color: "primary.light" },
                            }}
                        >
                            {item}
                        </Typography>
                    ))}
                </Toolbar>
            </AppBar>

            {/* mobile view drawer */}
            <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 250, p: 2 }}>
                    <List>
                        {navItems.map((text) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton
                                    sx={{
                                        transition: "all 0.3s ease",
                                        borderRadius: 1,
                                        "&:hover": {
                                            bgcolor: "primary.light",
                                            transform: "translateX(5px)",
                                        },
                                        "&.Mui-selected": {
                                            bgcolor: "primary.main",
                                            color: "white",
                                            transform: "scale(1.05)",
                                        },
                                    }}
                                    selected={false}
                                >
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}

                        <ListItem disablePadding>
                            <ListItemButton
                                sx={{
                                    transition: "all 0.3s ease",
                                    borderRadius: 1,
                                    "&:hover": { bgcolor: "secondary.light", transform: "translateX(5px)" },
                                    "&.Mui-selected": {
                                        bgcolor: "secondary.main",
                                        color: "white",
                                        transform: "scale(1.05)",
                                    },
                                }}
                            >
                                <ListItemText primary="Login" onClick={() => navigate('/login')} />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton
                                sx={{
                                    transition: "all 0.3s ease",
                                    borderRadius: 1,
                                    "&:hover": { bgcolor: "secondary.light", transform: "translateX(5px)" },
                                    "&.Mui-selected": {
                                        bgcolor: "secondary.main",
                                        color: "white",
                                        transform: "scale(1.05)",
                                    },
                                }}
                            >
                                <ListItemText primary="Register" onClick={() => navigate('/sign-up')}/>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );
}