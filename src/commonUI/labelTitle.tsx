import { Box, Typography } from "@mui/material";

export default function labelTitle({title, label}: {title: string, label: string}) {
    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'center', gap: 2, py: 4 }}>
            <Typography
                variant="h4"
                component="span"
                sx={{
                    color: "#8BC34A",
                    fontWeight: 600,
                    borderBottom: "3px solid #8BC34A",
                    paddingBottom: "2px",
                }}
            >
                {title}
            </Typography>
            <Typography
                variant="h4"
                component="span"
                sx={{ color: "text.primary", fontWeight: 600 }}
            >
                {label}
            </Typography>
        </Box>
    )
}