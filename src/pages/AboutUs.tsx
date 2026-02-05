import { Box, Button, Typography } from "@mui/material";
import Title from "../commonUI/labelTitle"
import OurView from "../component/Ourview";

export default function AboutUs() {
    return (
        <Box>
            <Title title="Know" label="Us" />

            <Box sx={{ maxWidth: "1100px", mx: "auto", textAlign: "center" }}>
                <Typography variant="h6" sx={{ mb: 2, fontSize: "18px" }}>
                    We at sourceseas overseas is working continuously for improving & raising the standard of agri and foods exporting to all over the world from India.The word Quality is what we love and that is what we deliver & it is the main objective of our firm since formed. Sourceseas overseas is uniq in its domain as it working and collaborate with directly farmers , agro & food processors in india.
                </Typography>

                <Typography variant="h6" sx={{ mb: 2, fontSize: "18px" }}>
                    Sourceseas overseas is able to serve on a seasonal crops and can extend availability for many crops.
                </Typography>

                <Typography variant="h6" sx={{ mb: 2, fontSize: "18px" }}>
                    Sourceseas overseas is responsible and commited to our each single clients and their needs. We here works on strives to build strong relationships with clients that built on honesty, reliability, and quality.Firm not fullfilling just importing requirement of each client but at the same time deliver satisfaction & value that associate with requirement.
                </Typography>

                <Typography variant="h6" sx={{ mb: 2, fontSize: "18px" }}>
                    Our utmost priority is the quality consciousness and hence each single products is inspected under agricultural and processed food products export development authority (APEDA) for pesticide free export. we have one of the largest storing spaces in the local area and hence we are capable of fulfilling any size order and ready to export immediately.
                </Typography>

                <Typography variant="h6" sx={{ mb: 2, fontSize: "18px" }}>
                    As export requires process knowledge & with talented & motivated work team focused on strong vision and mission, Sourceseas overseas is rapidly expanding its reach across the globe.while sourceseas overseas was work only within saarc and asian in beginning from formation,now sourceseas overseas is able to deliver satisfaction and value with need all over the world. we will be happy to associate with you!
                </Typography>
            </Box>

            <Box sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1.5fr))",
                gap: 4,
                maxWidth: "1500px",
                mx: "auto",
                textAlign: "center",
                py: 6
            }}>
                <Box
                    sx={{
                        textAlign: "center",
                        mb: 5
                    }}
                >
                    <Box sx={{
                        my: 4
                    }}>
                        <Typography
                            variant="h5"
                            component="span"
                            sx={{
                                color: "#8BC34A",
                                fontWeight: 600,
                                borderBottom: "3px solid #8BC34A",
                                pb: "4px",
                            }}
                        >
                            Wants to
                        </Typography>{" "}
                        <Typography
                            variant="h5"
                            component="span"
                            sx={{ color: "#1a1a1a", fontWeight: 600 }}
                        >
                            source from us
                        </Typography>
                    </Box>

                    <Typography>To facilitate trade ethically</Typography>
                </Box>
                <Box
                    sx={{
                        textAlign: "center",
                        mb: 5
                    }}
                >
                    <Box sx={{
                        my: 4
                    }}>
                        <Typography
                            variant="h5"
                            component="span"
                            sx={{
                                color: "#8BC34A",
                                fontWeight: 600,
                                borderBottom: "3px solid #8BC34A",
                                pb: "4px",
                            }}
                        >
                            Our
                        </Typography>{" "}
                        <Typography
                            variant="h5"
                            component="span"
                            sx={{ color: "#1a1a1a", fontWeight: 600 }}
                        >
                            Mission
                        </Typography>
                    </Box>

                    <Typography>To become foremost trade facilitator of India to increase india's global share</Typography>
                </Box>
                <Box
                    sx={{
                        textAlign: "center",
                        mb: 5
                    }}
                >
                    <Box sx={{
                        my: 4
                    }}>
                        <Typography
                            variant="h5"
                            component="span"
                            sx={{
                                color: "#8BC34A",
                                fontWeight: 600,
                                borderBottom: "3px solid #8BC34A",
                                pb: "4px",
                            }}
                        >
                            Our
                        </Typography>{" "}
                        <Typography
                            variant="h5"
                            component="span"
                            sx={{ color: "#1a1a1a", fontWeight: 600 }}
                        >
                            Objective
                        </Typography>
                    </Box>

                    <Typography>To facilitate trade with its user interactive innovated trade facilitation services.</Typography>
                </Box>
                <Box
                    sx={{
                        textAlign: "center",
                        mb: 5
                    }}
                >
                    <Box sx={{
                        my: 4
                    }}>
                        <Typography
                            variant="h5"
                            component="span"
                            sx={{
                                color: "#8BC34A",
                                fontWeight: 600,
                                borderBottom: "3px solid #8BC34A",
                                pb: "4px",
                            }}
                        >
                            Our
                        </Typography>{" "}
                        <Typography
                            variant="h5"
                            component="span"
                            sx={{ color: "#1a1a1a", fontWeight: 600 }}
                        >
                            Core competency
                        </Typography>
                    </Box>

                    <Typography>Preffered choice partner for long-haul end to end trade solution.</Typography>
                </Box>
            </Box>

            <OurView />

            <Box sx={{ bgcolor: "white", textAlign: "center" }}>
                <Title title="Delivery" label="Reach" />
                <img src="https://sourceseas.itcoders.in/img/front-end/network-reach.gif" alt="Network Reach" />
            </Box>
        </Box>
    )
}