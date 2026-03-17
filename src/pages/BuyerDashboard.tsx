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

const dashboardItems = [
    {
        title: "Total Category",
        value: "120",
        icon: <ShoppingCartIcon fontSize="large" />,
    },
    {
        title: "Total Products",
        value: "45",
        icon: <InventoryIcon fontSize="large" />,
    },
    {
        title: "Total Quotations",
        value: "12",
        icon: <AccountCircleIcon fontSize="large" />,
    },
    {
        title: "Total Sample cart",
        value: "8",
        icon: <MessageIcon fontSize="large" />,
    },
]

export default function BuyerDashboard() {
    return (
        <Box sx={{ p: 4 }}>

            <Typography variant="h5" sx={{ mb: 3 }}>
                Buyer Dashboard
            </Typography>

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