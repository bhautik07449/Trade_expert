import { Box, Typography } from "@mui/material";

export default function Faq(){
    return(
        <Box sx={{ bgcolor: 'white', minHeight: '100vh', pb: 10 }}>
            <img src="https://sourceseas.itcoders.in/img/front-end/faq.jpg" alt="Quality Policies" style={{ width: '100%', minHeight: '200px', maxHeight: '400px', objectFit: 'cover' }} />
            <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: 'secondary.main' }}>
                    Faq List
                </Typography>
            </Box>


            <Box sx={{ maxWidth: "1100px", mx: "auto", px: 2 }}>
                <Typography variant="h6" sx={{ color: 'secondary.main', mb: 4 }}>
                    Faq List Coming soon...!!
                </Typography>
            </Box>
        </Box >
    )
}