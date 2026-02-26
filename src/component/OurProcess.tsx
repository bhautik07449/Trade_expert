import { Box, Container } from "@mui/material";
import Title from "../commonUI/labelTitle";

export default function OurProcess() {
    return (
        <Box
            sx={{
                py: { xs: 3, md: 4 },
                bgcolor: "white",
                textAlign: "center",
            }}
        >
            <Container maxWidth="lg">

                <Title title="Our" label="Process" />

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
                        mt: { xs: 3, md: 5 },
                        mx: "auto",
                        display: "block",
                    }}
                />

            </Container>
        </Box>
    );
}