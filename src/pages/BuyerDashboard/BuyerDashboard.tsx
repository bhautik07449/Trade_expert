import * as React from "react"
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    CardActionArea,
    Skeleton,
    Tabs,
    Tab
} from "@mui/material"

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import InventoryIcon from "@mui/icons-material/Inventory"
import MessageIcon from "@mui/icons-material/Message"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import LabelTitle from "../../commonUI/labelTitle"
import CMSservice from "../../service/cms.service"
import { toast } from "react-toastify"

function TabPanel(props: any) {
    const { children, value, index, ...other } = props

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                <Box sx={{ pt: 3 }}>
                    {children}
                </Box>
            )}
        </Box>
    )
}

export default function BuyerDashboard() {
    const [dashboard, setDashboard] = React.useState<any>()
    const [loading, setLoading] = React.useState(true)
    const [tabValue, setTabValue] = React.useState(0)

    const getData = async () => {
        setLoading(true)

        try {
            const res = await CMSservice.buyerDashboard()

            if (res) {
                setDashboard(res?.data?.data)
            }
        } catch (error) {
            console.log("error", error)
            toast.error("Data not fetch")
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        getData()
    }, [])

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue)
    }

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

            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    mt: 2,
                }}
            >
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    <Tab label="Overview" />
                    <Tab label="Enquiry" />
                    <Tab label="Quotation" />
                    <Tab label="Sample Cart" />
                </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
                <Grid container spacing={3}>
                    {loading ? (
                        Array.from(new Array(4)).map((_, index) => (
                            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                                <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                                    <CardContent sx={{ textAlign: "center" }}>
                                        <Skeleton
                                            variant="circular"
                                            width={40}
                                            height={40}
                                            sx={{ mx: "auto", mb: 1 }}
                                        />
                                        <Skeleton
                                            variant="text"
                                            height={30}
                                            width="60%"
                                            sx={{ mx: "auto" }}
                                        />
                                        <Skeleton
                                            variant="text"
                                            height={40}
                                            width="40%"
                                            sx={{ mx: "auto" }}
                                        />
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    ) : ((Array.isArray(dashboardItems) ? dashboardItems : []).map((item, index) => (
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
                        ))
                    )}
                </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
                <Typography variant="h6">
                    Enquiry tab content here
                </Typography>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
                <Typography variant="h6">
                    Quotation tab content here
                </Typography>
            </TabPanel>

            <TabPanel value={tabValue} index={3}>
                <Typography variant="h6">
                    Sample Cart tab content here
                </Typography>
            </TabPanel>
        </Box>
    )
}