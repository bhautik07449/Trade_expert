import { Box, Chip, Grid, Paper, Skeleton, Tab, Tabs, Typography } from "@mui/material";

type Product = {
    id?: number | string;
    name?: string;
    country?: string;
    description?: string;
    images?: string[];
    image?: string;
    image_url?: string;
    product_image?: string;
};

type ProductSelectionProps = {
    handleProductSelect: (selectedName: string) => void;
    productLoading: boolean;
    product: Product[];
    activeProduct: string;
    selectedProduct: Product | null;
    activeCountry: string;
};

export default function ProductSelection({
    handleProductSelect,
    productLoading,
    product,
    activeProduct,
    selectedProduct,
    activeCountry,
}: ProductSelectionProps) {
    return (
        <Box sx={{ mb: 5 }}>
            <Typography
                variant="h5"
                sx={{
                    color: "secondary.main",
                    fontWeight: 700,
                    textAlign: "center",
                    mb: 3,
                }}
            >
                Product Selection
            </Typography>

            <Paper
                elevation={0}
                sx={{
                    p: 1,
                    mb: 4,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 3,
                    bgcolor: "background.default",
                }}
            >
                {productLoading ? (
                    <Skeleton variant="rounded" height={52} animation="wave" />
                ) : product.length > 0 ? (
                    <Tabs
                        value={activeProduct}
                        onChange={(_, value: string) => handleProductSelect(value)}
                        variant="scrollable"
                        scrollButtons="auto"
                        allowScrollButtonsMobile
                        sx={{
                            minHeight: 52,
                            "& .MuiTabs-indicator": {
                                display: "none",
                            },
                            "& .MuiTabs-flexContainer": {
                                justifyContent: {
                                    xs: "flex-start",
                                    md: "center",
                                },
                            },
                            "& .MuiTab-root": {
                                minHeight: 44,
                                mx: 0.5,
                                px: 4,
                                borderRadius: 2,
                                textTransform: "none",
                                fontWeight: 700,
                                color: "text.secondary",
                                border: "1px solid",
                                borderColor: "divider",
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
                        {product.map((item: Product, index: number) => (
                            <Tab
                                key={item?.id || index}
                                label={item?.name}
                                value={item?.name}
                            />
                        ))}
                    </Tabs>
                ) : (
                    <Typography
                        sx={{
                            textAlign: "center",
                            color: "text.secondary",
                            py: 2,
                        }}
                    >
                        {activeCountry
                            ? "No products found."
                            : "Please select a country to view products."}
                    </Typography>
                )}
            </Paper>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 3,
                            overflow: "hidden",
                            height: "100%",
                            minHeight: 180,
                            p: productLoading ? 2 : 0,
                        }}
                    >
                        {productLoading ? (
                            <>
                                {[1, 2, 3].map((item: number) => (
                                    <Box key={item} sx={{ mb: 2 }}>
                                        <Skeleton
                                            variant="text"
                                            height={28}
                                            animation="wave"
                                        />
                                        <Skeleton
                                            variant="text"
                                            width="60%"
                                            height={20}
                                            animation="wave"
                                        />
                                    </Box>
                                ))}
                            </>
                        ) : product.length > 0 ? (
                            product.map((item: Product, index: number) => (
                                <Box
                                    key={item?.id || index}
                                    onClick={() =>
                                        handleProductSelect(item?.name || "")
                                    }
                                    sx={{
                                        p: 2,
                                        cursor: "pointer",
                                        borderBottom: "1px solid",
                                        borderColor: "divider",
                                        bgcolor:
                                            selectedProduct?.id === item?.id
                                                ? "primary.light"
                                                : "background.paper",
                                        "&:hover": {
                                            bgcolor: "primary.light",
                                        },
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: "secondary.main",
                                            fontWeight: 700,
                                        }}
                                    >
                                        {item?.name}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            color: "text.secondary",
                                            fontSize: 13,
                                        }}
                                    >
                                        {item?.country || activeCountry}
                                    </Typography>
                                </Box>
                            ))
                        ) : (
                            <Typography
                                sx={{
                                    color: "text.secondary",
                                    textAlign: "center",
                                    p: 3,
                                }}
                            >
                                No products found.
                            </Typography>
                        )}
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 8 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 3,
                            p: { xs: 2, md: 3 },
                            height: "100%",
                            minHeight: 260,
                        }}
                    >
                        {productLoading ? (
                            <Grid container spacing={3} alignItems="center">
                                <Grid size={{ xs: 12, sm: 5 }}>
                                    <Skeleton
                                        variant="rounded"
                                        height={220}
                                        animation="wave"
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 7 }}>
                                    <Skeleton
                                        variant="rounded"
                                        width={90}
                                        height={32}
                                        sx={{ mb: 2 }}
                                        animation="wave"
                                    />
                                    <Skeleton
                                        variant="text"
                                        height={38}
                                        animation="wave"
                                    />
                                    <Skeleton
                                        variant="text"
                                        height={24}
                                        animation="wave"
                                    />
                                    <Skeleton
                                        variant="text"
                                        height={24}
                                        width="80%"
                                        animation="wave"
                                    />
                                </Grid>
                            </Grid>
                        ) : selectedProduct ? (
                            <Grid container spacing={3} alignItems="center">
                                <Grid size={{ xs: 12, sm: 5 }}>
                                    <Box
                                        component="img"
                                        src={
                                            selectedProduct?.images?.[0] ||
                                            selectedProduct?.image ||
                                            selectedProduct?.image_url ||
                                            selectedProduct?.product_image ||
                                            "https://sourceseas.itcoders.in/img/front-end/quality.jpg"
                                        }
                                        alt={selectedProduct?.name}
                                        sx={{
                                            width: "100%",
                                            height: 220,
                                            objectFit: "cover",
                                            borderRadius: 3,
                                        }}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 7 }}>
                                    <Chip
                                        label={
                                            selectedProduct?.country ||
                                            activeCountry
                                        }
                                        sx={{
                                            mb: 2,
                                            bgcolor: "primary.light",
                                            color: "secondary.dark",
                                            fontWeight: 700,
                                        }}
                                    />

                                    <Typography
                                        variant="h5"
                                        sx={{
                                            color: "secondary.main",
                                            fontWeight: 800,
                                            mb: 1.5,
                                        }}
                                    >
                                        {selectedProduct?.name}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            color: "text.secondary",
                                            lineHeight: 1.8,
                                        }}
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                selectedProduct?.description ||
                                                "No description available.",
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        ) : (
                            <Typography
                                sx={{
                                    color: "text.secondary",
                                    textAlign: "center",
                                    py: 8,
                                }}
                            >
                                Select a product to view details.
                            </Typography>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}