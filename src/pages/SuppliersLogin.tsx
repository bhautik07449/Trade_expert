import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";

export default function SuppliersLogin() {
    return (
        <Box sx={{ bgcolor: "#efefef", minHeight: "100vh", py: 5 }}>
            <Box textAlign="center" mb={4}>
                <Typography variant="h4" sx={{ fontWeight: 500 }}>
                    <span style={{ color: "#69be28", borderBottom: "2px solid #69be28" }}>Welcome</span> to sourceseas
                </Typography>
            </Box>

            <Grid
                container
                spacing={4}
                maxWidth="1100px"
                mx="auto"
                alignItems="stretch"
            >
                <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex" }}>
                    <Paper
                        sx={{
                            p: 5,
                            border: "1px solid #ddd",
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            textAlign: "center"
                        }}
                    >
                        <Typography variant="h5" sx={{ mb: 3 }}>
                            <span
                                style={{
                                    color: "#69be28",
                                    borderBottom: "2px solid #69be28",
                                }}
                            >
                                New At
                            </span>{" "}
                            Sourceseas ?
                        </Typography>

                        <Typography variant="body1" sx={{ mt: 4 }}>
                            Want to avail our service?
                        </Typography>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex" }}>
                    <Paper
                        sx={{
                            p: 5,
                            border: "1px solid #ddd",
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
                            <span
                                style={{
                                    color: "#69be28",
                                    borderBottom: "2px solid #69be28",
                                }}
                            >
                                Returning
                            </span>{" "}
                            Customer ?
                        </Typography>

                        <Box component="form" sx={{ mt: 3 }}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Email"
                                sx={{ mb: 3 }}
                            />

                            <TextField
                                fullWidth
                                size="small"
                                type="password"
                                label="Password"
                                sx={{ mb: 3 }}
                            />

                            <Button
                                variant="contained"
                                sx={{
                                    bgcolor: "#3b6e9c",
                                    px: 4,
                                    textTransform: "none",
                                    "&:hover": { bgcolor: "#2e587d" },
                                }}
                            >
                                ✔ Log In
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            <Box mt={6} textAlign="center">
                <img
                    src="https://sourceseas.itcoders.in/img/front-end/product_status_options1.jpg"
                    alt="Reason For Preferring Us"
                    style={{ width: "100%", maxWidth: "1100px" }}
                />
            </Box>

        </Box>
    )
}