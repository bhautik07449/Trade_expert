import { Box, Container, Typography } from "@mui/material";

export default function Abc() {
    return (
        <Box sx={{ bgcolor: "white", minHeight: "100vh", pb: 8 }}>
            <Box
                component="img"
                src="https://sourceseas.itcoders.in/img/my_account_bg1.jpg"
                alt="Abc Menus"
                sx={{
                    width: "100%",
                    height: { xs: "200px", md: "300px" },
                    objectFit: "cover",
                }}
            />

            <Box sx={{ py: 4, textAlign: "center" }}>
                <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, color: "secondary.main" }}
                >
                    Abc Menus
                </Typography>
            </Box>

            <Container maxWidth="lg">

                <Typography
                    sx={{
                        color: "secondary.main",
                        mb: 5,
                        fontSize: { xs: "14px", sm: "16px", md: "18px" },
                        textAlign: "center",
                    }}
                >
                    We firmly believe in sourcing and supplying top-quality agri and food
                    products. We collaborate only with ISO, FSSAI, HACCP, HALAL, BRC and
                    FDA approved suppliers to ensure global food safety standards.
                </Typography>

                <Box
                    sx={{
                        border: "2px solid #3E3126",
                        textAlign: "center",
                        py: 1.5,
                        mb: 6,
                        fontWeight: 600,
                    }}
                >
                    Agri & Foods
                </Box>
            </Container>
        </Box>
    );
}