import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import PageMainLayout from "../../commonUI/PageMainLayout";
import ESGCard from "../../commonUI/ESGCard";
import LabelTitle from "../../commonUI/labelTitle";
import AboutTestimonial from "../About/AboutTestimonial";
import ESGService from "../../service/esg.service";
import CategoryTabview from "../../commonUI/CategoryTabview";

type ESGData = {
    environment: any[];
    social: any[];
    governance: any[];
};

export default function CSR() {
    const [activeCountry, setActiveCountry] = useState("India");
    const [esgData, setEsgData] = useState<ESGData | null>(null);
    const [activeCategory, setActiveCategory] = useState("");

    const getESGData = async (country: string, category: string) => {
        try {
            const response = await ESGService.getESGGroup(country, category);
            if (response) {
                setEsgData(response?.data?.data);
            }
        } catch (error) {
            console.error("Error fetching ESG data:", error);
        }
    };

    useEffect(() => {
        getESGData(activeCountry, activeCategory);
    }, [activeCountry, activeCategory]);

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                minHeight: "100vh",
                pb: { xs: 6, md: 10 },
            }}
        >
            <PageMainLayout title="Environmental Social Governance" slug="csr" image="https://sourceseas.itcoders.in/img/front-end/csr-2.jpg" country={true} activeCountry={activeCountry} setActiveCountry={setActiveCountry} />

            <Box
                sx={{
                    maxWidth: "1400px",
                    mx: "auto",
                    px: { xs: 2, sm: 3, md: 4 },
                    position: "relative",
                    zIndex: 2,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: { xs: 1.5, sm: 3, md: 5 },
                        flexWrap: "wrap",
                        mb: { xs: 3, md: 4 },
                        textAlign: "center",
                    }}
                >
                    {[
                        { label: "Environment" },
                        { label: "Social" },
                        { label: "Governance" },
                    ].map((item) => (
                        <Box
                            key={item.label}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                pb: 0.8,
                                borderBottom: "2px solid",
                                borderColor: "primary.main",
                            }}
                        >
                            <Typography
                                component="span"
                                sx={{
                                    fontSize: { xs: "22px", sm: "26px", md: "32px" },
                                    fontWeight: 900,
                                    color: "primary.dark",
                                    lineHeight: 1,
                                }}
                            >
                                #
                            </Typography>

                            <Typography
                                component="span"
                                sx={{
                                    fontSize: { xs: "22px", sm: "26px", md: "32px" },
                                    fontWeight: 700,
                                    color: "text.primary",
                                    lineHeight: 1,
                                }}
                            >
                                {item.label}
                            </Typography>
                        </Box>
                    ))}
                </Box>

                <CategoryTabview country={activeCountry} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

                <Box sx={{ mb: { xs: 3, sm: 5, md: 6 } }}>
                    <LabelTitle title="Environmental" label="Initiatives" />
                    <ESGCard products={esgData?.environment || []} />
                </Box>

                <Box sx={{ mb: { xs: 3, sm: 5, md: 6 } }}>
                    <LabelTitle title="Social" label="Initiatives" />
                    <ESGCard products={esgData?.social || []} />
                </Box>

                <Box>
                    <LabelTitle title="Governance" label="Initiatives" />
                    <ESGCard products={esgData?.governance || []} />
                </Box>

                <AboutTestimonial />
            </Box>
        </Box >
    )
}