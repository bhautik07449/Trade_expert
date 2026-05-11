import {
    Box,
    Grid,
    Skeleton,
    Typography,
    Paper
} from '@mui/material';
import LabelTitle from '../../commonUI/labelTitle';
import { useEffect, useState } from 'react';

const statistics = [
    {
        id: 1,
        title: 'Total Revenue',
        value: '₹4.82 Cr',
        subtitle: 'vs last month'
    },
    {
        id: 2,
        title: 'Total Orders',
        value: '18,420',
        subtitle: 'vs last month'
    },
    {
        id: 3,
        title: 'Active Buyers',
        value: '3,291',
        subtitle: 'registered users'
    }
];

export default function Analytical() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Box sx={{ maxWidth: "1200px", mx: "auto", px: { xs: 1, sm: 3, md: 5 }, boxSizing: 'border-box', mb: 4 }}>
            <LabelTitle title="Analytical" label="Dashboard" />

            <Box sx={{ mb: 4, mt: 2, width: '100%' }}>
                {loading ? (
                    <Grid container spacing={3}>
                        {[...Array(10)].map((_, index) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
                                <Skeleton
                                    variant="rectangular"
                                    height={140}
                                    sx={{ borderRadius: 3, mb: 1 }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Grid container spacing={3}>
                        {statistics.map((stat) => (
                            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={stat.id}>
                                <Paper
                                    sx={{
                                        borderRadius: 2,
                                        border: "1.5px solid",
                                        p: 2.5,
                                        cursor: 'pointer',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        minHeight: 140,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Box>
                                        <Typography
                                            variant="h5"
                                            fontWeight={800}
                                            sx={{
                                                letterSpacing: '-0.5px',
                                                textShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                                mb: 0.25,
                                            }}
                                        >
                                            {stat.value}
                                        </Typography>
                                        <Typography variant="body2" sx={{ opacity: 0.85, fontWeight: 500, mb: 1.5 }}>
                                            {stat.title}
                                        </Typography>

                                        <Typography variant="caption" sx={{ opacity: 0.7, mt: 0.5, display: 'block' }}>
                                            {stat.subtitle}
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </Box>
    )
}