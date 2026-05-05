import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CMSservice from "../service/cms.service";
import { toast } from "react-toastify";
import CardUi from "../commonUI/CardUi";
import InquiryDialog from "../component/Dialog/inquiry-dialog";
import EnquiryDialog from "../component/Dialog/enquiry-dialog";

export default function Abc() {
    const [list, setList] = useState<any[]>([])
    const [open, setOpen] = useState(false)
    const [openEnquiry, setOpenEnquiry] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<{
        name?: string
        description?: string
        images?: string
        id?: any
    } | null>(null)

    const getList = async () => {
        try {
            const res = await CMSservice.getAbc()
            if (res) {
                setList(res?.data?.data)
            }
        } catch (error) {
            toast.error("bran not found")
        }
    }

    useEffect(() => {
        getList()
    }, [])

    return (
        <Box sx={{ bgcolor: "white", minHeight: "100vh", pb: 8 }}>
            <Box
                component="img"
                src="https://sourceseas.itcoders.in/img/my_account_bg1.jpg"
                alt="Abc Menus"
                sx={{
                    width: "100%",
                    height: { xs: "200px", md: "300px" },
                    objectFit: "cover",
                }}
            />

            <Box sx={{ py: 4, textAlign: "center" }}>
                <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, color: "secondary.main" }}
                >
                    Abc Menus
                </Typography>
            </Box>

            <Container maxWidth="lg">

                <Typography
                    sx={{
                        color: "secondary.main",
                        mb: 5,
                        fontSize: { xs: "14px", sm: "16px", md: "18px" },
                        textAlign: "center",
                    }}
                >
                    We firmly believe in sourcing and supplying top-quality agri and food
                    products. We collaborate only with ISO, FSSAI, HACCP, HALAL, BRC and
                    FDA approved suppliers to ensure global food safety standards.
                </Typography>

                {list?.map((item) => (
                    <Box
                        sx={{
                            mb: 6
                        }}
                    >
                        <Box
                            sx={{
                                border: "2px solid #3E3126",
                                textAlign: "center",
                                py: 1.5,
                                mb: 6,
                                fontWeight: 600,
                            }}
                        >
                            {item?.category?.name}
                        </Box>

                        <CardUi
                            label='Availability'
                            onEnquire={(product) => {
                                setSelectedProduct({ name: product.name, description: product?.description, images: product?.images?.[0], id: product.id })
                                setOpenEnquiry(true)
                            }}
                            onRequestSample={(product) => {
                                setSelectedProduct({ name: product.name, description: product?.description, images: product?.images?.[0], id: product.id })
                                setOpen(true)
                            }}
                            products={item?.products}
                            visiblecard={3}
                        />

                    </Box>
                ))}
            </Container>

            <InquiryDialog
                open={open}
                onClose={() => setOpen(false)}
                product={{
                    name: selectedProduct?.name,
                    description: selectedProduct?.description,
                    images: selectedProduct?.images,
                    id: selectedProduct?.id
                }}
            />

            <EnquiryDialog
                open={openEnquiry}
                onClose={() => setOpenEnquiry(false)}
                product={{
                    name: selectedProduct?.name,
                    description: selectedProduct?.description,
                    images: selectedProduct?.images,
                    id: selectedProduct?.id
                }}
            />
        </Box>
    );
}