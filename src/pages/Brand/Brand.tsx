import { Box, Typography, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Brandservice from "../../service/brand.service";
import { getImageUrl } from "../../utils/imageUtils";
import SEO from "../../component/SEO";

interface Props {
    logo: string,
    name: string,
    description: string,
    category: category
}

interface category {
    name: string
}

export default function Brand() {
    const [list, setList] = useState<Props[]>([])
    const [loading, setLoading] = useState(true)
    console.log("list", list);

    const getList = async () => {
        setLoading(true)
        try {
            const res = await Brandservice.getList()
            if (res) {
                setList(res?.data)
            }
        } catch (error) {
            toast.error("bran not found")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getList()
    }, [])

    return (
        <Box sx={{ bgcolor: 'white', minHeight: '100vh', pb: 10 }}>
            <SEO
                title="Our Brands - Tradexpert"
                description="Explore the brands and categories available on Tradexpert."
            />
            <img src="https://sourceseas.itcoders.in/img/front-end/brands.jpg" alt="Brands" style={{ width: '100%', minHeight: '200px', maxHeight: '400px', objectFit: "cover" }} />
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {loading ? (
                    Array.from(new Array(3)).map((_, i) => (
                        <Box key={i} sx={{ maxWidth: "1200px", mx: "auto", px: { xs: 2, sm: 3, md: 4 }, py: 4, display: "flex", gap: 4, flexDirection: "column", alignItems: "center", width: "100%", boxSizing: "border-box" }}>
                            <Skeleton variant="circular" width={100} height={100} />
                            <Box sx={{ width: "100%", textAlign: "center" }}>
                                <Skeleton variant="text" width="30%" sx={{ mx: "auto", mb: 2 }} />
                                <Skeleton variant="text" width="80%" sx={{ mx: "auto" }} />
                                <Skeleton variant="text" width="75%" sx={{ mx: "auto" }} />
                            </Box>
                        </Box>
                    ))
                ) : (
                    list?.map((item, index) => (
                        <Box key={index}>
                            <Box sx={{ p: 2, textAlign: 'center' }}>
                                <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: 'secondary.main' }}>
                                    {item?.category?.name}
                                </Typography>
                            </Box>

                            <Box sx={{ maxWidth: "1200px", mx: "auto", px: { xs: 2, sm: 3, md: 4 }, display: "flex", gap: 4, flexWrap: "wrap", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", boxSizing: "border-box", width: "100%" }}>
                                <img src={getImageUrl(item?.logo)} alt="FSSAI Approved Foods" style={{ width: '100px', height: "100px" }} />
                                <Box>
                                    <Typography variant="h6" sx={{ color: 'secondary.main', mb: 4 }}>
                                        {item?.name}
                                    </Typography>
                                    <Typography>{item?.description}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    ))
                )}
            </Box>
        </Box >
    )
}