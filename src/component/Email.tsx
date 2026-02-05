import { Box, Button, TextField, Typography } from "@mui/material";

export default function Email() {
    return (
        <Box
            sx={{
                background: "linear-gradient(to right, #b7e3a1, #9ee37d)",
                py: { xs: 2, md: 3 },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                    gap: { xs: 2, md: 3 },
                    maxWidth: "1150px",
                    mx: "auto",
                    px: 3,
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                        color: "#1a1a1a",
                        textAlign: { xs: "center", md: "left" },
                    }}
                >
                    NEWSLETTER SIGNUP
                </Typography>

                <TextField
                    placeholder="Email"
                    type="email"
                    fullWidth
                    size="small"
                    sx={{
                        backgroundColor: "#fff",
                        borderRadius: 1,
                    }}
                />

                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#5bc0de",
                        textTransform: "none",
                        px: 3,
                        py: 1,
                        fontSize: "14px",
                        whiteSpace: "nowrap",
                        width: { xs: "100%", md: "auto" },
                        "&:hover": {
                            backgroundColor: "#46b8da",
                        },
                    }}
                >
                    Subscribe
                </Button>
            </Box>
        </Box>
    );
}