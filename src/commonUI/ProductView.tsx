import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Card,
    Typography,
    IconButton,
    TextField,
    Paper,
    Divider,
    Dialog,
    DialogContent,
    CircularProgress,
    Chip,
    DialogActions,
    DialogTitle,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { getImageUrl } from "../utils/imageUtils";
import { useNavigate } from "react-router-dom";
import CMSservice from "../service/cms.service";
import { useFormik } from "formik"
import { toast } from "react-toastify";
import CardUi from "./CardUi";
import NoDataFound from "./NoDataFound";
import jsPDF from "jspdf";

type Product = {
    id: number
    name: string
    images: string[]
    category: string
    categoryColor: string
    description: string
    status?: string
    offer_type?: {
        id: number
        name: string
        description?: string
        items?: any[]
    };
}

export default function ProductView({ products, visiblecard = 4, }: { products: Product[]; visiblecard?: number; }) {
    const navigate = useNavigate();

    const [currentStartIndex, setCurrentStartIndex] = useState(0);
    const [visibleCards, setVisibleCards] = useState(visiblecard);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [viewProduct, setViewProduct] = useState<Product | null>(null);
    const [offerNotExistOpen, setOfferNotExistOpen] = useState(false);

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

    const formik = useFormik({
        initialValues: {
            trade_offer: "",
            name: "",
            email: "",
            phone: "",
            message: "",
            type: "Brand"
        },
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                const res = await CMSservice.addOfferRequest(values)

                if (res) {
                    toast.success(res?.data?.message || "Offer Send successful")
                    setOfferNotExistOpen(false);
                    resetForm()
                }
            } catch (error: any) {
                toast.error(error?.response?.data?.message)
                resetForm()
            } finally {
                setSubmitting(false)
            }
        },
    })

    if (!products || products.length === 0) {
        return <NoDataFound message="No Brands Found" />;
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
        if (product?.offer_type) {
            setSelectedProduct(product);
            setOfferNotExistOpen(false);

            formik.setFieldValue("trade_offer", product.offer_type.id);
        } else {
            setSelectedProduct(null);
            setOfferNotExistOpen(true);

            formik.setFieldValue("trade_offer", "");
        }
    };

    const downloadProductPdf = (product: Product) => {
        const pdf = new jsPDF();

        pdf.setFontSize(20);
        pdf.text(product.name, 20, 20);

        pdf.setFontSize(12);
        pdf.text(`Category: ${product.category}`, 20, 40);

        const description = pdf.splitTextToSize(
            product.description || "No Description",
            160
        );

        pdf.text(description, 20, 60);

        pdf.text(
            `Status: ${product.status || "Available"}`,
            20,
            110
        );

        pdf.save(`${product.name}.pdf`);
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
                    {(Array.isArray(products) ? products : []).map((product) => (
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
                                    position: "relative",
                                    borderRadius: 3,
                                    overflow: "hidden",
                                    bgcolor: "background.paper",
                                    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                                    border:
                                        selectedProduct?.id === product.id
                                            ? "2px solid"
                                            : "1px solid",
                                    borderColor:
                                        selectedProduct?.id === product.id
                                            ? "primary.main"
                                            : "divider",
                                    transition: "all .3s ease",

                                    "&:hover .hover-overlay": {
                                        opacity: 1,
                                    },

                                    "&:hover": {
                                        transform: "translateY(-4px)",
                                    },
                                }}
                            >
                                <Chip
                                    label={product.status || "Available"}
                                    size="small"
                                    sx={{
                                        position: "absolute",
                                        top: 10,
                                        right: 10,
                                        zIndex: 3,
                                        bgcolor: "primary.main",
                                        color: "#fff",
                                        fontWeight: 700,
                                    }}
                                />

                                <Box
                                    sx={{
                                        position: "relative",
                                        height: 220,
                                        overflow: "hidden",

                                        "&:hover .hover-overlay": {
                                            opacity: 1,
                                        },
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={getImageUrl(product?.images?.[0])}
                                        alt={product?.name}
                                        sx={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "contain",
                                            bgcolor: "background.default",
                                        }}
                                    />

                                    <Box
                                        className="hover-overlay"
                                        sx={{
                                            position: "absolute",
                                            inset: 0,
                                            bgcolor: "rgba(59,48,39,0.92)",
                                            opacity: 0,
                                            transition: "all .3s ease",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            p: 3,
                                            textAlign: "center",
                                            zIndex: 2,
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: "#fff",
                                                mb: 3,
                                                fontSize: 14,
                                                display: "-webkit-box",
                                                overflow: "hidden",
                                                WebkitLineClamp: 4,
                                                WebkitBoxOrient: "vertical",
                                            }}
                                            dangerouslySetInnerHTML={{ __html: product.description }}
                                        />

                                        <Box
                                            sx={{
                                                display: "flex",
                                                gap: 2,
                                            }}
                                        >
                                            <Button
                                                variant="contained"
                                                onClick={() => setViewProduct(product)}
                                                sx={{
                                                    bgcolor: "primary.main",
                                                    "&:hover": {
                                                        bgcolor: "primary.dark",
                                                    },
                                                }}
                                            >
                                                View
                                            </Button>

                                            <Button
                                                variant="outlined"
                                                onClick={() => downloadProductPdf(product)}
                                                sx={{
                                                    borderColor: "#fff",
                                                    color: "#fff",

                                                    "&:hover": {
                                                        borderColor: "primary.light",
                                                        color: "primary.light",
                                                    },
                                                }}
                                            >
                                                Download
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>

                                <Typography
                                    align="center"
                                    fontWeight={700}
                                    color="secondary.main"
                                    sx={{
                                        pt: 2
                                    }}
                                >
                                    {product.name}
                                </Typography>

                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: 2,
                                        m: 2
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        sx={{ mt: 2, fontSize: "12px" }}
                                        onClick={(e) => navigate(`/product-details/${product?.id}`)}
                                    >
                                        Trade
                                    </Button>

                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        sx={{ mt: 2, fontSize: "12px" }}
                                        onClick={() => handleCheckOffer(product)}
                                    >
                                        Check Offer
                                    </Button>
                                </Box>
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
                        position: "relative",
                    }}
                >
                    <IconButton
                        onClick={() => setSelectedProduct(null)}
                        sx={{
                            position: "absolute",
                            width: 32,
                            height: 32,
                            top: 10,
                            right: 10,
                            zIndex: 2,
                            bgcolor: "background.default",
                            color: "text.secondary",
                            border: "1px solid",
                            borderColor: "divider",
                            fontSize: 16,
                            "&:hover": {
                                bgcolor: "primary.light",
                                color: "primary.dark",
                            },
                        }}
                    >
                        ✕
                    </IconButton>

                    <Divider />
                    <Box sx={{ p: { xs: 2.5, sm: 4 }, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                        {/* Left Side: Offer Details */}
                        <Box sx={{
                            flex: 1,
                            bgcolor: "background.paper",
                            p: 3,
                            borderRadius: 3,
                            border: "1px solid",
                            borderColor: "divider",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.03)"
                        }}>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 800,
                                    color: "secondary.main",
                                    mb: 1.5,
                                }}
                            >
                                {selectedProduct?.offer_type?.name}
                            </Typography>

                            {selectedProduct?.offer_type?.description && (
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: "text.secondary",
                                        mb: 3,
                                        lineHeight: 1.6
                                    }}
                                >
                                    {selectedProduct.offer_type.description}
                                </Typography>
                            )}

                            {selectedProduct?.offer_type?.items && selectedProduct.offer_type.items.length > 0 && (
                                <Box sx={{ mt: 2 }}>
                                    <CardUi
                                        products={selectedProduct.offer_type.items
                                            .map((item: any) => item.product || item)
                                            .filter((p: any) => p && p.name)}
                                        visiblecard={1}
                                    />
                                </Box>
                            )}
                        </Box>

                        {/* Right Side: Form */}
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" fontWeight={700} mb={3} color="primary.main">
                                Submit Request
                            </Typography>
                            <Box
                                component="form"
                                onSubmit={formik.handleSubmit}
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
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />

                                <TextField
                                    fullWidth
                                    label="Email"
                                    size="small"
                                    type="email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />

                                <TextField
                                    fullWidth
                                    label="Phone"
                                    size="small"
                                    name="phone"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                                    helperText={formik.touched.phone && formik.errors.phone}
                                    sx={{
                                        gridColumn: {
                                            xs: "auto",
                                            sm: "1 / -1",
                                        },
                                    }}
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
                                    name="message"
                                    value={formik.values.message}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.message && Boolean(formik.errors.message)}
                                    helperText={formik.touched.message && formik.errors.message}
                                />

                                <Box
                                    sx={{
                                        gridColumn: {
                                            xs: "auto",
                                            sm: "1 / -1",
                                        },
                                        mt: 2,
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        gap: 2,
                                        flexWrap: "wrap",
                                    }}
                                >
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="large"
                                        onClick={() => setSelectedProduct(null)}
                                        sx={{
                                            px: 4,
                                            borderRadius: 2,
                                            textTransform: "none",
                                            fontWeight: 700,
                                        }}
                                    >
                                        Cancel
                                    </Button>

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={formik.isSubmitting}
                                        startIcon={
                                            formik.isSubmitting ? (
                                                <CircularProgress size={20} color="inherit" />
                                            ) : null
                                        }
                                        sx={{
                                            px: 4,
                                            borderRadius: 2,
                                            textTransform: "none",
                                            fontWeight: 700,
                                        }}
                                    >
                                        {formik.isSubmitting ? "Sending..." : "Submit"}
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            )}

            <Dialog
                open={offerNotExistOpen}
                onClose={() => setOfferNotExistOpen(false)}
                maxWidth="xs"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        position: "relative",
                    },
                }}
            >
                <IconButton
                    onClick={() => setOfferNotExistOpen(false)}
                    sx={{
                        position: "absolute",
                        width: 32,
                        height: 32,
                        top: 10,
                        right: 10,
                        zIndex: 2,
                        bgcolor: "background.default",
                        color: "text.secondary",
                        border: "1px solid",
                        borderColor: "divider",
                        fontSize: 16,
                        "&:hover": {
                            bgcolor: "primary.light",
                            color: "primary.dark",
                        },
                    }}
                >
                    ✕
                </IconButton>

                <DialogContent sx={{ p: 4, textAlign: "center" }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 800,
                            color: "secondary.main",
                            mb: 1,
                            pr: 3,
                        }}
                    >
                        Offer Not Available
                    </Typography>

                    <Typography
                        sx={{
                            color: "text.secondary",
                            lineHeight: 1.7,
                            mb: 3,
                        }}
                    >
                        This product offer does not exist.
                    </Typography>
                </DialogContent>
            </Dialog>

            <Dialog
                open={Boolean(viewProduct)}
                onClose={() => setViewProduct(null)}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        bgcolor: "primary.light",
                        color: "secondary.main",
                        fontWeight: 700,
                    }}
                >
                    Product Details
                </DialogTitle>

                <DialogContent sx={{ pt: 3 }}>
                    {viewProduct && (
                        <Box>
                            <Box
                                component="img"
                                src={getImageUrl(viewProduct.images?.[0])}
                                alt={viewProduct.name}
                                sx={{
                                    width: "100%",
                                    maxHeight: 300,
                                    objectFit: "contain",
                                    mb: 3,
                                }}
                            />

                            <Typography
                                variant="h6"
                                fontWeight={700}
                                color="secondary.main"

                            >
                                {viewProduct.name}
                            </Typography>

                            <Typography
                                sx={{
                                    mt: 2,
                                    color: "text.secondary",
                                    lineHeight: 1.8,
                                }}
                                dangerouslySetInnerHTML={{ __html: viewProduct.description }}
                            />

                            <Chip
                                label={viewProduct.status || "Available"}
                                sx={{
                                    mt: 3,
                                    bgcolor: "primary.main",
                                    color: "#fff",
                                }}
                            />
                        </Box>
                    )}
                </DialogContent>

                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={() => setViewProduct(null)}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}