import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    IconButton,
    Stack,
    Typography,
    useTheme,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material"
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import LabelTitle from "../../commonUI/labelTitle";

type TabKey = "E" | "S" | "G";

export default function ESG({ visiblecard = 3 }: { visiblecard?: number }) {
    const theme = useTheme();

    const [currentStartIndex, setCurrentStartIndex] = useState(0)
    const [visibleCards, setVisibleCards] = useState(visiblecard)
    const [activeTab, setActiveTab] = useState<TabKey>("E")

    const data = [
        {
            title: "Carbon Footprint",
            short: "E",
            icon: <SpaOutlinedIcon />,
            value: "72%",
            description: "Tracks emissions, energy usage and climate impact.",
        },
        {
            title: "Renewable Energy",
            short: "E",
            icon: <SpaOutlinedIcon />,
            value: "61%",
            description: "Measures clean energy adoption and efficiency.",
        },
        {
            title: "Waste Management",
            short: "E",
            icon: <SpaOutlinedIcon />,
            value: "84%",
            description: "Reviews recycling, waste reduction and disposal.",
        },
        {
            title: "Water Usage",
            short: "E",
            icon: <SpaOutlinedIcon />,
            value: "58%",
            description: "Monitors water consumption and conservation.",
        },
        {
            title: "Green Operations",
            short: "E",
            icon: <SpaOutlinedIcon />,
            value: "79%",
            description: "Evaluates eco-friendly operational practices.",
        },
        {
            title: "Employee Welfare",
            short: "S",
            icon: <GroupsOutlinedIcon />,
            value: "84%",
            description: "Tracks workforce safety, wellness and satisfaction.",
        },
        {
            title: "Diversity",
            short: "S",
            icon: <GroupsOutlinedIcon />,
            value: "76%",
            description: "Measures inclusion, equality and representation.",
        },
        {
            title: "Community Impact",
            short: "S",
            icon: <GroupsOutlinedIcon />,
            value: "69%",
            description: "Reviews social programs and local contribution.",
        },
        {
            title: "Human Rights",
            short: "S",
            icon: <GroupsOutlinedIcon />,
            value: "88%",
            description: "Checks fair labor and ethical people policies.",
        },
        {
            title: "Customer Trust",
            short: "S",
            icon: <GroupsOutlinedIcon />,
            value: "81%",
            description: "Measures customer safety, privacy and satisfaction.",
        },
        {
            title: "Board Structure",
            short: "G",
            icon: <AccountBalanceOutlinedIcon />,
            value: "68%",
            description: "Reviews leadership independence and accountability.",
        },
        {
            title: "Compliance",
            short: "G",
            icon: <AccountBalanceOutlinedIcon />,
            value: "91%",
            description: "Tracks legal, regulatory and policy compliance.",
        },
        {
            title: "Risk Management",
            short: "G",
            icon: <AccountBalanceOutlinedIcon />,
            value: "74%",
            description: "Evaluates internal controls and business risks.",
        },
        {
            title: "Ethics",
            short: "G",
            icon: <AccountBalanceOutlinedIcon />,
            value: "86%",
            description: "Reviews transparency and anti-corruption practices.",
        },
        {
            title: "Audit Quality",
            short: "G",
            icon: <AccountBalanceOutlinedIcon />,
            value: "77%",
            description: "Measures reporting quality and audit strength.",
        },
    ]

    useEffect(() => {
        const updateVisibleCards = () => {
            const width = window.innerWidth
            if (width < 600) setVisibleCards(1)
            else if (width < 900) setVisibleCards(2)
            else if (width < 1200) setVisibleCards(3)
            else setVisibleCards(visiblecard)
        }

        updateVisibleCards()
        window.addEventListener("resize", updateVisibleCards)
        return () => window.removeEventListener("resize", updateVisibleCards)
    }, [visiblecard])

    const handleNext = () => {
        if (currentStartIndex + visibleCards < data.length) {
            setCurrentStartIndex(currentStartIndex + 1)
        }
    }

    const handlePrev = () => {
        if (currentStartIndex > 0) {
            setCurrentStartIndex(currentStartIndex - 1)
        }
    }

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                color: "text.primary",
                px: { xs: 2, sm: 4, md: 6 }, py: { xs: 6, md: 10 },
            }}
        >
            <Box sx={{ width: "100%", maxWidth: 1100, mx: "auto" }}>
                <LabelTitle title="ESG" label="" />

                <Stack direction="row" justifyContent="center" spacing={2} sx={{ mb: 4 }}>
                    {(["E", "S", "G"] as TabKey[]).map((tab) => (
                        <Button
                            key={tab}
                            variant={activeTab === tab ? "contained" : "outlined"}
                            onClick={() => setActiveTab(tab)}
                            sx={{
                                minWidth: 72,
                                borderRadius: 99,
                                fontWeight: 700,
                                bgcolor: activeTab === tab ? "primary.main" : "background.paper",
                                color: activeTab === tab ? "#fff" : "primary.dark",
                                borderColor: "primary.main",
                                "&:hover": {
                                    bgcolor: activeTab === tab ? "primary.dark" : "primary.light",
                                    borderColor: "primary.dark",
                                },
                            }}
                        >
                            {tab}
                        </Button>
                    ))}
                </Stack>

                <Box sx={{ position: "relative", overflow: "hidden" }}>
                    <IconButton
                        sx={{
                            position: "absolute",
                            left: 0,
                            top: "50%",
                            transform: "translateY(-50%)",
                            zIndex: 3,
                            bgcolor: "#f5f5f5",
                            "&:hover": { backgroundColor: "#e0e0e0" },
                        }}
                        onClick={handlePrev}
                    >
                        <ChevronLeft />
                    </IconButton>

                    <IconButton
                        sx={{
                            position: "absolute",
                            right: 0,
                            top: "50%",
                            transform: "translateY(-50%)",
                            zIndex: 3,
                            bgcolor: "#f5f5f5",
                            "&:hover": { backgroundColor: "#e0e0e0" },
                        }}
                        onClick={handleNext}
                    >
                        <ChevronRight />
                    </IconButton>

                    <Box
                        sx={{
                            display: "flex",
                            transition: "transform 0.5s ease-in-out",
                            width: `${(data.length / visibleCards) * 100}%`,
                            transform: `translateX(-${(currentStartIndex * 100) / data.length}%)`,
                        }}
                    >
                        {data.map((item, index) => (
                            <Box
                                key={`${activeTab}-${item.title}-${index}`}
                                sx={{
                                    width: `${100 / data.length}%`,
                                    flexShrink: 0,
                                    px: { xs: 0.75, sm: 1, md: 1.5 },
                                    boxSizing: "border-box",
                                }}
                            >
                                <Card
                                    elevation={0}
                                    sx={{
                                        height: "100%",
                                        minHeight: { xs: 180, sm: 180, md: 180 },
                                        border: `1px solid ${theme.palette.divider}`,
                                        bgcolor: "background.paper",
                                        borderRadius: { xs: 2, md: 3 }
                                    }}
                                >
                                    <CardContent>
                                        <Stack spacing={2} alignItems="center" textAlign="center">
                                            <Box>
                                                <Typography variant="subtitle1" fontWeight={700}>
                                                    {item.title}
                                                </Typography>

                                                <Typography
                                                    variant="h5"
                                                    fontWeight={800}
                                                    sx={{ color: "primary.main", mt: 0.5 }}
                                                >
                                                    {item.value}
                                                </Typography>
                                            </Box>

                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: "text.secondary",
                                                    maxWidth: 220,
                                                    mx: "auto",
                                                }}
                                            >
                                                {item.description}
                                            </Typography>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Box>
                        ))}
                    </Box>
                </Box>

            </Box>
        </Box >
    );
}