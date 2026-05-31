import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Typography,
    IconButton,
    TextField,
    Paper,
    Divider,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { getImageUrl } from "../utils/imageUtils";

type Product = {
    id: number
    name: string
    images: string[]
    category: string
    categoryColor: string
    description: string
}

export default function BrandsProductView({ products, visiblecard = 4, }: { products: Product[]; visiblecard?: number; }) {
    const [currentStartIndex, setCurrentStartIndex] = useState(0);
    const [visibleCards, setVisibleCards] = useState(visiblecard);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        const updateVisibleCards = () => {
            const width = window.innerWidth;

            if (width < 600) setVisibleCards(1);
            else if (width < 900) setVisibleCards(2);
            else if (width < 1200) setVisibleCards(3);
            else setVisibleCards(visiblecard);
        };

        updateVisibleCards();
        window.addEventListener("resize", updateVisibleCards);

        return () => window.removeEventListener("resize", updateVisibleCards);
    }, [visiblecard]);

    useEffect(() => {
        setCurrentStartIndex(0);
        setSelectedProduct(null);
    }, [products]);

    if (!products || products.length === 0) {
        return null;
    }

    const handleNext = () => {
        if (currentStartIndex + visibleCards < products.length) {
            setCurrentStartIndex((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentStartIndex > 0) {
            setCurrentStartIndex((prev) => prev - 1);
        }
    };

    const handleCheckOffer = (product: Product) => {
        setSelectedProduct(product);
    };

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: "1400px",
                mx: "auto",
                boxSizing: "border-box",
                mt: 4,
            }}
        >
            <Box sx={{ position: "relative", overflow: "hidden" }}>
                {products.length > visibleCards && (
                    <>
                        <IconButton
                            sx={{
                                position: "absolute",
                                left: 0,
                                top: "50%",
                                transform: "translateY(-50%)",
                                zIndex: 3,
                                bgcolor: "#f5f5f5",
                                "&:hover": {
                                    backgroundColor: "#e0e0e0",
                                },
                            }}
                            onClick={handlePrev}
                            disabled={currentStartIndex === 0}
                        >
                            <ChevronLeft />
                        </IconButton>

                        <IconButton
                            sx={{
                                position: "absolute",
                                right: 0,
                                top: "50%",
                                transform: "translateY(-50%)",
                                zIndex: 3,
                                bgcolor: "#f5f5f5",
                                "&:hover": {
                                    backgroundColor: "#e0e0e0",
                                },
                            }}
                            onClick={handleNext}
                            disabled={currentStartIndex + visibleCards >= products.length}
                        >
                            <ChevronRight />
                        </IconButton>
                    </>
                )}

                <Box
                    sx={{
                        display: "flex",
                        transition: "transform 0.5s ease-in-out",
                        width: `${(products.length / visibleCards) * 100}%`,
                        transform: `translateX(-${(currentStartIndex * 100) / products.length
                            }%)`,
                    }}
                >
                    {products.map((product) => (
                        <Box
                            key={product.id}
                            sx={{
                                width: `${100 / products.length}%`,
                                flexShrink: 0,
                                px: 1,
                            }}
                        >
                            <Card
                                sx={{
                                    borderRadius: 3,
                                    overflow: "hidden",
                                    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                                    border:
                                        selectedProduct?.id === product.id
                                            ? "2px solid"
                                            : "1px solid",
                                    borderColor:
                                        selectedProduct?.id === product.id
                                            ? "primary.main"
                                            : "divider",
                                }}
                            >
                                <Box
                                    component="img"
                                    src={getImageUrl(product?.images?.[0])}
                                    alt={product?.name}
                                    sx={{
                                        width: "100%",
                                        height: 220,
                                        objectFit: "contain",
                                        bgcolor: "#f5f5f5",
                                    }}
                                />

                                <CardContent>
                                    <Typography align="center" fontWeight={600}>
                                        {product.name}
                                    </Typography>

                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        sx={{ mt: 2, fontSize: "12px" }}
                                        onClick={() => handleCheckOffer(product)}
                                    >
                                        Check Offer
                                    </Button>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </Box>
            </Box>

            {selectedProduct && (
                <Paper
                    elevation={0}
                    sx={{
                        mt: 5,
                        maxWidth: "900px",
                        mx: "auto",
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 3,
                        overflow: "hidden",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                    }}
                >

                    <Divider />

                    <Box sx={{ p: { xs: 2.5, sm: 4 } }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                                color: "secondary.main",
                                mb: 2,
                                textAlign: "center",
                            }}
                        >
                            {selectedProduct.name}
                        </Typography>

                        <Typography
                            sx={{
                                color: "text.secondary",
                                lineHeight: 1.8,
                                textAlign: "center",
                                mb: 4,
                            }}
                            dangerouslySetInnerHTML={{ __html: selectedProduct?.description }}

                        />

                        <Box
                            component="form"
                            sx={{
                                display: "grid",
                                gridTemplateColumns: {
                                    xs: "1fr",
                                    sm: "1fr 1fr",
                                },
                                gap: 2,
                            }}
                        >
                            <TextField
                                fullWidth
                                label="Name"
                                size="small"
                            />

                            <TextField
                                fullWidth
                                label="Email"
                                size="small"
                                type="email"
                            />

                            <TextField
                                fullWidth
                                label="Phone"
                                size="small"
                            />

                            <TextField
                                fullWidth
                                label="Company Name"
                                size="small"
                            />

                            <TextField
                                fullWidth
                                label="Message"
                                size="small"
                                multiline
                                minRows={4}
                                sx={{
                                    gridColumn: {
                                        xs: "auto",
                                        sm: "1 / -1",
                                    },
                                }}
                            />

                            <Box
                                sx={{
                                    gridColumn: {
                                        xs: "auto",
                                        sm: "1 / -1",
                                    },
                                    textAlign: "center",
                                    mt: 1,
                                }}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    sx={{
                                        px: 6,
                                        borderRadius: 2,
                                        textTransform: "none",
                                        fontWeight: 700,
                                    }}
                                >
                                    Submit
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            )}
        </Box>
    );
}