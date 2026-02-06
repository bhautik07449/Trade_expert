import { Box, Typography } from "@mui/material";

export default function QualityPolicies() {
    return (
        <Box sx={{ bgcolor: 'white', minHeight: '100vh', pb: 10 }}>
            <img src="https://sourceseas.itcoders.in/img/front-end/quality.jpg" alt="Quality Policies" style={{ width: '100%', height: 'auto' }} />
            <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: 'secondary.main' }}>
                    Quality Policies
                </Typography>
            </Box>


            <Box sx={{ maxWidth: "1100px", mx: "auto", px: 2 }}>
                <Typography variant="h6" sx={{ color: 'secondary.main', mb: 4 }}>
                    We at sourceseas.com firmly believe in supplying & sourcing of quality products.We maintain top-notch quality in each every process in our practises.We belive superior quality foods and agrinproducts needs to be reach in every corner of world and that is our main focus.If we source than also takecare of sourcing from ISO,FSSAI,HACCP,HALAL,BRC,FDA, approved suppliers only for food products.
                </Typography>

                <Box sx={{ border: "2px solid #3E3126", p: 2, mb: 2 }}>Agri & Foods</Box>

                <Box sx={{ display: "flex", gap: 3 }}>
                    <img src="https://sourceseas.itcoders.in/files/quality_policy/image/4/fssai%20approved%20foods.jpg" alt="FSSAI Approved Foods" style={{ width: '300px', height: "300px" }} />
                    <Box>
                        <Typography variant="h6" sx={{ color: 'secondary.main', mb: 4 }}>
                            FSSAI Approved Foods
                        </Typography>
                        <Typography>we at sourceseas commited to deliver naturally fresh ,without adultration and non gmo food and agri products and for that we follow best practises and source also from supplier who follow best practises food standard available in market.Fssai is one of renowned food saftey indian standard available in world market, we follow and source from certified fssai manufacturer and processor available in indian market for agro and food industry.</Typography>
                    </Box>
                </Box>

                <Box sx={{ display: "flex", gap: 3 }}>
                    <Box>
                        <Typography variant="h6" sx={{ color: 'secondary.main', mb: 4 }}>
                            ISO 22000:2005
                        </Typography>
                        <Typography>we at sourceseas commited to deliver naturally fresh ,without adultration and non gmo food and agri products and for that we follow best practises and source also from supplier who follow best practises food standard available in market.ISO 22000:2005 is one of renowned food saftey world standard available in world market, we also follow and source from certified ISO 22000:2005 manufacturer and processor available in indian market for agro and food industry.</Typography>
                    </Box>
                    <img src="https://sourceseas.itcoders.in/files/quality_policy/image/5/iso%20food%20standard.jpg" alt="FSSAI Approved Foods" style={{ width: '200px', height: "200px" }} />
                </Box>
            </Box>
        </Box >
    )
}