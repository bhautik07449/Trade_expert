import {
    Box,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Skeleton
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import CMSservice from "../../service/cms.service";

export default function Faq() {
    const [faqs, setFaqs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const getFaq = async () => {
        setLoading(true)
        try {
            const res = await CMSservice.getFaq()
            if (res) {
                setFaqs(res?.data?.data)
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getFaq();
    }, []);

    return (
        <Box sx={{ bgcolor: 'white', minHeight: '100vh', pb: 10 }}>
            <img
                src="https://sourceseas.itcoders.in/img/front-end/faq.jpg"
                alt="FAQ"
                style={{
                    width: '100%',
                    minHeight: '200px',
                    maxHeight: '400px',
                    objectFit: 'cover'
                }}
            />

            <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, color: 'secondary.main' }}
                >
                    Frequently Asked Questions
                </Typography>
            </Box>

            <Box sx={{ maxWidth: "900px", mx: "auto", px: 2 }}>
                {loading ? (
                    Array.from(new Array(5)).map((_, i) => (
                        <Skeleton
                            key={i}
                            variant="rectangular"
                            height={56}
                            sx={{ mb: 2, borderRadius: 2 }}
                        />
                    ))
                ) : (
                    faqs?.map((faq, index) => (
                        <Accordion
                            key={index}
                            sx={{
                                mb: 2,
                                borderRadius: 2,
                                boxShadow: 2,
                                '&:before': { display: 'none' }
                            }}
                        >
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography sx={{ fontWeight: 600 }}>
                                    {faq?.title}
                                </Typography>
                            </AccordionSummary>

                            <AccordionDetails>
                                <Typography color="text.secondary" dangerouslySetInnerHTML={{ __html: faq?.answer || "" }}>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))
                )}
            </Box>
        </Box>
    );
}