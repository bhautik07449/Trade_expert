import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";

export default function Tradeoffer() {
    return (
        <Box sx={{ bgcolor: "white", minHeight: "100vh", pb: 8 }}>
            <Box
                component="img"
                src="https://sourceseas.itcoders.in/img/front-end/quality.jpg"
                alt="Quality Policies"
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
                    Trade Offer
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
                    We are open to trade offers and collaborations. If you have a proposal or would like to discuss potential partnerships, please feel free to reach out to us. We value mutually beneficial relationships and are always interested in exploring new opportunities. Contact us at [contact email] for more information.
                </Typography>
            </Container>

            <Container maxWidth="lg" sx={{ pt: 4 }}>
                <Grid container spacing={2} justifyContent="center">
                    {[
                        "GROW WITH SOURCESEAS | BECOME AFFILIATE (COMMITTION) AGENT",
                        "LETS GROW TOGETHER | JOIN HAND FOR JOINT-VENTURE ASSOCIATION",
                        "BECOME EXCLUSIVE FRANCHISEE DISTRIBUTOR",
                        "WHOOPING TRADE DEALS ON STOCK-LOTS",
                    ].map((text, i) => (
                        <Grid key={i}>
                            <Button
                                variant="outlined"
                                sx={{
                                    borderColor: "black",
                                    color: "black",
                                    fontSize: "12px",
                                    px: 2,
                                    py: 1,
                                }}
                            >
                                {text}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <Container maxWidth="md" sx={{ mt: 5 }}>
                <Box
                    sx={{
                        border: "1px solid #ccc",
                        p: 3,
                        bgcolor: "white",
                        textAlign: "center",
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                        AFFILIATE (COMMITTION) AGENT PROPOSAL
                    </Typography>

                    <Typography sx={{ fontSize: "14px", color: "#555" }}>
                        With Sourceseas overseas Pvt. Ltd., our affiliate can grow and
                        nurture its entrepreneurship skills and fulfill their dream of
                        entrepreneurship. There is no collateral or investment required.
                        Work anytime and earn at your comfort.
                    </Typography>
                </Box>
            </Container>

            <Container maxWidth="sm" sx={{ mt: 5 }}>
                <Box sx={{ bgcolor: "white", p: 4 }}>
                    <TextField
                        fullWidth
                        label="Name"
                        variant="outlined"
                        sx={{ mb: 3 }}
                    />

                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        sx={{ mb: 3 }}
                    />

                    <TextField
                        fullWidth
                        label="Phone"
                        variant="outlined"
                        sx={{ mb: 3 }}
                    />

                    <TextField
                        fullWidth
                        label="Message"
                        multiline
                        rows={4}
                        variant="outlined"
                        sx={{ mb: 3 }}
                    />

                    <Box textAlign="center">
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: "#5a3e2b",
                                px: 4,
                                "&:hover": { bgcolor: "#4a3324" },
                            }}
                        >
                            Submit your interest
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}