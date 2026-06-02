import {
    Box,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Skeleton,
    Paper,
    Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useEffect, useState } from "react";
import CMSservice from "../../service/cms.service";
import PageMainLayout from "../../commonUI/PageMainLayout";
import LabelTitle from "../../commonUI/labelTitle";

export default function Faq() {
    const [faqs, setFaqs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState<number | false>(0);

    const getFaq = async () => {
        setLoading(true);

        try {
            const res = await CMSservice.getFaq();

            if (res) {
                setFaqs(res?.data?.data || []);
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getFaq();
    }, []);

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                minHeight: "100vh",
                pb: { xs: 6, md: 10 },
            }}
        >
            <PageMainLayout title="Frequently Asked Questions" slug="faq" image="https://sourceseas.itcoders.in/img/front-end/faq.jpg" activeCountry="" setActiveCountry={() => { }} />

            <Box
                sx={{
                    maxWidth: "1100px",
                    mx: "auto",
                    mt: { xs: 4, md: 6 },
                    position: "relative",
                    zIndex: 2,
                }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        bgcolor: "transparent",
                        px: { xs: 2, sm: 3, md: 4 },
                    }}
                >
                    <LabelTitle title="Questions?" label="We have answers" tagLine="Find quick answers to the most common questions about our services, process, and platform." />

                    {loading ? (
                        <Stack spacing={2}>
                            {Array.from(new Array(6)).map((_, i) => (
                                <Box
                                    key={i}
                                    sx={{
                                        border: "1px solid",
                                        borderColor: "divider",
                                        borderRadius: 3,
                                        p: 2,
                                        bgcolor: "background.default",
                                    }}
                                >
                                    <Skeleton
                                        variant="text"
                                        width="70%"
                                        height={32}
                                        sx={{ mb: 1 }}
                                    />
                                    <Skeleton variant="text" width="95%" />
                                    <Skeleton variant="text" width="80%" />
                                </Box>
                            ))}
                        </Stack>
                    ) : faqs?.length > 0 ? (
                        <Stack spacing={2}>
                            {faqs.map((faq, index) => {
                                const isExpanded = expanded === index;

                                return (
                                    <Accordion
                                        key={index}
                                        expanded={isExpanded}
                                        onChange={(_, value) =>
                                            setExpanded(value ? index : false)
                                        }
                                        elevation={0}
                                        disableGutters
                                        sx={{
                                            border: "1px solid",
                                            borderColor: isExpanded
                                                ? "primary.main"
                                                : "divider",
                                            borderRadius: "16px !important",
                                            overflow: "hidden",
                                            bgcolor: isExpanded
                                                ? "primary.light"
                                                : "background.paper",
                                            boxShadow: isExpanded
                                                ? "0 12px 30px rgba(59,48,39,0.12)"
                                                : "0 6px 18px rgba(59,48,39,0.05)",
                                            transition: "all 0.3s ease",

                                            "&:before": {
                                                display: "none",
                                            },

                                            "&.Mui-expanded": {
                                                m: 0,
                                            },
                                        }}
                                    >
                                        <AccordionSummary
                                            expandIcon={
                                                <ExpandMoreIcon
                                                    sx={{
                                                        color: isExpanded
                                                            ? "primary.dark"
                                                            : "text.secondary",
                                                    }}
                                                />
                                            }
                                            sx={{
                                                minHeight: 68,
                                                px: { xs: 2, sm: 2.5 },
                                                py: 1,

                                                "& .MuiAccordionSummary-content": {
                                                    my: 1.2,
                                                    alignItems: "center",
                                                    gap: 1.5,
                                                },

                                                "&.Mui-expanded": {
                                                    minHeight: 68,
                                                },
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: 38,
                                                    height: 38,
                                                    borderRadius: "50%",
                                                    flexShrink: 0,
                                                    display: "grid",
                                                    placeItems: "center",
                                                    bgcolor: isExpanded
                                                        ? "background.paper"
                                                        : "background.default",
                                                    color: "primary.dark",
                                                    border: "1px solid",
                                                    borderColor: "divider",
                                                }}
                                            >
                                                <HelpOutlineIcon fontSize="small" />
                                            </Box>

                                            <Typography
                                                sx={{
                                                    fontWeight: 800,
                                                    color: isExpanded
                                                        ? "primary.dark"
                                                        : "text.primary",
                                                    fontSize: {
                                                        xs: "15px",
                                                        sm: "16px",
                                                        md: "17px",
                                                    },
                                                }}
                                            >
                                                {faq?.title}
                                            </Typography>
                                        </AccordionSummary>

                                        <AccordionDetails
                                            sx={{
                                                px: { xs: 2, sm: 2.5 },
                                                pb: 2.5,
                                                pt: 0,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    ml: { xs: 0, sm: "54px" },
                                                    p: { xs: 2, sm: 2.5 },
                                                    borderRadius: 3,
                                                    bgcolor: "background.paper",
                                                    border: "1px solid",
                                                    borderColor: "divider",
                                                }}
                                            >
                                                <Typography
                                                    component="div"
                                                    sx={{
                                                        color: "text.secondary",
                                                        lineHeight: 1.8,
                                                        fontSize: {
                                                            xs: "14px",
                                                            sm: "15px",
                                                        },

                                                        "& p": {
                                                            m: 0,
                                                        },

                                                        "& ul, & ol": {
                                                            mt: 1,
                                                            mb: 0,
                                                            pl: 3,
                                                        },

                                                        "& a": {
                                                            color: "primary.dark",
                                                            fontWeight: 700,
                                                            textDecorationColor:
                                                                "primary.main",
                                                        },
                                                    }}
                                                    dangerouslySetInnerHTML={{
                                                        __html: faq?.answer || "",
                                                    }}
                                                />
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion>
                                );
                            })}
                        </Stack>
                    ) : (
                        <Box
                            sx={{
                                textAlign: "center",
                                py: 6,
                                border: "1px dashed",
                                borderColor: "divider",
                                borderRadius: 3,
                                bgcolor: "background.default",
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    color: "text.secondary",
                                    fontWeight: 700,
                                }}
                            >
                                No FAQs found.
                            </Typography>
                        </Box>
                    )}
                </Paper>
            </Box>
        </Box >
    );
}