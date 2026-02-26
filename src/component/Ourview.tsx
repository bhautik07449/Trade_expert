import { Box, Typography, Container } from "@mui/material";

export default function OurView() {
    return (
        <Box
            sx={{
                position: "relative",
                mt: { xs: 6, md: 10 },
                py: { xs: 6, md: 10 },
                backgroundImage:
                    "url(https://sourceseas.itcoders.in/img/video-bg.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgba(0,0,0,0.6)",
                    zIndex: 1,
                }}
            />

            <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "1fr",
                            md: "1fr 1fr",
                        },
                        gap: { xs: 5, md: 8 },
                        alignItems: "center",
                    }}
                >

                    <Box textAlign="center">
                        <Typography
                            sx={{
                                color: "#6fbf4a",
                                fontWeight: 700,
                                mb: 4,
                                fontSize: {
                                    xs: "22px",
                                    sm: "26px",
                                    md: "30px",
                                    lg: "34px",
                                },
                            }}
                        >
                            Certifications and Accreditation
                        </Typography>

                        <Box
                            component="img"
                            src="https://sourceseas.itcoders.in/files/banners/12e6ad878b5ec82e5a182acb94d3ed07.jpeg"
                            alt="Certifications"
                            sx={{
                                width: "100%",
                                maxWidth: { xs: "280px", sm: "350px", md: "450px" },
                                height: "auto",
                                mx: "auto",
                                display: "block",
                                boxShadow: 3,
                            }}
                        />
                    </Box>

                    <Box textAlign="center">
                        <Typography
                            sx={{
                                color: "#6fbf4a",
                                fontWeight: 700,
                                mb: 4,
                                fontSize: {
                                    xs: "22px",
                                    sm: "26px",
                                    md: "30px",
                                    lg: "34px",
                                },
                            }}
                        >
                            Our YouTube Channel
                        </Typography>

                        <Box
                            sx={{
                                position: "relative",
                                width: "100%",
                                maxWidth: "500px",
                                mx: "auto",
                                aspectRatio: "16/9",
                                overflow: "hidden",
                                boxShadow: 3,
                            }}
                        >
                            <iframe
                                src="https://www.youtube.com/embed/zFd9B9PR4Bw"
                                title="YouTube video player"
                                allowFullScreen
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    border: "none",
                                }}
                            />
                        </Box>
                    </Box>

                </Box>
            </Container>
        </Box>
    );
}