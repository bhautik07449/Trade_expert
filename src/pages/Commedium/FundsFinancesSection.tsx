import React, { useRef } from 'react';
import { Box, Typography, Button, Divider } from "@mui/material";

export default function FundsFinancesSection() {
    const countryRef = useRef<HTMLDivElement>(null);
    const companiesRef = useRef<HTMLDivElement>(null);
    const commerceRef = useRef<HTMLDivElement>(null);

    const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const buttonData = [
        { label: 'COUNTRY BACKED', ref: countryRef },
        { label: 'COMPANIES BACKED', ref: companiesRef },
        { label: 'COMMERCE BACKED', ref: commerceRef },
    ];

    return (
        <Box sx={{ mb: 6 }}>
            <Typography variant="h6" align="center" fontWeight="bold" sx={{ mb: 3, textTransform: 'uppercase' }}>
                FUNDS & FINANCES
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 6, flexWrap: 'wrap' }}>
                {buttonData.map((button, index) => (
                    <Button
                        key={index}
                        variant="outlined"
                        onClick={() => scrollToSection(button.ref)}
                        sx={{ borderRadius: 6, textTransform: 'uppercase', fontWeight: 'bold' }}
                    >
                        {button.label}
                    </Button>
                ))}
            </Box>

            <Divider sx={{ mb: 6 }} />

            <Box ref={countryRef} sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 6, scrollMarginTop: '100px' }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 3, textTransform: 'uppercase', borderBottom: '2px solid', borderColor: 'primary.main', pb: 0.5 }}>
                    COUNTRY BACKED
                </Typography>
                <Typography variant="body1" color="text.secondary" fontStyle="italic">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum.
                </Typography>
            </Box>

            <Box ref={companiesRef} sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 6, scrollMarginTop: '100px' }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 3, textTransform: 'uppercase', borderBottom: '2px solid', borderColor: 'primary.main', pb: 0.5 }}>
                    COMPANIES BACKED
                </Typography>
                <Typography variant="body1" color="text.secondary" fontStyle="italic">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum.
                </Typography>
            </Box>

            <Box ref={commerceRef} sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 6, scrollMarginTop: '100px' }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 3, textTransform: 'uppercase', borderBottom: '2px solid', borderColor: 'primary.main', pb: 0.5 }}>
                    COMMERCE BACKED
                </Typography>
                <Typography variant="body1" color="text.secondary" fontStyle="italic">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum.
                </Typography>
            </Box>
        </Box>
    );
}
