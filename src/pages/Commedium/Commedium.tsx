import React, { useState, useRef } from "react";
import { Box, Tab, Tabs, Divider, Typography, Button } from "@mui/material";
import PageMainLayout from "../../commonUI/PageMainLayout";
import CommoditiesSection from "./CommoditiesSection";
import FundsFinancesSection from "./FundsFinancesSection";
import MarketSwitcherSection from "./MarketSwitcherSection";
import CommPressSection from "./CommPressSection";
import Commounion from "./Commounion";

export default function Commedium() {
    const [selected, setSelected] = useState(0);

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
                            Live performance Tracker
                        </Typography>

                        <Typography variant="body2" fontStyle="italic" sx={{ mt: 2, opacity: 0.85, maxWidth: '85%', lineHeight: 1.6 }}>
                            Hold or Release Equities which contributes from Micro to Macro Economy
                        </Typography>

                        <Button variant="contained" sx={{ mt: 3, borderRadius: 8, px: 5, py: 1.2, fontWeight: 'bold', fontSize: '1.05rem', boxShadow: '0 4px 14px 0 rgba(0,0,0,0.39)', '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 6px 20px rgba(0,0,0,0.23)' }, transition: 'all 0.2s ease' }}>
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
                <Box
                    sx={{
                        maxWidth: "1400px",
                        mx: "auto",
                        px: { xs: 2, sm: 4, md: 6 },
                        pb: { xs: 6, md: 10 },
                    }}
                >
                    <Box sx={{ position: 'sticky', top: { xs: 56, md: 130 }, zIndex: 100, bgcolor: 'background.default', pt: 2, pb: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
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
        </Box>
    );
}