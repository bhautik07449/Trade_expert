import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Stack,
} from "@mui/material";
import LabelTitle from "../../commonUI/labelTitle";
import ESGService from "../../service/esg.service";
import ESGCard from "../../commonUI/ESGCard";

type TabKey = "E" | "S" | "G";

type ESGData = {
    environment: any[];
    social: any[];
    governance: any[];
};

export default function ESG() {
    const [activeTab, setActiveTab] = useState<TabKey>("E");
    const [data, setData] = useState<ESGData | null>(null);

    const getESGData = async () => {
        try {
            const response = await ESGService.getESGGroup();

            if (response) {
                setData(response?.data?.data);
            }
        } catch (error) {
            console.error("Error fetching ESG data:", error);
        }
    };

    useEffect(() => {
        getESGData();
    }, []);

    const selectedProducts =
        activeTab === "E"
            ? data?.environment || []
            : activeTab === "S"
                ? data?.social || []
                : data?.governance || [];

    const selectedLabel =
        activeTab === "E"
            ? "Environmental"
            : activeTab === "S"
                ? "Social"
                : "Governance";

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                color: "text.primary",
                px: { xs: 2, sm: 4, md: 6 },
                py: { xs: 6, md: 10 },
            }}
        >
            <Box sx={{ width: "100%", maxWidth: 1400, mx: "auto" }}>
                <LabelTitle
                    title="ESG"
                    label=""
                    tagLine="Evaluate the environmental, social, and governance practices of companies in which you invest."
                />

                <Stack direction="row" justifyContent="center" spacing={2} sx={{ mb: 4 }}>
                    {(["E", "S", "G"] as TabKey[]).map((tab) => (
                        <Button
                            key={tab}
                            variant={activeTab === tab ? "contained" : "outlined"}
                            onClick={() => setActiveTab(tab)}
                            sx={{
                                minWidth: 72,
                                borderRadius: 99,
                                fontWeight: 700,
                                bgcolor: activeTab === tab ? "primary.main" : "background.paper",
                                color: activeTab === tab ? "#fff" : "primary.dark",
                                borderColor: "primary.main",
                                "&:hover": {
                                    bgcolor: activeTab === tab ? "primary.dark" : "primary.light",
                                    borderColor: "primary.dark",
                                },
                            }}
                        >
                            {tab}
                        </Button>
                    ))}
                </Stack>

                <LabelTitle title={selectedLabel} label="Initiatives" />

                <ESGCard products={selectedProducts} />
            </Box>
        </Box>
    );
}