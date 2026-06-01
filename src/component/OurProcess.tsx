import { Box, Container, Typography } from "@mui/material";
import Title from "../commonUI/labelTitle";
import SearchIcon from "@mui/icons-material/Search";
import HandshakeIcon from "@mui/icons-material/Handshake";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedIcon from "@mui/icons-material/Verified";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

const processSteps = [
    {
        icon: <SearchIcon />,
        title: "Buyer Select Product & Opt For Inquiry",
        description: "Buyer chooses the required product and submits an inquiry for further process.",
    },
    {
        icon: <HandshakeIcon />,
        title: "Request Sample Or Quotation",
        description: "Buyer can request a sample or make a quotation request as per requirement.",
    },
    {
        icon: <LocalShippingIcon />,
        title: "Negotiated Quote",
        description: "sourseas.com provides the most negotiated quote with all requested value-added services.",
    },
    {
        icon: <VerifiedIcon />,
        title: "Purchase Order",
        description: "Buyer can review the quotation and give the purchase order.",
    },
    {
        icon: <AssignmentTurnedInIcon />,
        title: "Sales Contract",
        description: "sourseas.com will do contract review and make the sales contract.",
    },
];

export default function OurProcess() {
    return (
        <Box
            sx={{
                py: { xs: 6, md: 10 },
                bgcolor: "background.default",
                textAlign: "center",
                boxSizing: "border-box",
            }}
        >
            <Container
                sx={{
                    maxWidth: "1400px !important",
                    mx: "auto",
                    px: { xs: 2, sm: 3, md: 4 },
                }}
            >
                <Title title="Ecosytem " label="works like" tagLine="Discover how Tradexpert transforms the way businesses trade by providing a seamless, data-driven platform for global business." />

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "1fr 1fr",
                            md: "repeat(5, 1fr)",
                        },
                        gap: { xs: 4, md: 3 },
                        alignItems: "stretch",
                    }}
                >
                    {processSteps.map((step, index) => (
                        <Box
                            key={index}
                            sx={{
                                position: "relative",
                            }}
                        >
                            <Box
                                sx={{
                                    height: "100%",
                                    minHeight: 260,
                                    px: { xs: 3, md: 2 },
                                    py: 4,
                                    border: "1px solid",
                                    borderColor: "rgba(0,0,0,0.12)",
                                    borderRadius: "28px",
                                    bgcolor: "#fff",
                                    boxShadow: "0 18px 45px rgba(0,0,0,0.06)",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        transform: "translateY(-8px)",
                                        boxShadow: "0 24px 55px rgba(0,0,0,0.1)",
                                        borderColor: "primary.main",
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 76,
                                        height: 76,
                                        borderRadius: "22px",
                                        bgcolor: "#e9dcc8",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        mb: 3,
                                        color: "#7a5b3a",
                                        "& svg": {
                                            fontSize: 34,
                                        },
                                    }}
                                >
                                    {step.icon}
                                </Box>

                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 900,
                                        color: "text.primary",
                                        textTransform: "uppercase",
                                        letterSpacing: "1.5px",
                                        fontSize: { xs: "0.95rem", md: "0.9rem", lg: "1rem" },
                                        mb: 1.5,
                                    }}
                                >
                                    {step.title}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: "text.secondary",
                                        fontSize: { xs: "0.9rem", md: "0.86rem", lg: "0.92rem" },
                                        lineHeight: 1.7,
                                        maxWidth: 220,
                                    }}
                                >
                                    {step.description}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
}