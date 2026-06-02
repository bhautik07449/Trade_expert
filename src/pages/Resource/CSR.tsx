import { Box } from "@mui/material";
import { useState } from "react";
import PageMainLayout from "../../commonUI/PageMainLayout";

export default function CSR() {
    const [activeCountry, setActiveCountry] = useState("India");

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                minHeight: "100vh",
                pb: { xs: 6, md: 10 },
            }}
        >
            <PageMainLayout title="CSR" slug="csr" image="https://sourceseas.itcoders.in/img/front-end/csr-2.jpg" country={true} activeCountry={activeCountry} setActiveCountry={setActiveCountry} />

            <Box
                sx={{
                    maxWidth: "1400px",
                    mx: "auto",
                    mt: { xs: -5, md: -7 },
                    px: { xs: 2, sm: 3, md: 4 },
                    position: "relative",
                    zIndex: 2,
                }}
            >

            </Box>
        </Box >
    )
}