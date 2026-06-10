import { Box, Paper, Stack, Typography } from "@mui/material";

export default function ContactInfoCard({
    titleHighlight,
    title,
    description,
    details,
}: {
    titleHighlight: string;
    title: string;
    description: string;
    details: string[];
}) {
    return (
        <Paper
            elevation={0}
            sx={{
                p: { xs: 2.5, sm: 3, md: 4 },
                borderRadius: 4,
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
                boxShadow: "0 18px 45px rgba(62,49,38,0.08)",
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    mb: 2,
                    color: "text.primary",
                    fontWeight: 800,
                }}
            >
                <Box component="span" sx={{ color: "primary.main" }}>
                    {titleHighlight}
                </Box>{" "}
                {title}
            </Typography>

            <Typography
                sx={{
                    color: "text.secondary",
                    fontSize: 16,
                    lineHeight: 1.8,
                    mb: 3,
                }}
            >
                {description}
            </Typography>

            <Stack
                spacing={1}
                sx={{
                    p: 2.5,
                    borderRadius: 3,
                    bgcolor: "primary.light",
                    border: "1px solid",
                    borderColor: "divider",
                }}
            >
                {(Array.isArray(details) ? details : []).map((item, index) => (
                    <Typography
                        key={index}
                        sx={{
                            color:
                                index === details.length - 1
                                    ? "secondary.dark"
                                    : "text.secondary",
                            fontWeight: index === details.length - 1 ? 800 : 500,
                            fontSize: index === details.length - 1 ? 18 : 15,
                        }}
                    >
                        {item}
                    </Typography>
                ))}
            </Stack>
        </Paper>
    );
}