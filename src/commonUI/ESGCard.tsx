import { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    IconButton,
    Skeleton
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { getImageUrl } from "../utils/imageUtils";
import NoDataFound from "./NoDataFound";

type Product = {
    id: number
    name: string
    image: string
    description: string
}

export default function ESGCard({ products, visiblecard = 4, isLoading = false }: { products: Product[]; visiblecard?: number; isLoading?: boolean; }) {
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

    if (isLoading) {
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
                    <Box
                        sx={{
                            display: "flex",
                            width: "100%",
                        }}
                    >
                        {Array.from({ length: visibleCards }).map((_, index) => (
                            <Box
                                key={index}
                                sx={{
                                    width: `${100 / visibleCards}%`,
                                    flexShrink: 0,
                                    px: 1,
                                }}
                            >
                                <Card
                                    sx={{
                                        borderRadius: 3,
                                        overflow: "hidden",
                                        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                                        border: "1px solid",
                                        borderColor: "divider",
                                    }}
                                >
                                    <Skeleton variant="rectangular" width="100%" height={220} />
                                    <CardContent
                                        sx={{
                                            p: { xs: 2, sm: 2.25 },
                                            textAlign: "center",
                                        }}
                                    >
                                        <Skeleton variant="text" width="80%" height={24} sx={{ mx: "auto", mb: 1 }} />
                                        <Skeleton variant="text" width="100%" height={20} />
                                        <Skeleton variant="text" width="100%" height={20} />
                                    </CardContent>
                                </Card>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        );
    }

    if (!products || products.length === 0) {
        return <NoDataFound message="No data available for this country/category." />;
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
                                    src={getImageUrl(product?.image)}
                                    alt={product?.name}
                                    sx={{
                                        width: "100%",
                                        height: 220,
                                        objectFit: "contain",
                                        bgcolor: "#f5f5f5",
                                    }}
                                />

                                <CardContent
                                    sx={{
                                        p: { xs: 2, sm: 2.25 },
                                        textAlign: "center",
                                    }}
                                >
                                    <Typography
                                        fontWeight={800}
                                        title={product.name}
                                        sx={{
                                            color: "text.primary",
                                            fontSize: { xs: "15px", sm: "16px" },
                                            width: "100%",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                            mb: 1,
                                        }}
                                    >
                                        {product.name}
                                    </Typography>

                                    <Typography
                                        component="div"
                                        sx={{
                                            color: "text.secondary",
                                            fontSize: { xs: "13px", sm: "14px" },
                                            lineHeight: 1.6,
                                            minHeight: 44,
                                            display: "-webkit-box",
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",

                                            "& p": {
                                                m: 0,
                                            },
                                        }}
                                        dangerouslySetInnerHTML={{
                                            __html: product.description || "",
                                        }}
                                    />

                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}