import { Box, Typography } from "@mui/material";

export default function LabelTitle({
    title,
    label,
    tagLine,
    id
}: {
    title: string;
    label: string;
    tagLine?: string;
    id?: string
}) {
    return (
        <Box>
            <Box
                id={id}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "baseline",
                    gap: { xs: 1, sm: 1.5, md: 2 },
                    pt: { xs: 1, sm: 2, md: 3 },
                    mb: { xs: 3, sm: 4, md: 5 },
                    flexWrap: "wrap",
                    textAlign: "center",
                }}
            >
                <Typography
                    component="h2"
                    variant="h3"
                    sx={{
                        color: "#8BC34A",
                        fontWeight: 800,
                        borderBottom: "3px solid #8BC34A",
                        pb: "2px",
                        fontSize: {
                            xs: "22px",
                            sm: "26px",
                            md: "32px",
                            lg: "36px",
                        },
                    }}
                >
                    {title}
                </Typography>

                <Typography
                    component="h2"
                    variant="h3"
                    sx={{
                        color: "text.primary",
                        fontWeight: 800,
                        fontSize: {
                            xs: "22px",
                            sm: "26px",
                            md: "32px",
                            lg: "36px",
                        },
                    }}
                >
                    {label}
                </Typography>
            </Box>

            {tagLine && (
                <Typography
                    variant="body1"
                    sx={{
                        textAlign: "center",
                        color: "text.secondary",
                        maxWidth: "720px",
                        mx: "auto",
                        mb: { xs: 4, md: 6 },
                        mt: { xs: -1.5, md: -2.5 },
                        fontSize: { xs: "0.92rem", sm: "1rem" },
                        lineHeight: 1.8,
                    }}
                >
                    {tagLine}
                </Typography>
            )}
        </Box>
    );
}