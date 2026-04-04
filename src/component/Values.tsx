import {
    Box,
    Button,
    Typography,
    Container,
    Grid,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";
import SecurityIcon from "@mui/icons-material/Security";
import DiamondIcon from "@mui/icons-material/Diamond";
import Title from "../commonUI/labelTitle";
import { useNavigate } from "react-router-dom";

export default function Values() {
    const navigate = useNavigate();

    const data = [
        { title: "LOGISTIC SERVICES", icon: LocalShippingIcon },
        { title: "CUSTOMIZED PACKAGING SERVICES", icon: InventoryIcon },
        { title: "ALL TRANSIT RELATED INSURANCE", icon: SecurityIcon },
        { title: "THIRD PARTY INSPECTION", icon: DiamondIcon },
    ];

    const tab = [
        {
            label: "Become Authorized",
            value: "Supplier",
            button: "Register",
            link: "/suppliers/register",
        },
        {
            label: "Wants to",
            value: "source from us",
            button: "Login or Register",
            link: "/login",
        },
    ];

    return (
        <>
            <Box sx={{ py: { xs: 3, md: 4 }, bgcolor: "#f5efe9" }}>
                <Container maxWidth="lg">
                    <Title title="Value Added" label="Services" />

                    <Grid container spacing={4} mt={2}>
                        {data.map((item, index) => (
                            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                                <Box
                                    sx={{
                                        textAlign: "center",
                                        p: 3,
                                        borderRadius: 3,
                                        transition: "0.3s",
                                        "&:hover": {
                                            transform: "translateY(-6px)",
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: { xs: 60, md: 80 },
                                            height: { xs: 60, md: 80 },
                                            borderRadius: "50%",
                                            bgcolor: "#7ac943",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            mx: "auto",
                                            mb: 3,
                                        }}
                                    >
                                        <item.icon
                                            sx={{
                                                color: "#fff",
                                                fontSize: { xs: 28, md: 36 },
                                            }}
                                        />
                                    </Box>

                                    <Typography
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: {
                                                xs: "14px",
                                                sm: "15px",
                                                md: "16px",
                                            },
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: "#fff" }}>
                <Container maxWidth="md">
                    <Grid container spacing={4}>
                        {tab.map((item, index) => (
                            <Grid size={{ xs: 12, md: 6 }} key={index}>
                                <Box
                                    sx={{
                                        border: "1px solid #e0e0e0",
                                        borderRadius: 3,
                                        p: { xs: 4, md: 6 },
                                        textAlign: "center",
                                        transition: "0.3s",
                                        "&:hover": {
                                            boxShadow: 4,
                                        },
                                    }}
                                >
                                    <Box mb={4}>
                                        <Typography
                                            component="span"
                                            sx={{
                                                color: "#8BC34A",
                                                fontWeight: 500,
                                                borderBottom: "3px solid #8BC34A",
                                                pb: "4px",
                                                fontSize: {
                                                    xs: "18px",
                                                    md: "22px",
                                                },
                                            }}
                                        >
                                            {item.label}
                                        </Typography>{" "}
                                        <Typography
                                            component="span"
                                            sx={{
                                                fontWeight: 500,
                                                fontSize: {
                                                    xs: "18px",
                                                    md: "22px",
                                                },
                                            }}
                                        >
                                            {item.value}
                                        </Typography>
                                    </Box>

                                    <Button
                                        variant="contained"
                                        fullWidth={true}
                                        sx={{
                                            bgcolor: "#f4a024",
                                            py: 1.3,
                                            fontSize: {
                                                xs: "14px",
                                                md: "16px",
                                            },
                                            textTransform: "none",
                                            "&:hover": {
                                                bgcolor: "#e0931f",
                                            },
                                        }}
                                        onClick={() => navigate(item.link)}
                                    >
                                        {item.button}
                                    </Button>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </>
    );
}