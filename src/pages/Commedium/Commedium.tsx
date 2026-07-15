import React, { useState, useRef, useEffect } from "react";
import { Box, Tab, Tabs, Divider, Typography, Button } from "@mui/material";
import PageMainLayout from "../../commonUI/PageMainLayout";
import CommoditiesSection from "./CommoditiesSection";
import FundsFinancesSection from "./FundsFinancesSection";
import MarketSwitcherSection from "./MarketSwitcherSection";
import CommPressSection from "./CommPressSection";
import Commounion from "./Commounion";
import { useNavigate } from "react-router-dom";

const CURRENCY_SYMBOLS = ['₹', '$', '€', '£', '¥'];

export default function Commedium() {
    const [selected, setSelected] = useState(0);
    const [currencyIndex, setCurrencyIndex] = useState(0);
    const [symbolVisible, setSymbolVisible] = useState(true);
    const navigate = useNavigate();

    // Cycle currency symbol with fade-out → change → fade-in
    useEffect(() => {
        const interval = setInterval(() => {
            setSymbolVisible(false);
            setTimeout(() => {
                setCurrencyIndex(prev => (prev + 1) % CURRENCY_SYMBOLS.length);
                setSymbolVisible(true);
            }, 350);
        }, 1800);
        return () => clearInterval(interval);
    }, []);

    const commTrackerRef = useRef<HTMLDivElement>(null);
    const fundsRef = useRef<HTMLDivElement>(null);
    const commEquityRef = useRef<HTMLDivElement>(null);
    const commUnionRef = useRef<HTMLDivElement>(null);
    const commPressRef = useRef<HTMLDivElement>(null);

    const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
        if (ref.current) {
            setTimeout(() => {
                ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 50);
        }
    };

    const buttons = [
        "Comm-Tracker",
        "Funds & Finances",
        "Comm-Equity",
        "Comm-Union",
        "Comm-Press"
    ];

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setSelected(newValue);
        if (newValue === 0) scrollToSection(commTrackerRef);
        else if (newValue === 1) scrollToSection(fundsRef);
        else if (newValue === 2) scrollToSection(commEquityRef);
        else if (newValue === 3) scrollToSection(commUnionRef);
        else if (newValue === 4) scrollToSection(commPressRef);
    };

    return (
        <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
            <PageMainLayout
                slug="commedium"
                image="https://sourceseas.itcoders.in/img/my_account_bg1.jpg"
                activeCountry=""
                setActiveCountry={() => { }}
                bannerContent={
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1.5,
                        color: 'white',
                        maxWidth: '700px',
                        mx: 'auto',
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 0.6,
                            mb: 0.5,
                        }}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 1.5,
                            }}>
                                <Box sx={{
                                    width: { xs: 44, md: 52 },
                                    height: { xs: 44, md: 52 },
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '2px solid rgba(255,255,255,0.55)',
                                    borderRadius: '10px',
                                    background: 'rgba(255,255,255,0.08)',
                                    backdropFilter: 'blur(6px)',
                                    flexShrink: 0,
                                }}>
                                    <Typography sx={{
                                        fontSize: { xs: '1.5rem', md: '1.75rem' },
                                        fontWeight: 900,
                                        color: '#FFD700',
                                        lineHeight: 1,
                                        opacity: symbolVisible ? 1 : 0,
                                        transform: symbolVisible ? 'scale(1) translateY(0)' : 'scale(0.6) translateY(6px)',
                                        transition: 'opacity 0.35s ease, transform 0.35s ease',
                                        userSelect: 'none',
                                    }}>
                                        {CURRENCY_SYMBOLS[currencyIndex]}
                                    </Typography>
                                </Box>

                                <Box sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Box
                                        component="img"
                                        src="/commedium.jpg"
                                        alt="Commedium Logo"
                                        sx={{
                                            height: { xs: 38, md: 58 },
                                            width: 'auto',
                                            // filter: 'invert(1) brightness(1.3)',
                                            objectFit: 'contain',
                                            display: 'block',
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Box>

                        <Typography variant="body1" fontWeight="500" sx={{ opacity: 0.9, letterSpacing: 1 }}>
                            MONETILE
                        </Typography>

                        <Typography variant="body1" fontWeight="500" sx={{ opacity: 0.9, letterSpacing: 1 }}>
                            Powered with
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1 }}>
                            <Typography variant="h6" fontWeight="bold">Watch</Typography>
                            <Typography variant="h6" sx={{ opacity: 0.5 }}>|</Typography>
                            <Typography variant="h6" fontWeight="bold">Wallet</Typography>
                            <Typography variant="h6" sx={{ opacity: 0.5 }}>|</Typography>
                            <Typography variant="h6" fontWeight="bold">Wizard</Typography>
                        </Box>

                        <Typography variant="body2" sx={{ letterSpacing: 2, textTransform: 'uppercase', opacity: 0.8, mt: 1 }}>
                            Protected with
                        </Typography>

                        <Typography variant="h5" fontWeight="800" sx={{ color: 'primary.light', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                            Live Performance Tracker
                        </Typography>

                        <Typography variant="body2" fontStyle="italic" sx={{ mt: 2, opacity: 0.85, maxWidth: '85%', lineHeight: 1.6 }}>
                            Hold or Release Equities which contributes from Micro to Macro Economy
                        </Typography>

                        <Button onClick={() => navigate("/investors/register")} variant="contained" sx={{ mt: 3, borderRadius: 8, px: 5, py: 1.2, fontWeight: 'bold', fontSize: '1.05rem', boxShadow: '0 4px 14px 0 rgba(0,0,0,0.39)', '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 6px 20px rgba(0,0,0,0.23)' }, transition: 'all 0.2s ease' }}>
                            Login / Register
                        </Button>
                    </Box>
                }
            />

            <Box
                sx={{
                    maxWidth: "1440px",
                    mx: "auto",
                    px: { xs: 2, sm: 4, md: 0 },
                    pb: { xs: 6, md: 10 },
                }}
            >
                <Box sx={{ position: 'sticky', top: { xs: 56, md: 130 }, zIndex: 100, bgcolor: 'background.default', pt: 2, pb: 1 }}>
                    <Tabs
                        value={selected}
                        onChange={(_, value) => handleTabChange(_, value)}
                        variant="scrollable"
                        scrollButtons={true}
                        allowScrollButtonsMobile
                        TabIndicatorProps={{ sx: { display: "none" } }}
                        sx={{
                            minHeight: "auto",

                            "& .MuiTabs-flexContainer": {
                                gap: 1.2,
                                justifyContent: "flex-start",
                            },

                            "& .MuiTabs-scrollButtons": {
                                color: "primary.main",
                                width: 40,
                                borderRadius: 2,
                                "&.Mui-disabled": {
                                    opacity: 0.3,
                                },
                            },

                            "& .MuiTab-root": {
                                minHeight: "auto",
                                minWidth: "auto",
                                px: { xs: 1.8, sm: 2.5 },
                                py: 1,
                                borderRadius: 99,
                                textTransform: "none",
                                fontWeight: 800,
                                color: "text.secondary",
                                border: "1px solid",
                                borderColor: "divider",
                                bgcolor: "background.paper",
                                transition: "all 0.3s ease",
                            },

                            "& .MuiTab-root:hover": {
                                color: "primary.dark",
                                borderColor: "primary.main",
                                bgcolor: "primary.light",
                            },

                            "& .Mui-selected": {
                                color: "#fff !important",
                                bgcolor: "primary.main",
                                borderColor: "primary.main",
                                boxShadow: "0 8px 20px rgba(59, 48, 39, 0.16)",
                            },
                        }}
                    >
                        {buttons.map((item, index) => (
                            <Tab
                                key={index}
                                label={item}
                                value={index}
                            />
                        ))}
                    </Tabs>
                </Box>

                <Box sx={{ mt: 4, pt: 4, borderTop: '2px dashed', borderColor: 'divider' }}>
                    <Box ref={commTrackerRef} sx={{ scrollMarginTop: '180px', minHeight: '100vh' }}>
                        <CommoditiesSection />
                    </Box>
                    <Divider sx={{ my: 6 }} />
                    <Box ref={fundsRef} sx={{ scrollMarginTop: '180px', minHeight: '100vh' }}>
                        <FundsFinancesSection />
                    </Box>
                    <Divider sx={{ my: 6 }} />
                    <Box ref={commEquityRef} sx={{ scrollMarginTop: '180px', minHeight: '50vh' }}>
                        <MarketSwitcherSection />
                    </Box>
                    <Divider sx={{ my: 6 }} />
                    <Box ref={commUnionRef} sx={{ scrollMarginTop: '180px', minHeight: '50vh' }}>
                        <Commounion />
                    </Box>
                    <Divider sx={{ my: 6 }} />
                    <Box ref={commPressRef} sx={{ scrollMarginTop: '180px' }}>
                        <CommPressSection />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}