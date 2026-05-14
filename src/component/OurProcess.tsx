import { Box, Container, Typography } from "@mui/material";
import Title from "../commonUI/labelTitle";

export default function OurProcess() {
    return (
        <Box
            sx={{
                py: { xs: 5, md: 8 },
                bgcolor: "white",
                textAlign: "center",
                boxSizing: "border-box",
            }}
        >
            <Container sx={{ maxWidth: "1200px !important", mx: "auto", px: { xs: 2, sm: 3, md: 4 } }}>

                <Title title="Our" label="Process" />

                <Typography
                    variant="body1"
                    sx={{
                        textAlign: "center",
                        color: "text.secondary",
                        maxWidth: "680px",
                        mx: "auto",
                        mb: { xs: 4, md: 6 },
                        mt: { xs: -1.5, md: -2.5 },
                        fontSize: { xs: "0.88rem", sm: "1rem" },
                        lineHeight: 1.5,
                    }}
                >
                    Discover how Tradexpert transforms the way businesses trade by providing a seamless, data-driven platform for global business.
                </Typography>

                <Box
                    component="img"
                    src="https://sourceseas.itcoders.in/img/front-end/our_prosess.png"
                    alt="Our Process"
                    sx={{
                        width: "100%",
                        maxWidth: {
                            xs: "100%",
                            sm: "90%",
                            md: "800px",
                        },
                        height: "auto",
                        mx: "auto",
                        display: "block",
                    }}
                />

            </Container>
        </Box>
    );
}