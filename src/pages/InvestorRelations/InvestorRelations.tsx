import {
    Box,
    Container,
    Typography,
    Paper,
    Grid,
    Tabs,
    Tab,
    Button,
    TextField,
    MenuItem,
    Divider,
    Stack,
    Chip,
} from "@mui/material";
import { useState } from "react";
import InteractiveWorldMap from "../../component/Home/InteractiveWorldMap";
import LabelTitle from "../../commonUI/labelTitle";
import SEO from "../../component/SEO";
import CountryTab from "../../commonUI/CountryTab";

const countries = ["India", "Canada", "USA", "Australia"];

const categories = ["Category", "Sub Category", "Product"];

const products = [
    {
        id: 1,
        name: "Organic Spices",
        category: "Category",
        country: "India",
        image: "https://sourceseas.itcoders.in/img/front-end/quality.jpg",
        description:
            "Premium quality organic spices selected for international buyers and investors.",
    },
    {
        id: 2,
        name: "Agri Product",
        category: "Sub Category",
        country: "Canada",
        image: "https://sourceseas.itcoders.in/img/front-end/brands.jpg",
        description:
            "High-demand agricultural products with export and investment potential.",
    },
    {
        id: 3,
        name: "Food Product",
        category: "Product",
        country: "USA",
        image: "https://sourceseas.itcoders.in/img/front-end/quality.jpg",
        description:
            "Selected food product opportunities for overseas trade and business expansion.",
    },
];

const services = [
    "Market Development",
    "Financial Service",
    "Export Assistance",
    "Investment Support",
];

export default function InvestorRelations() {
    const [activeCountry, setActiveCountry] = useState<string>("");
    const [activeCategory, setActiveCategory] = useState("Category");
    const [selectedProduct, setSelectedProduct] = useState(products[0]);

    const filteredProducts = products.filter(
        (item) => item.category === activeCategory
    );

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                minHeight: "100vh",
            }}
        >
            <SEO
                title="News & Events - SourceSeas"
                description="Stay updated with the latest news, events, and updates in the world of international trade and sourcing."
                keywords="trade news, market updates, trade events, import policy, export regulations, sourcing news"
            />

            <Box
                sx={{
                    width: "100%",
                    height: { xs: 180, sm: 260, md: 340 },
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                <Box
                    component="img"
                    src="https://sourceseas.itcoders.in/img/front-end/csr-2.jpg"
                    alt="Supplier Banner"
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                    }}
                />

                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        bgcolor: "rgba(0,0,0,0.35)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        px: 2,
                    }}
                >
                    <Box>
                        <Typography
                            variant="h3"
                            sx={{
                                color: "#fff",
                                fontWeight: 700,
                                fontSize: { xs: "28px", sm: "38px", md: "48px" },
                            }}
                        >
                            Investor Relations
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Container
                sx={{
                    maxWidth: "1200px !important",
                    mx: "auto",
                    px: { xs: 2, sm: 3, md: 4 },
                    py: { xs: 4, md: 6 },
                }}
            >
                <CountryTab activeCountry={activeCountry} setActiveCountry={setActiveCountry} />

                <Divider sx={{ my: 4 }} />

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
                        <Tabs
                            value={activeCategory}
                            onChange={(_, value) =>
                                setActiveCategory(value)
                            }
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
                            {categories.map((category) => (
                                <Tab
                                    key={category}
                                    label={category}
                                    value={category}
                                />
                            ))}
                        </Tabs>
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
                                }}
                            >
                                {filteredProducts.map((product) => (
                                    <Box
                                        key={product.id}
                                        onClick={() =>
                                            setSelectedProduct(product)
                                        }
                                        sx={{
                                            p: 2,
                                            cursor: "pointer",
                                            borderBottom: "1px solid",
                                            borderColor: "divider",
                                            bgcolor:
                                                selectedProduct.id ===
                                                    product.id
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
                                            {product.name}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                color: "text.secondary",
                                                fontSize: 13,
                                            }}
                                        >
                                            {product.country}
                                        </Typography>
                                    </Box>
                                ))}
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
                                }}
                            >
                                <Grid container spacing={3} alignItems="center">
                                    <Grid size={{ xs: 12, sm: 5 }}>
                                        <Box
                                            component="img"
                                            src={selectedProduct.image}
                                            alt={selectedProduct.name}
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
                                            label={selectedProduct.country}
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
                                            {selectedProduct.name}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                color: "text.secondary",
                                                lineHeight: 1.8,
                                            }}
                                        >
                                            {selectedProduct.description}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>

                <Divider sx={{ my: 5 }} />

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
                        Financial Service
                    </Typography>

                    <Grid container spacing={2}>
                        {services.map((service) => (
                            <Grid key={service} size={{ xs: 12, sm: 6, md: 3 }}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 2,
                                        textAlign: "center",
                                        border: "1px solid",
                                        borderColor: "divider",
                                        borderRadius: 2,
                                        bgcolor: "background.default",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: "secondary.main",
                                            fontWeight: 700,
                                        }}
                                    >
                                        {service}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Divider sx={{ my: 5 }} />

                <Box>
                    <Typography
                        variant="h5"
                        sx={{
                            color: "secondary.main",
                            fontWeight: 700,
                            textAlign: "center",
                            mb: 3,
                        }}
                    >
                        Inquiry Form
                    </Typography>

                    <Paper
                        elevation={0}
                        sx={{
                            maxWidth: 760,
                            mx: "auto",
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 3,
                            p: { xs: 2, md: 3 },
                            bgcolor: "background.default",
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Full Name"
                                    placeholder="Enter your name"
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    placeholder="Enter your email"
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Country"
                                    select
                                    value={activeCountry}
                                    onChange={(e) =>
                                        setActiveCountry(e.target.value)
                                    }
                                >
                                    {countries.map((country) => (
                                        <MenuItem
                                            key={country}
                                            value={country}
                                        >
                                            {country}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Selected Product"
                                    value={selectedProduct.name}
                                />
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    label="Message"
                                    placeholder="Write your inquiry..."
                                />
                            </Grid>

                            <Grid size={{ xs: 12 }} textAlign="center">
                                <Button
                                    variant="contained"
                                    sx={{
                                        bgcolor: "primary.main",
                                        color: "#fff",
                                        px: 5,
                                        py: 1.2,
                                        borderRadius: 2,
                                        textTransform: "none",
                                        fontWeight: 700,
                                        "&:hover": {
                                            bgcolor: "primary.dark",
                                        },
                                    }}
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </Container>
        </Box >
    );
}