import { Box, Typography, Card, CardContent } from "@mui/material";
import { keyframes } from "@mui/system";

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

export default function CommPressSection() {
    const newsItems = [
        "Global trade markets see 5% increase in Q3.",
        "New policies introduced for international logistics.",
        "Tech innovations driving next-gen supply chains.",
        "Sustainability goals met ahead of schedule.",
        "Commodity prices stabilize after recent fluctuations."
    ];

    const sliderItems = [...newsItems, ...newsItems];

    return (
        <Box sx={{ mb: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%', overflow: 'hidden' }}>
            <Typography variant="h6" fontWeight="bold" sx={{ textTransform: 'uppercase', borderBottom: '2px solid', borderColor: 'primary.main', pb: 0.5, mb: 1 }}>
                COMM-PRESS
            </Typography>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 4 }}>
                (NEWS & EVENTS)
            </Typography>

            <Box sx={{ width: '100%', overflow: 'hidden', py: 2 }}>
                <Box
                    sx={{
                        display: 'flex',
                        width: 'max-content',
                        animation: `${scroll} 25s linear infinite`,
                        '&:hover': {
                            animationPlayState: 'paused'
                        }
                    }}
                >
                    {sliderItems.map((news, index) => (
                        <Card 
                            key={index} 
                            elevation={0}
                            sx={{ 
                                minWidth: 350, 
                                maxWidth: 400,
                                mx: 2, 
                                bgcolor: 'primary.light', 
                                color: 'primary.contrastText',
                                borderRadius: 3,
                                border: '1px solid',
                                borderColor: 'primary.main',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <CardContent sx={{ '&:last-child': { pb: 2 } }}>
                                <Typography variant="body1" fontWeight="500" fontStyle="italic">
                                    "{news}"
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}
