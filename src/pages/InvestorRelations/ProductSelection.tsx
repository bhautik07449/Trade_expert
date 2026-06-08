import { Box, Chip, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Skeleton, Typography } from "@mui/material";
import NoDataFound from "../../commonUI/NoDataFound";

type Category = {
    id: number;
    name: string;
};

type SubCategory = {
    id: number;
    name: string;
};

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
    activeCountry: string;
    categoriesLoading: boolean;
    categoryList: Category[];
    activeCategory: string;
    setActiveCategory: (value: string) => void;
    subcategoryList: SubCategory[];
    activeSubCategory: string;
    setActiveSubCategory: (value: string) => void;
    productList: Product[];
    activeProduct: string;
    setActiveProduct: (value: string) => void;
    selectedProduct: Product | null;
};

export default function ProductSelection({
    activeCountry,
    categoriesLoading,
    categoryList,
    activeCategory,
    setActiveCategory,
    subcategoryList,
    activeSubCategory,
    setActiveSubCategory,
    productList,
    activeProduct,
    setActiveProduct,
    selectedProduct,
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
                    p: { xs: 2, md: 3 },
                    mb: 4,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 3,
                    bgcolor: "background.default",
                }}
            >
                {categoriesLoading ? (
                    <Grid container spacing={2}>
                        {[1, 2, 3].map((item) => (
                            <Grid size={{ xs: 12, sm: 4 }} key={item}>
                                <Skeleton variant="rounded" height={56} animation="wave" />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <FormControl fullWidth>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    label="Category"
                                    value={activeCategory}
                                    onChange={(e) => setActiveCategory(e.target.value as string)}
                                    disabled={!activeCountry}
                                >
                                    {categoryList.map((item: Category) => (
                                        <MenuItem key={item.id} value={String(item.id)}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 4 }}>
                            <FormControl fullWidth>
                                <InputLabel>Subcategory</InputLabel>
                                <Select
                                    label="Subcategory"
                                    value={activeSubCategory}
                                    onChange={(e) => setActiveSubCategory(e.target.value as string)}
                                    disabled={!activeCategory}
                                >
                                    {subcategoryList.map((item: SubCategory) => (
                                        <MenuItem key={item.id} value={String(item.id)}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 4 }}>
                            <FormControl fullWidth>
                                <InputLabel>Product</InputLabel>
                                <Select
                                    label="Product"
                                    value={activeProduct}
                                    onChange={(e) => setActiveProduct(e.target.value as string)}
                                    disabled={!activeSubCategory}
                                >
                                    {productList.map((item: Product, index: number) => (
                                        <MenuItem key={item?.id || index} value={String(item?.id)}>
                                            {item?.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
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
                            p: categoriesLoading ? 2 : 0,
                        }}
                    >
                        {categoriesLoading ? (
                            <>
                                {[1, 2, 3].map((item: number) => (
                                    <Box key={item} sx={{ mb: 2 }}>
                                        <Skeleton variant="text" height={28} animation="wave" />
                                        <Skeleton variant="text" width="60%" height={20} animation="wave" />
                                    </Box>
                                ))}
                            </>
                        ) : productList.length > 0 ? (
                            productList.map((item: Product, index: number) => (
                                <Box
                                    key={item?.id || index}
                                    onClick={() => setActiveProduct(String(item?.id || ""))}
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
                            <Box sx={{ py: 3 }}>
                                <NoDataFound
                                    message={
                                        activeCountry
                                            ? "No products found."
                                            : "Select a country to view products."
                                    }
                                />
                            </Box>
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
                        {categoriesLoading ? (
                            <Grid container spacing={3} alignItems="center">
                                <Grid size={{ xs: 12, sm: 5 }}>
                                    <Skeleton variant="rounded" height={220} animation="wave" />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 7 }}>
                                    <Skeleton variant="rounded" width={90} height={32} sx={{ mb: 2 }} animation="wave" />
                                    <Skeleton variant="text" height={38} animation="wave" />
                                    <Skeleton variant="text" height={24} animation="wave" />
                                    <Skeleton variant="text" height={24} width="80%" animation="wave" />
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
                                        label={selectedProduct?.country || activeCountry}
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
                            <Box sx={{ py: 8 }}>
                                <NoDataFound message="Select a product to view details." />
                            </Box>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}