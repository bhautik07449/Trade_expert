import { Paper, Tab, Tabs, Box } from "@mui/material";

type SubCategoryItem = {
    id?: number;
    name: string;
};

type SubCategoryTabProps = {
    subcategory: SubCategoryItem[];
    activeSubCategory: string;
    setActiveSubCategory: (value: string) => void;
};

export default function SubCategoryTab({
    subcategory,
    activeSubCategory,
    setActiveSubCategory,
}: SubCategoryTabProps) {
    if (!subcategory || subcategory.length === 0) {
        return null;
    }

    return (
        <Paper
            elevation={0}
            sx={{
                mt: 3,
                mb: 0,
                p: 1,
                bgcolor: "transparent",
                boxShadow: "none",
                width: "100%",
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    overflowX: "auto",
                    overflowY: "hidden",
                    WebkitOverflowScrolling: "touch",
                    scrollbarWidth: "none",
                    "&::-webkit-scrollbar": {
                        display: "none",
                    },
                }}
            >
                <Tabs
                    value={activeSubCategory || false}
                    onChange={(_, value: string) => setActiveSubCategory(value)}
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    aria-label="subcategory tabs"
                    sx={{
                        minHeight: 52,

                        "& .MuiTabs-scroller": {
                            overflowX: "auto !important",
                            overflowY: "hidden",
                            scrollBehavior: "smooth",
                            scrollbarWidth: "none",
                            "&::-webkit-scrollbar": {
                                display: "none",
                            },
                        },

                        "& .MuiTabs-indicator": {
                            display: "none",
                        },

                        "& .MuiTabs-flexContainer": {
                            gap: 1,
                            justifyContent: {
                                xs: "flex-start",
                                md: "center",
                            },
                            flexWrap: "nowrap",
                        },

                        "& .MuiTabs-scrollButtons": {
                            color: "secondary.main",
                            width: 34,
                            "&.Mui-disabled": {
                                opacity: 0.25,
                            },
                        },

                        "& .MuiTab-root": {
                            minHeight: 44,
                            minWidth: "auto",
                            px: { xs: 2.2, sm: 3 },
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: 700,
                            color: "text.secondary",
                            border: "1px solid",
                            borderColor: "divider",
                            whiteSpace: "nowrap",
                            flexShrink: 0,
                        },

                        "& .MuiTab-root:hover": {
                            bgcolor: "primary.light",
                            color: "secondary.dark",
                        },

                        "& .Mui-selected": {
                            bgcolor: "primary.main",
                            color: "#fff !important",
                            borderColor: "primary.main",
                        },
                    }}
                >
                    {(Array.isArray(subcategory) ? subcategory : []).map((item) => (
                        <Tab
                            key={item?.id || item?.name}
                            label={item?.name}
                            value={item?.name}
                        />
                    ))}
                </Tabs>
            </Box>
        </Paper>
    );
}