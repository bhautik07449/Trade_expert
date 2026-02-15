import { Box, Typography } from "@mui/material";

export default function Career() {
    return (
        <Box sx={{ bgcolor: 'white', minHeight: '100vh', pb: 10 }}>
            <img src="https://sourceseas.itcoders.in/img/my_account_bg1.jpg" alt="Quality Policies" style={{ width: '100%', height: 'auto' }} />
            <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: 'secondary.main' }}>
                    Build Career at sourceseas
                </Typography>
            </Box>

            <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography
                    variant="h5"
                    sx={{ fontWeight: 600, color: 'secondary.main', mb: 2 }}
                >
                    Thanks for your interest to joining Sourceseas Overseas
                </Typography>

                <Typography
                    variant="h6"
                    sx={{ fontStyle: 'italic', mb: 3 }}
                >
                    "Why you should join at Sourceseas Overseas"
                </Typography>

                <Box sx={{ maxWidth: "900px", mx: "auto", textAlign: "left" }}>
                    <Typography sx={{ mb: 1 }}>
                        1) Young and motivated and curious team visioned to grow globally.
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                        2) Opportunity of life-time and Work-life balance.
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                        3) Support for nurturing entrepreneurship and innovation.
                    </Typography>
                    <Typography sx={{ mb: 3 }}>
                        4) Environment and engagement more than just "9am to 5pm".
                    </Typography>

                    <Typography sx={{ mb: 1 }}>
                        If interested to be part of team send your profile or CV at
                    </Typography>

                    <Typography sx={{ fontWeight: 500 }}>
                        mgmt@sourceseas.com
                    </Typography>
                    <Typography sx={{ mb: 2 }}>
                        or mgmt.sourceseas@gmail.com
                    </Typography>

                    <Typography sx={{ mb: 1 }}>
                        or get in touch with us at +91 9925099215
                    </Typography>

                    <Typography sx={{ fontWeight: 600, mt: 2 }}>
                        We would revert you for sure..!!
                    </Typography>
                </Box>
            </Box>
        </Box >
    )
}