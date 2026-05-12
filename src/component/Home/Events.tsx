import {
    Box,
    Grid,
    Typography,
    Chip
} from "@mui/material";
import LabelTitle from "../../commonUI/labelTitle";

const staticData = [
    {
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80",
        tag: "Conference",
        title: "Global Trade & Export Summit 2026",
        description: "Join industry leaders and policymakers for a deep dive into the future of global trade, export strategies, and cross-border commerce innovation.",
    },
    {
        image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400&q=80",
        tag: "Workshop",
        title: "Export Documentation Masterclass",
        description: "A hands-on workshop covering essential export documentation, compliance requirements, and best practices for seamless international shipping. Explore cutting-edge trade technologies, connect with global buyers and sellers, and discover new market opportunities at India's largest trade expo",
    },
    {
        image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=400&q=80",
        tag: "Expo",
        title: "International Trade Expo 2026",
        description: "Explore cutting-edge trade technologies, connect with global buyers and sellers, and discover new market opportunities at India's largest trade expo.",
    }
];

export default function Events() {
    return (
        <Box
            sx={{
                py: { xs: 5, md: 8 },
                bgcolor: "white",
                textAlign: "center",
                boxSizing: "border-box",
            }}
        >
            <Box
                sx={{
                    maxWidth: "1200px", mx: "auto",
                    px: { xs: 1, sm: 3, md: 5 },
                    boxSizing: "border-box",
                    mb: 4,
                }}
            >
                <LabelTitle title="Events" label="" />

                <Grid container spacing={3}>
                    {staticData.map((item, index) => (
                        <Grid size={{ xs: 12, md: 6, lg: 6 }} key={index}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    borderRadius: 1,
                                    overflow: "hidden",
                                    border: "1px solid",
                                    borderColor: "divider",
                                    backgroundColor: "background.paper",
                                    boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                                    transition: "all 0.3s ease",
                                    height: "100%",
                                    "&:hover": {
                                        boxShadow: "0 8px 28px rgba(0,0,0,0.13)",
                                        transform: "translateY(-3px)",
                                        borderColor: 'primary.main',
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        width: { xs: 110, sm: 150 },
                                        minWidth: { xs: 110, sm: 150 },
                                        flexShrink: 0,
                                        position: "relative",
                                        overflow: "hidden",
                                        background: "primary.dark",
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={item.image}
                                        alt={item.title}
                                        sx={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            display: "block",
                                            transition: "transform 0.4s ease",
                                            "&:hover": {
                                                transform: "scale(1.06)",
                                            },
                                        }}
                                    />

                                    <Box
                                        sx={{
                                            position: "absolute",
                                            inset: 0,
                                            background:
                                                "linear-gradient(to right, rgba(0,0,0,0.18), transparent)",
                                            pointerEvents: "none",
                                        }}
                                    />
                                </Box>

                                <Box
                                    sx={{
                                        p: { xs: 1.5, sm: 2 },
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        flex: 1,
                                        gap: 0.75,
                                        overflow: "hidden",
                                    }}
                                >
                                    <Box>
                                        <Chip
                                            label={item.tag}
                                            size="small"
                                            sx={{
                                                fontWeight: 700,
                                                fontSize: "0.68rem",
                                                height: 22,
                                                mb: 0.75,
                                                borderRadius: "6px",
                                            }}
                                        />
                                        <Typography
                                            variant="subtitle1"
                                            fontWeight={700}
                                            sx={{
                                                fontSize: { xs: "0.82rem", sm: "0.92rem" },
                                                lineHeight: 1.35,
                                                mb: 0.5,
                                                overflow: "hidden",
                                                display: "-webkit-box",
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: "vertical",
                                            }}
                                        >
                                            {item.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                fontSize: "0.75rem",
                                                lineHeight: 1.5,
                                                overflow: "hidden",
                                                display: "-webkit-box",
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: "vertical",
                                            }}
                                        >
                                            {item.description}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}