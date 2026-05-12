import { Box, Typography } from "@mui/material";

export default function LabelTitle({
    title,
    label,
    id
}: {
    title: string;
    label: string;
    id?: string
}) {
    return (
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
                component="span"
                sx={{
                    color: "#8BC34A",
                    fontWeight: 700,
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
                component="span"
                sx={{
                    color: "text.primary",
                    fontWeight: 700,
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
    );
}