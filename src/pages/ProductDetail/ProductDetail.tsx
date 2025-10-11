"use client"
import { ThemeProvider, CssBaseline, Container, Grid, Box, Typography, Divider } from "@mui/material"
import ProductGallery from "../../componenet/Product/ProductGallery"
import ProductSpecsTabs from "../../componenet/Product/ProductSpecsTabs"
import CtaButtons from "../../componenet/Product/CtaButtons"
import CertificationPanel from "../../componenet/Product/CertificationPanel"
import NewsletterSignup from "../../componenet/Product/NewsletterSignup"

const product = {
    name: "Cleaned Suran",
    description:
        "Suran contains iron, and are a good source of nutrients. When harvested, Suran can measure roughly 30 cm. The root is round and compressed with a depression on top where the stalk was removed.",
    images: ["/cleaned-suran-thumbnail-2.jpg", "/cleaned-suran-thumbnail-1.jpg", "/cleaned-suran-thumbnail-2.jpg"],
    specs: {
        "Commercial Aspect": [
            { label: "Tariff", value: "7438000" },
            { label: "Origin Country", value: "India" },
            { label: "Packaging", value: "10.5 kg net bag | 1500 bags" },
            { label: "MOQ", value: "20ft Dry Container" },
            { label: "Delivery Term", value: "Ex-warehouse or CIF as per negotiation" },
            { label: "Payment Term", value: "Advance/TT, LC or DP" },
            { label: "Sample size", value: "100 g min" },
        ],
        "Technical Specification": [
            { label: "Size", value: "Mixed grades" },
            { label: "Moisture", value: "< 10%" },
            { label: "Foreign Matter", value: "Nil" },
        ],
        "Shipment Manual": [
            { label: "Preferred Temp", value: "8–12°C" },
            { label: "Transit Time", value: "As per route" },
        ],
    },
}

export default function ProductPage() {
    return (
        <Container maxWidth="xl" sx={{ py: { xs: 3, md: 6 } }}>
            <Grid container spacing={4}>
                {/* Left: Gallery */}
                <Grid size={{ xs: 12, md: 5 }}>
                    <ProductGallery images={product.images} title={product.name} />
                </Grid>

                {/* Right: Title, description, tabs, CTAs */}
                <Grid size={{ xs: 12, md: 7 }}>
                    <Box component="header" mb={1}>
                        <Typography variant="h4" component="h1" fontWeight={700}>
                            {product.name}
                        </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 1.5 }}>
                        {product.description}
                    </Typography>

                    <ProductSpecsTabs specs={product.specs} />

                    <Box mt={2}>
                        <CtaButtons />
                    </Box>
                </Grid>
            </Grid>

            <Grid container spacing={4} sx={{ mt: 2 }}>
                <Grid size={{ xs: 12, md: 5 }}>
                    <CertificationPanel />
                </Grid>
                <Grid size={{ xs: 12, md: 7 }}>
                    <Box
                        sx={{
                            bgcolor: "background.paper",
                            border: "1px solid",
                            borderColor: "divider",
                            p: 3,
                            borderRadius: 2,
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        aria-label="Seasonal chart placeholder"
                    >
                        <Typography color="text.secondary">Seasonal Chart (Placeholder)</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            <NewsletterSignup />
        </Container>
    )
}
