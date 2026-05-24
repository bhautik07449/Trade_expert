import { Box, Grid, Typography } from "@mui/material";
import LabelTitle from "../../commonUI/labelTitle";
import { useEffect, useMemo, useState } from "react";
import HomePageservice from "../../service/homepages.service";
import {
    ComposableMap,
    Geographies,
    Geography,
} from "react-simple-maps";
import PageContentSkeleton from "../PageContentSkeleton";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function OverPresences() {
    const [presences, setPresences] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const getPresencesData = async () => {
        try {
            const response = await HomePageservice.getPresences();

            if (response) {
                setPresences(response?.data?.countries || []);
            }
        } catch (error: any) {
            console.log(error?.response?.data?.message || "Presences data not fetch");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPresencesData();
    }, []);

    const selectedCountries = useMemo(() => {
        return presences
            ?.map((presence) => presence?.toLowerCase()?.trim())
            ?.filter(Boolean);
    }, [presences]);

    const isCountrySelected = (geo: any) => {
        const mapCountryName =
            geo?.properties?.name?.toLowerCase()?.trim() ||
            geo?.properties?.NAME?.toLowerCase()?.trim();

        return selectedCountries.includes(mapCountryName);
    };

    return (
        <Box sx={{ maxWidth: 1200, mx: "auto", px: 2, py: 8 }}>
            <Box sx={{ textAlign: "center" }}>
                <LabelTitle title="Our" label="Presences" />

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
                    Explore the key regions and countries where Tradexpert’s platform is
                    actively connecting buyers and sellers, fostering global trade
                    opportunities.
                </Typography>
            </Box>

            <Box sx={{ width: "100%" }}>
                {loading ? (
                    <Grid container spacing={3.5}>
                        {[...Array(6)].map((_, index) => (
                            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={index}>
                                <PageContentSkeleton />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <>
                        <Box
                            sx={{
                                overflow: "hidden",
                            }}
                        >
                            <ComposableMap
                                projectionConfig={{
                                    scale: 145,
                                }}
                                style={{
                                    width: "100%",
                                    height: "auto",
                                }}
                            >
                                <Geographies geography={geoUrl}>
                                    {({ geographies }) =>
                                        geographies.map((geo) => {
                                            const selected = isCountrySelected(geo);

                                            return (
                                                <Geography
                                                    key={geo.rsmKey}
                                                    geography={geo}
                                                    fill={selected ? "#1976d2" : "#E5E7EB"}
                                                    stroke="#ffffff"
                                                    strokeWidth={0.5}
                                                    style={{
                                                        default: {
                                                            outline: "none",
                                                        },
                                                        hover: {
                                                            fill: selected ? "#0d47a1" : "#cbd5e1",
                                                            outline: "none",
                                                            cursor: "pointer",
                                                        },
                                                        pressed: {
                                                            outline: "none",
                                                        },
                                                    }}
                                                />
                                            );
                                        })
                                    }
                                </Geographies>
                            </ComposableMap>
                        </Box>
                    </>
                )}
            </Box>
        </Box>
    );
}