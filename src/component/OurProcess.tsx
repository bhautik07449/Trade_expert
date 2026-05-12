import { Box, Container } from "@mui/material";
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