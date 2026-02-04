import { Box, Typography } from "@mui/material";

export default function OurView() {
    return (
        <Box
            sx={{
                position: "relative",
                p: 4,
                my: 4,
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
                    backgroundColor: "rgba(0,0,0,0.5)",
                    zIndex: 1
                }}
            />

            <Box
                sx={{
                    position: "relative",
                    zIndex: 2,
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: 4,
                }}
            >
                <Box
                    sx={{
                        borderRadius: 2,
                        textAlign: "center",
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{ color: "#6fbf4a", mb: 4, fontWeight: 600 }}
                    >
                        Certifications and accreditation
                    </Typography>
                    <Box
                        sx={{
                            height: 300,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <img
                            src="https://sourceseas.itcoders.in/files/banners/12e6ad878b5ec82e5a182acb94d3ed07.jpeg"
                            alt="We Promote Make in India"
                            style={{
                                width: "480px",
                                maxHeight: "100%",
                                objectFit: "contain",
                            }}
                        />
                    </Box>
                </Box>

                <Box
                    sx={{
                        borderRadius: 2,
                        textAlign: "center",
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{ color: "#6fbf4a", mb: 4, fontWeight: 600 }}
                    >
                        Our YouTube Channel
                    </Typography>

                    <Box
                        sx={{
                            height: 300,
                            borderRadius: 2,
                            overflow: "hidden",
                        }}
                    >
                        <iframe
                            src="https://www.youtube.com/embed/zFd9B9PR4Bw"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{
                                width: "480px",
                                height: "100%",
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}