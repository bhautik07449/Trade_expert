"use client"

import * as React from "react"
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    CardActionArea
} from "@mui/material"

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import InventoryIcon from "@mui/icons-material/Inventory"
import MessageIcon from "@mui/icons-material/Message"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import LabelTitle from "../commonUI/labelTitle"
import CMSservice from "../service/cms.service"
import { toast } from "react-toastify"

export default function BuyerDashboard() {
    const [dashboard, setDashboard] = React.useState<any>()

    const getData = async () => {
        try {
            const res = await CMSservice.buyerDashboard()
            if (res) {
                setDashboard(res?.data?.data)
            }
        } catch (error) {
            console.log("error", error);
            toast.error("Data not fetch")
        }
    }

    React.useEffect(() => {
        getData()
    }, [])

    const dashboardItems = [
        {
            title: "Total Category",
            value: dashboard?.totalCategory || 0,
            icon: <ShoppingCartIcon fontSize="large" />,
        },
        {
            title: "Total Enquiry",
            value: dashboard?.totalEnquiry || 0,
            icon: <InventoryIcon fontSize="large" />,
        },
        {
            title: "Total Quotations",
            value: dashboard?.totalQuotation || 0,
            icon: <AccountCircleIcon fontSize="large" />,
        },
        {
            title: "Total Sample cart",
            value: dashboard?.totalRequest || 0,
            icon: <MessageIcon fontSize="large" />,
        },
    ]

    return (
        <Box sx={{ p: 4 }}>

            <LabelTitle title="Buyer" label="Dashboard" />

            <Grid container spacing={3}>
                {dashboardItems.map((item, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                        <Card
                            sx={{
                                borderRadius: 3,
                                boxShadow: 3,
                                transition: "0.3s",
                                "&:hover": {
                                    transform: "translateY(-5px)",
                                    boxShadow: 6,
                                },
                            }}
                        >
                            <CardActionArea>
                                <CardContent sx={{ textAlign: "center" }}>
                                    <Box sx={{ mb: 1 }}>
                                        {item.icon}
                                    </Box>

                                    <Typography variant="h6">
                                        {item.title}
                                    </Typography>

                                    <Typography variant="h5" color="primary">
                                        {item.value}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}