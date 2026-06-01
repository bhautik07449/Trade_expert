import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Stack,
    Typography,
    useTheme,
} from "@mui/material";
import LabelTitle from "../../commonUI/labelTitle";
import CountryTab from "../../commonUI/CountryTab";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CountriesSnapshot() {
    const navigate = useNavigate()
    const [activeCountry, setActiveCountry] = useState("India")
    const theme = useTheme();

    const economicItems = ["18", "20", "115", "35"];

    const activeCategories = ["Food", "Food", "Food", "Food", "Food", "Food", "Food", "Food", "Food"];

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                px: { xs: 2, sm: 4, md: 6 }, py: { xs: 6, md: 10 },
                color: "text.primary",
            }}
        >
            <Stack spacing={3}>
                <LabelTitle title="Countries" label="Snapshot" tagLine="Get a comprehensive overview of the global market and the economic standing of different countries." />

                <CountryTab activeCountry={activeCountry} setActiveCountry={setActiveCountry} />

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "1.2fr 1fr 0.9fr",
                        },
                        gap: 3,
                    }}
                >
                    <Card
                        elevation={0}
                        sx={{
                            border: `1px solid ${theme.palette.divider}`,
                            bgcolor: "background.paper",
                        }}
                    >
                        <CardContent>
                            <Typography
                                variant="subtitle1"
                                fontWeight={700}
                                sx={{ mb: 2, color: "secondary.main" }}
                            >
                                Country Economic Standing
                            </Typography>

                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(4, 1fr)",
                                    gap: 1.5,
                                    mb: 2,
                                }}
                            >
                                {economicItems.map((item) => (
                                    <Box
                                        key={item}
                                        sx={{
                                            height: 42,
                                            borderRadius: 1,
                                            border: `1px solid ${theme.palette.divider}`,
                                            bgcolor: "primary.light",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Typography variant="body2" fontWeight={600}>
                                            {item}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Typography
                                variant="subtitle1"
                                fontWeight={700}
                                sx={{ mb: 2, color: "secondary.main" }}
                            >
                                Registered Accounts
                            </Typography>

                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(3, 1fr)",
                                    gap: 2,
                                }}
                            >
                                {[1, 2, 3].map((item) => (
                                    <MiniChart key={item} />
                                ))}
                            </Box>
                        </CardContent>
                    </Card>

                    <Card
                        elevation={0}
                        sx={{
                            border: `1px solid ${theme.palette.divider}`,
                            bgcolor: "background.paper",
                        }}
                    >
                        <CardContent>
                            <Typography
                                variant="subtitle1"
                                fontWeight={700}
                                sx={{ mb: 2, color: "secondary.main" }}
                            >
                                Active Categories
                            </Typography>

                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(3, 1fr)",
                                    gap: 1.5
                                }}
                            >
                                {activeCategories.map((item) => (
                                    <Box
                                        key={item}
                                        sx={{
                                            height: 38,
                                            borderRadius: 1,
                                            border: `1px solid ${theme.palette.divider}`,
                                            bgcolor: "background.default",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        {item}
                                    </Box>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>

                    <Card
                        elevation={0}
                        sx={{
                            border: `1px solid ${theme.palette.divider}`,
                            bgcolor: "background.paper",
                        }}
                    >
                        <CardContent>
                            <Stack spacing={3}>
                                <Box>
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight={700}
                                        sx={{ mb: 1.5, color: "secondary.main" }}
                                    >
                                        Ongoing Deals
                                    </Typography>

                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        sx={{
                                            borderColor: "primary.main",
                                            color: "primary.dark",
                                        }}
                                        onClick={() => navigate("/buyer-dashboard")}
                                    >
                                        Go to Offer
                                    </Button>
                                </Box>

                                <Divider />

                                <Box>
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight={700}
                                        sx={{ mb: 1.5, color: "secondary.main" }}
                                    >
                                        Trade Diversity
                                    </Typography>

                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        sx={{
                                            borderColor: "primary.main",
                                            color: "primary.dark",
                                        }}
                                        onClick={() => navigate(`/abc?country=${activeCountry}`)}
                                    >
                                        Go to ABC
                                    </Button>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Box>
            </Stack>
        </Box>
    );
}

function MiniChart() {
    return (
        <Box>
            <Box
                sx={{
                    height: 42,
                    borderRadius: 1,
                    bgcolor: "primary.light",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 1,
                }}
            >
                <Typography variant="body2" fontWeight={600}>
                    120
                </Typography>
            </Box>

            <Box
                sx={{
                    height: 42,
                    borderRadius: 1,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.default",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                Buyer
            </Box>
        </Box>
    );
}