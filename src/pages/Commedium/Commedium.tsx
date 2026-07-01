import React, { useState } from "react";
import { Box, Tab, Tabs, Divider } from "@mui/material";
import PageMainLayout from "../../commonUI/PageMainLayout";
import CommoditiesSection from "./CommoditiesSection";
import FundsFinancesSection from "./FundsFinancesSection";
import MarketSwitcherSection from "./MarketSwitcherSection";
import CommPressSection from "./CommPressSection";

export default function Commedium() {
    const [selected, setSelected] = useState(0);

    const buttons = [
        "Comm-id",
        "Comm-pact",
        "Comm-tributor",
        "Comm-press",
        "Comm-trade",
        "Comm-united"
    ];

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setSelected(newValue);
    };

    return (
        <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
            <PageMainLayout slug="commedium" title="Commedium" image="https://sourceseas.itcoders.in/img/my_account_bg1.jpg" activeCountry="" setActiveCountry={() => { }} />

            <Box
                sx={{
                    maxWidth: "1400px",
                    mx: "auto",
                    px: { xs: 2, sm: 4, md: 6 },
                    pb: { xs: 6, md: 10 },
                }}
            >
                <Tabs
                    value={selected}
                    onChange={(_, value) => handleTabChange(_, value)}
                    variant="scrollable"
                    scrollButtons={true}
                    allowScrollButtonsMobile
                    TabIndicatorProps={{ sx: { display: "none" } }}
                    sx={{
                        minHeight: "auto",
                        mb: 4,

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
                        />
                    ))}
                </Tabs>
                
                <Box sx={{ mt: 4, pt: 4, borderTop: '2px dashed', borderColor: 'divider' }}>
                    <CommoditiesSection />
                    <Divider sx={{ my: 6 }} />
                    <FundsFinancesSection />
                    <Divider sx={{ my: 6 }} />
                    <MarketSwitcherSection />
                    <Divider sx={{ my: 6 }} />
                    <CommPressSection />
                </Box>
            </Box>
        </Box>
    );
}