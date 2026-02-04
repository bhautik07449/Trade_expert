import { Box, Typography, Avatar } from "@mui/material";

export default function AboutTestimonial() {
    return (
        <Box
            sx={{
                bgcolor: "#e9dfd6",
                py: 8,
            }}
        >
            {/* Centered Container */}
            <Box
                sx={{
                    maxWidth: "1100px",
                    mx: "auto",
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                    gap: 6,
                    px: { xs: 3, md: 0 },
                }}
            >
                {/* ABOUT US */}
                <Box>
                    <Typography
                        variant="h4"
                        sx={{
                            color: "#8BC34A",
                            fontWeight: 500,
                            borderBottom: "3px solid #8BC34A",
                            display: "inline-block",
                            mb: 4,
                        }}
                    >
                        About Us
                    </Typography>

                    <Typography sx={{ mb: 3, lineHeight: 1.8 }}>
                        We at sourceseas overseas is working continuously for improving & raising the standard of agri and foods exporting to all over the world from India.The word Quality is what we love and that is what we deliver & it is the main objective of our firm since formed. Sourceseas overseas is uniq in its domain as it working and collaborate with directly farmers , agro & food processors in india.
                    </Typography>

                    <Typography sx={{ mb: 3, lineHeight: 1.8 }}>
                        Sourceseas overseas is able to serve on a seasonal crops and can extend availability for many crops.
                    </Typography>

                    <Typography sx={{ mb: 3, lineHeight: 1.8 }}>
                        Our utmost priority is the quality consciousness and hence each single products is inspected under agricultural and processed food products export development authority (APEDA) for pesticide free export. we have one of the largest storing spaces in the local area and hence we are capable of fulfilling any size order and ready to export immediately
                    </Typography>

                    <Typography sx={{ lineHeight: 1.8 }}>
                        As export requires process knowledge & with talented & motivated work team focused on strong vision and mission, Sourceseas overseas is rapidly expanding its reach across the globe. we will be happy to associate with you..!!
                    </Typography>
                </Box>

                {/* TESTIMONIALS */}
                <Box textAlign="center">
                    <Typography
                        variant="h4"
                        sx={{
                            color: "#8BC34A",
                            fontWeight: 500,
                            borderBottom: "3px solid #8BC34A",
                            display: "inline-block",
                            mb: 4,
                        }}
                    >
                        Testimonials
                    </Typography>

                    <Avatar
                        sx={{
                            width: 120,
                            height: 120,
                            mx: "auto",
                            mb: 3,
                            bgcolor: "#f0f0f0",
                            color: "#aaa",
                            fontSize: 14,
                        }}
                    >
                        NO IMAGE
                    </Avatar>

                    <Typography sx={{ mb: 3, lineHeight: 1.8 }}>
                        Amazing experience, very knowledgeable people in team, got served
                        with top-notch quality.
                    </Typography>

                    <Typography sx={{ fontWeight: 600 }}>
                        • JOYMAGTI BAY •
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
