import { Box, Grid, Typography, Divider, Link } from "@mui/material";

export default function HowToPay() {
    return (
        <Box sx={{ maxWidth: 1200, mx: "auto", border: "1px solid #ddd", my: 4 }}>

            <Grid container sx={{ background: "#cfe5a5" }}>
                <Grid size={{ xs: 6 }} sx={{ textAlign: "center", py: 2 }}>
                    <Typography variant="h6" fontWeight={600}>
                        HOW TO PAY
                    </Typography>
                </Grid>
                <Grid size={{ xs: 6 }} sx={{ textAlign: "center", py: 2 }}>
                    <Typography variant="h6" fontWeight={600}>
                        DOCUMENT WE PROVIDE
                    </Typography>
                </Grid>
            </Grid>

            <Divider />

            <Grid container>
                <Grid size={{ xs: 12, md: 6 }} sx={{ p: 3 }}>
                    {[
                        ["Beneficiary Name", "Sourceseas Overseas Private Limited"],
                        ["Beneficiary Address", "C-604, Shree Nidhi Res., Near Sudama Chowk, Surat (GUJ), India - 394101"],
                        ["Bank Name", "AXIS BANK LTD."],
                        ["Bank Address", "Ground floor, Shop No: 5–9, Garden Valley, Surat"],
                        ["Account No", "917020053594034"],
                        ["IFSC Code", "UTIB0002641"],
                        ["Swift Code", "AXISINBB047"],
                        ["AD Code", "63600475600009"],
                    ].map(([label, value]) => (
                        <Box
                            key={label}
                            sx={{
                                display: "flex",
                                alignItems: "flex-start",
                                mb: 2
                            }}
                        >
                            <Typography
                                sx={{
                                    minWidth: 180,
                                    fontWeight: 600,
                                    lineHeight: 1.6
                                }}
                            >
                                {label}
                            </Typography>

                            <Typography
                                sx={{
                                    lineHeight: 1.6,
                                    color: "#222",
                                    wordBreak: "break-word"
                                }}
                            >
                                {value}
                            </Typography>
                        </Box>
                    ))}

                </Grid>

                <Grid
                    size={{ md: 1 }}
                    sx={{
                        display: { xs: "none", md: "block" },
                        borderLeft: "1px solid #ddd"
                    }}
                />

                <Grid size={{ xs: 12, md: 5 }} sx={{ p: 3 }}>
                    {[
                        ["Commercial Invoice", "3 Original"],
                        ["Commercial Packing List", "3 Original"],
                        ["Ocean Freight Bill", "3 Original"],
                        ["Phytosanitary", "Original"],
                        ["Bank Cover Letter", "Original"],
                        ["Certificate of Origin", "Original"],
                        ["Report (Lab / APEDA / MRL)", "Original"],
                        ["Marine Insurance Cover", "Original"],
                        ["Others", "As requested"],
                    ].map(([label, value]) => (
                        <Box key={label} sx={{ display: "flex", mb: 2 }}>
                            <Typography sx={{ flex: 1 }}>{label}</Typography>
                            <Link underline="hover" sx={{ fontWeight: 600 }}>
                                {value}
                            </Link>
                        </Box>
                    ))}
                </Grid>
            </Grid>
        </Box>
    );
}