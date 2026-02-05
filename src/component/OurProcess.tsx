import { Box } from "@mui/system";
import Title from "../commonUI/labelTitle";

export default function OurProcess() {
    return (
        <Box
            sx={{
                my: { xs: 3, md: 6 },
                px: { xs: 2, sm: 3 },
                textAlign: "center",
            }}
        >
            <Title title="Our" label=" Process" />

            <Box
                component="img"
                src="https://sourceseas.itcoders.in/img/front-end/our_prosess.png"
                alt="Our Process"
                sx={{
                    width: "100%",
                    maxWidth: 1100,
                    height: "auto",
                    mt: { xs: 2, md: 4 },
                    mx: "auto",
                    display: "block",
                }}
            />
        </Box>
    );
}