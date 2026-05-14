import {
    Box,
    Grid,
    Skeleton,
    Typography,
    Paper
} from '@mui/material';
import LabelTitle from '../../commonUI/labelTitle';
import { useState } from 'react';

export default function Analytical({ analyticsData, loading }: { analyticsData: any[]; loading: boolean }) {
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    return (
        <>
            {analyticsData?.length > 0 && (
                <Box sx={{ maxWidth: "1200px", mx: "auto", px: { xs: 2, sm: 4, md: 6 }, py: { xs: 5, md: 8 }, boxSizing: 'border-box' }}>
                    <LabelTitle title="Analytical" label="Dashboard" />

                    <Typography
                        variant="body1"
                        sx={{
                            textAlign: "center",
                            color: "text.secondary",
                            maxWidth: "680px",
                            mx: "auto",
                            mb: { xs: 4, md: 6 },
                            mt: { xs: -1.5, md: -2.5 },
                            fontSize: { xs: "0.88rem", sm: "1rem" },
                            lineHeight: 1.5,
                        }}
                    >
                        Monitor aggregate trading volumes, global orders, and active procurement metrics across our centralized B2B marketplace.
                    </Typography>

                    <Box sx={{ width: '100%' }}>
                        {loading ? (
                            <Grid container spacing={3.5}>
                                {[...Array(6)].map((_, index) => (
                                    <Grid size={{ xs: 12, md: 6, lg: 4 }} key={index}>
                                        <Skeleton
                                            variant="rounded"
                                            height={150}
                                            sx={{ borderRadius: 3, boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        ) : (
                            <Grid container spacing={3.5}>
                                {analyticsData?.map((stat) => (
                                    <Grid size={{ xs: 12, md: 6, lg: 4 }} key={stat.id}>
                                        <Paper
                                            id={`analytical-stat-card-${stat.id}`}
                                            onMouseEnter={() => setHoveredId(stat.id)}
                                            onMouseLeave={() => setHoveredId(null)}
                                            sx={{
                                                borderRadius: 3,
                                                border: "1px solid",
                                                borderColor: hoveredId === stat.id ? "#f4a024" : "rgba(0, 0, 0, 0.08)",
                                                background: hoveredId === stat.id
                                                    ? "linear-gradient(145deg, #ffffff, #fffdfa)"
                                                    : "#ffffff",
                                                p: { xs: 3, sm: 4 },
                                                cursor: 'pointer',
                                                transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                                                position: 'relative',
                                                overflow: 'hidden',
                                                minHeight: 150,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                boxShadow: hoveredId === stat.id
                                                    ? "0 12px 30px rgba(244, 160, 36, 0.12)"
                                                    : "0 4px 20px rgba(0, 0, 0, 0.02)",
                                                transform: hoveredId === stat.id ? 'translateY(-5px)' : 'translateY(0)',
                                                "&::before": {
                                                    content: '""',
                                                    position: "absolute",
                                                    top: 0,
                                                    left: 0,
                                                    width: "100%",
                                                    height: "4px",
                                                    background: hoveredId === stat.id ? "#f4a024" : "transparent",
                                                    transition: "background 0.3s ease",
                                                }
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: -15,
                                                    right: -15,
                                                    width: 80,
                                                    height: 80,
                                                    borderRadius: '50%',
                                                    background: hoveredId === stat.id
                                                        ? "radial-gradient(circle, rgba(244, 160, 36, 0.12) 0%, transparent 70%)"
                                                        : "radial-gradient(circle, rgba(0, 0, 0, 0.01) 0%, transparent 70%)",
                                                    transition: 'all 0.4s ease',
                                                    transform: hoveredId === stat.id ? 'scale(1.5)' : 'scale(1)',
                                                }}
                                            />

                                            <Box sx={{ position: 'relative', zIndex: 1 }}>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: 'text.secondary',
                                                        fontWeight: 600,
                                                        fontSize: { xs: '0.85rem', md: '0.95rem' },
                                                        mb: 1,
                                                    }}
                                                >
                                                    {stat?.title}
                                                </Typography>

                                                <Typography
                                                    variant="h3"
                                                    sx={{
                                                        fontWeight: 800,
                                                        color: hoveredId === stat.id ? '#d97706' : '#1e293b',
                                                        letterSpacing: '-0.5px',
                                                        fontSize: { xs: '1.8rem', sm: '2.2rem' },
                                                        lineHeight: 1.2,
                                                        mb: 2,
                                                        transition: 'color 0.3s ease',
                                                    }}
                                                >
                                                    {stat?.value}
                                                </Typography>

                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Typography
                                                        component="span"
                                                        sx={{
                                                            color: '#10b981',
                                                            fontWeight: 700,
                                                            fontSize: '0.78rem',
                                                            bgcolor: 'rgba(16, 185, 129, 0.1)',
                                                            px: 1,
                                                            py: 0.25,
                                                            borderRadius: 1,
                                                        }}
                                                    >
                                                        {stat?.country}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Box>
                </Box>
            )}
        </>
    );
}