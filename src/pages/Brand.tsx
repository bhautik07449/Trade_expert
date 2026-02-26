import { Box, Typography } from "@mui/material";

export default function Brand() {
    return (
        <Box sx={{ bgcolor: 'white', minHeight: '100vh', pb: 10 }}>
            <img src="https://sourceseas.itcoders.in/img/front-end/brands.jpg" alt="Brands" style={{ width: '100%', minHeight: '200px', maxHeight: '400px', }} />
            <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: 'secondary.main' }}>
                    Agri & Foods
                </Typography>
            </Box>

            <Box sx={{ maxWidth: "1100px", mx: "auto", px: 2, display: "flex", gap: 4, flexWrap: "wrap", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                <img src="https://sourceseas.itcoders.in/files/brand/logo/3/logo.png" alt="FSSAI Approved Foods" style={{ width: '100px', height: "100px" }} />
                <Box>
                    <Typography variant="h6" sx={{ color: 'secondary.main', mb: 4 }}>
                        FLAVOURICA
                    </Typography>
                    <Typography>Inspired by flavours,Flavourica is registered brand of Sourceseas overseas which is house of mouthwatering aroma and flavoured items made using natural colors and ingredients incepted for enrich peoples's taste globally.Flavourica having totally uniq range of flavoured items like aromatic ingredient,instant ready to eat, snacks,sweets,dryfruits,chocolates in world-class quality.</Typography>
                </Box>
            </Box>
        </Box >
    )
}