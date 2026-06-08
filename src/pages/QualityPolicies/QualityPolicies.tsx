import { useSelector, useDispatch } from 'react-redux';
import { setSelectedCountry } from '../../store/slice/countrySlice';
import {
    Box,
    Typography,
    Grid,
    Skeleton,
    Paper,
    Tabs,
    Tab,
    Stack,
    Divider,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import CMSservice from "../../service/cms.service";
import { getImageUrl } from "../../utils/imageUtils";
import { toast } from "react-toastify";
import PageMainLayout from "../../commonUI/PageMainLayout";

interface QualityPolicyItem {
    id?: number;
    logo: string;
    name: string;
    description: string;
    country?: string;
}

interface QualityPolicyGroup {
    category: {
        id?: number;
        name: string;
    };
    country: string;
    data: QualityPolicyItem[];
}

export default function QualityPolicies() {
    const [list, setList] = useState<QualityPolicyGroup[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("all");
    const activeCountry = useSelector((state: any) => state.country.selectedCountry) || "India";
    const dispatch = useDispatch();

    const getList = async () => {
        setLoading(true);

        try {
            const res = await CMSservice.getList();

            if (res) {
                setList(res?.data?.data || []);
            }
        } catch (error) {
            toast.error("Quality Policies not fetch");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getList();
    }, []);

    const filteredByCountryList = useMemo(() => {
        if (!activeCountry) return list;
        return list.filter((item) => item?.country === activeCountry);
    }, [list, activeCountry]);

    const categoryTabs = useMemo(() => {
        return Array.from(
            new Map(
                filteredByCountryList
                    .filter((item) => item?.category?.name)
                    .map((item) => [
                        item.category.name,
                        {
                            id: item.category.id,
                            name: item.category.name,
                        },
                    ])
            ).values()
        );
    }, [filteredByCountryList]);

    const filteredList = useMemo(() => {
        if (activeCategory === "all") {
            return filteredByCountryList;
        }

        return filteredByCountryList.filter((item) => item?.category?.name === activeCategory);
    }, [filteredByCountryList, activeCategory]);

    useEffect(() => {
        setActiveCategory("all");
    }, [activeCountry]);

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                minHeight: "100vh",
                pb: { xs: 6, md: 10 },
            }}
        >
            <PageMainLayout
                title="Quality Policies"
                slug="quality_policies"
                image="https://sourceseas.itcoders.in/img/front-end/quality.jpg"
                country={true}
                activeCountry={activeCountry}
                setActiveCountry={(c: string) => dispatch(setSelectedCountry(c))}
            />

            <Box
                sx={{
                    maxWidth: "1400px",
                    mx: "auto",
                    px: { xs: 2, sm: 3, md: 4 },
                    position: "relative",
                    zIndex: 2,
                }}
            >
                {!loading && categoryTabs.length > 0 && (
                    <Paper
                        elevation={0}
                        sx={{
                            mb: { xs: 4, md: 6 },
                            p: 1,
                            borderRadius: 3,
                            bgcolor: "background.paper",
                            border: "1px solid",
                            borderColor: "divider",
                            boxShadow: "0 12px 30px rgba(59,48,39,0.06)",
                        }}
                    >
                        <Tabs
                            value={activeCategory}
                            onChange={(_, value) => setActiveCategory(value)}
                            variant="scrollable"
                            scrollButtons="auto"
                            allowScrollButtonsMobile
                            TabIndicatorProps={{ sx: { display: "none" } }}
                            sx={{
                                minHeight: 52,

                                "& .MuiTabs-flexContainer": {
                                    gap: 1,
                                    justifyContent: {
                                        xs: "flex-start",
                                        md: "center",
                                    },
                                },

                                "& .MuiTabs-scrollButtons": {
                                    color: "secondary.main",
                                },

                                "& .MuiTab-root": {
                                    minHeight: 44,
                                    minWidth: "auto",
                                    px: { xs: 2, sm: 3 },
                                    mx: 0.25,
                                    borderRadius: 2,
                                    textTransform: "none",
                                    fontWeight: 800,
                                    color: "text.secondary",
                                    border: "1px solid",
                                    borderColor: "divider",
                                    bgcolor: "background.default",
                                    transition: "0.25s ease",
                                },

                                "& .MuiTab-root:hover": {
                                    bgcolor: "primary.light",
                                    color: "primary.dark",
                                    borderColor: "primary.main",
                                },

                                "& .Mui-selected": {
                                    bgcolor: "primary.main",
                                    color: "#fff !important",
                                    borderColor: "primary.main",
                                    boxShadow: "0 8px 18px rgba(59,48,39,0.14)",
                                },
                            }}
                        >
                            <Tab label="All" value="all" />

                            {categoryTabs.map((category) => (
                                <Tab
                                    key={category.id || category.name}
                                    label={category.name}
                                    value={category.name}
                                />
                            ))}
                        </Tabs>
                    </Paper>
                )}

                {loading ? (
                    <Stack spacing={4}>
                        {Array.from(new Array(3)).map((_, i) => (
                            <Paper
                                key={i}
                                elevation={0}
                                sx={{
                                    p: { xs: 2.5, md: 4 },
                                    borderRadius: 4,
                                    bgcolor: "background.paper",
                                    border: "1px solid",
                                    borderColor: "divider",
                                }}
                            >
                                <Skeleton
                                    variant="rounded"
                                    height={42}
                                    width="35%"
                                    sx={{ mx: "auto", mb: 4, borderRadius: 2 }}
                                />

                                <Grid container spacing={4} alignItems="center">
                                    <Grid size={{ xs: 12, md: 4 }}>
                                        <Skeleton
                                            variant="rounded"
                                            height={170}
                                            width={170}
                                            sx={{ mx: "auto", borderRadius: 4 }}
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 8 }}>
                                        <Skeleton
                                            variant="text"
                                            height={42}
                                            width="55%"
                                            sx={{ mb: 2 }}
                                        />
                                        <Skeleton variant="text" height={22} />
                                        <Skeleton variant="text" height={22} />
                                        <Skeleton variant="text" height={22} width="80%" />
                                    </Grid>
                                </Grid>
                            </Paper>
                        ))}
                    </Stack>
                ) : filteredList.length > 0 ? (
                    <Stack spacing={{ xs: 4, md: 6 }}>
                        {filteredList.map((group, groupIndex) => (
                            <Paper
                                key={groupIndex}
                                elevation={0}
                                sx={{
                                    p: { xs: 2.5, sm: 3, md: 4 },
                                    borderRadius: 4,
                                    bgcolor: "background.paper",
                                    border: "1px solid",
                                    borderColor: "divider",
                                    boxShadow: "0 18px 45px rgba(59,48,39,0.08)",
                                }}
                            >
                                <Box
                                    sx={{
                                        textAlign: "center",
                                        mb: { xs: 3, md: 4 },
                                    }}
                                >
                                    <Typography
                                        variant="overline"
                                        sx={{
                                            color: "primary.main",
                                            fontWeight: 900,
                                            letterSpacing: 1.5,
                                        }}
                                    >
                                        {group?.country}
                                    </Typography>

                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 900,
                                            color: "secondary.main",
                                            textTransform: "uppercase",
                                            letterSpacing: 1,
                                            mt: 0.5,
                                        }}
                                    >
                                        {group?.category?.name}
                                    </Typography>

                                    <Box
                                        sx={{
                                            width: 90,
                                            height: 3,
                                            bgcolor: "primary.main",
                                            mx: "auto",
                                            mt: 1.5,
                                            borderRadius: 99,
                                        }}
                                    />
                                </Box>

                                <Stack spacing={3}>
                                    {group.data.map((item, index) => (
                                        <Box key={item.id || index}>
                                            <Paper
                                                elevation={0}
                                                sx={{
                                                    p: { xs: 2.5, md: 3 },
                                                    borderRadius: 3,
                                                    bgcolor: "background.default",
                                                    border: "1px solid",
                                                    borderColor: "divider",
                                                    transition: "all 0.3s ease",

                                                    "&:hover": {
                                                        bgcolor: "primary.light",
                                                        borderColor: "primary.main",
                                                        transform: "translateY(-3px)",
                                                        boxShadow:
                                                            "0 12px 30px rgba(59,48,39,0.10)",
                                                    },
                                                }}
                                            >
                                                <Grid
                                                    container
                                                    spacing={{ xs: 3, md: 4 }}
                                                    alignItems="center"
                                                >
                                                    <Grid size={{ xs: 12, md: 4 }}>
                                                        <Box
                                                            sx={{
                                                                width: {
                                                                    xs: 150,
                                                                    sm: 170,
                                                                    md: 190,
                                                                },
                                                                height: {
                                                                    xs: 150,
                                                                    sm: 170,
                                                                    md: 190,
                                                                },
                                                                mx: "auto",
                                                                borderRadius: 4,
                                                                bgcolor: "background.paper",
                                                                border: "1px solid",
                                                                borderColor: "divider",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                p: 2,
                                                            }}
                                                        >
                                                            <Box
                                                                component="img"
                                                                src={getImageUrl(item?.logo)}
                                                                alt={item?.name}
                                                                sx={{
                                                                    maxWidth: "100%",
                                                                    maxHeight: "100%",
                                                                    objectFit: "contain",
                                                                }}
                                                            />
                                                        </Box>
                                                    </Grid>

                                                    <Grid size={{ xs: 12, md: 8 }}>
                                                        <Typography
                                                            variant="h5"
                                                            sx={{
                                                                color: "primary.dark",
                                                                mb: 1.5,
                                                                fontWeight: 900,
                                                                textAlign: {
                                                                    xs: "center",
                                                                    md: "left",
                                                                },
                                                            }}
                                                        >
                                                            {item?.name}
                                                        </Typography>

                                                        <Typography
                                                            component="div"
                                                            sx={{
                                                                color: "text.secondary",
                                                                fontSize: {
                                                                    xs: "14px",
                                                                    md: "16px",
                                                                },
                                                                lineHeight: 1.85,
                                                                textAlign: {
                                                                    xs: "center",
                                                                    md: "left",
                                                                },

                                                                "& p": {
                                                                    m: 0,
                                                                },
                                                            }}
                                                            dangerouslySetInnerHTML={{
                                                                __html: item?.description || "",
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Paper>

                                            {index !== group.data.length - 1 && (
                                                <Divider sx={{ my: 3, borderColor: "divider" }} />
                                            )}
                                        </Box>
                                    ))}
                                </Stack>
                            </Paper>
                        ))}
                    </Stack>
                ) : (
                    <Paper
                        elevation={0}
                        sx={{
                            p: 5,
                            textAlign: "center",
                            border: "1px dashed",
                            borderColor: "divider",
                            borderRadius: 4,
                            bgcolor: "background.paper",
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                color: "text.secondary",
                                fontWeight: 700,
                            }}
                        >
                            No quality policies found.
                        </Typography>
                    </Paper>
                )}
            </Box>
        </Box>
    );
}