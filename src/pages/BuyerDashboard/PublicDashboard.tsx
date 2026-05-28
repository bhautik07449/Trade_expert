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
    Tab,
    Button,
    TextField,
    IconButton,
    Avatar,
    Stack,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Divider,
} from "@mui/material"

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import InventoryIcon from "@mui/icons-material/Inventory"
import MessageIcon from "@mui/icons-material/Message"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import LogoutIcon from "@mui/icons-material/Logout"
import SearchIcon from "@mui/icons-material/Search"
import LabelTitle from "../../commonUI/labelTitle"
import CMSservice from "../../service/cms.service"
import { toast } from "react-toastify"

function TabPanel(props: any) {
    const { children, value, index, ...other } = props

    return (
        <Box role="tabpanel" hidden={value !== index} {...other}>
            {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
        </Box>
    )
}

export default function PublicDashboard() {
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
            title: "Total Sample Cart",
            value: dashboard?.totalRequest || 0,
            icon: <MessageIcon fontSize="large" />,
        },
    ]

    const tableRows = [
        {
            type: "Image",
            name: "Product Name",
            content: "Content details here",
            status: "Active",
        },
        {
            type: "Image",
            name: "Product Name",
            content: "Content details here",
            status: "Pending",
        },
        {
            type: "Image",
            name: "Product Name",
            content: "Content details here",
            status: "Completed",
        },
    ]

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#f5f7fb",
                p: { xs: 2, md: 4 },
            }}
        >
            {/* Top Header */}
            <Paper
                elevation={0}
                sx={{
                    p: 2,
                    mb: 3,
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                }}
            >
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", md: "center" }}
                    spacing={2}
                >
                    <Box>
                        <Typography variant="h5" fontWeight={700}>
                            Public / Private Personnel
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Buyer dashboard overview
                        </Typography>
                    </Box>

                    <Stack direction="row" alignItems="center" spacing={1}>
                        <IconButton>
                            <NotificationsNoneIcon />
                        </IconButton>

                        <IconButton>
                            <MessageIcon />
                        </IconButton>

                        <Avatar sx={{ width: 36, height: 36 }}>
                            <AccountCircleIcon />
                        </Avatar>

                        <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            startIcon={<LogoutIcon />}
                        >
                            Logout
                        </Button>
                    </Stack>
                </Stack>
            </Paper>

            {/* Title + Search */}
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                }}
            >
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "stretch", md: "center" }}
                    spacing={2}
                >
                    <LabelTitle title="Buyer" label="Dashboard" />

                    <TextField
                        size="small"
                        placeholder="Search..."
                        sx={{ width: { xs: "100%", md: 320 } }}
                        InputProps={{
                            startAdornment: (
                                <SearchIcon
                                    fontSize="small"
                                    sx={{ mr: 1, color: "text.secondary" }}
                                />
                            ),
                        }}
                    />
                </Stack>

                <Divider sx={{ my: 3 }} />

                {/* Tabs */}
                <Box
                    sx={{
                        borderBottom: 1,
                        borderColor: "divider",
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
                    {/* Dashboard Cards */}
                    <Grid container spacing={3}>
                        {loading ? (
                            Array.from(new Array(4)).map((_, index) => (
                                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                                    <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                                        <CardContent sx={{ textAlign: "center" }}>
                                            <Skeleton
                                                variant="circular"
                                                width={44}
                                                height={44}
                                                sx={{ mx: "auto", mb: 1 }}
                                            />
                                            <Skeleton
                                                variant="text"
                                                height={30}
                                                width="70%"
                                                sx={{ mx: "auto" }}
                                            />
                                            <Skeleton
                                                variant="text"
                                                height={40}
                                                width="45%"
                                                sx={{ mx: "auto" }}
                                            />
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        ) : (
                            dashboardItems.map((item, index) => (
                                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                                    <Card
                                        sx={{
                                            borderRadius: 3,
                                            boxShadow: 2,
                                            transition: "0.3s",
                                            height: "100%",
                                            "&:hover": {
                                                transform: "translateY(-5px)",
                                                boxShadow: 6,
                                            },
                                        }}
                                    >
                                        <CardActionArea sx={{ height: "100%" }}>
                                            <CardContent sx={{ textAlign: "center" }}>
                                                <Box
                                                    sx={{
                                                        width: 56,
                                                        height: 56,
                                                        mx: "auto",
                                                        mb: 1.5,
                                                        borderRadius: "50%",
                                                        bgcolor: "primary.light",
                                                        color: "primary.contrastText",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                    }}
                                                >
                                                    {item.icon}
                                                </Box>

                                                <Typography variant="subtitle1" fontWeight={600}>
                                                    {item.title}
                                                </Typography>

                                                <Typography
                                                    variant="h4"
                                                    color="primary"
                                                    fontWeight={700}
                                                >
                                                    {item.value}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))
                        )}
                    </Grid>

                    {/* Table Section */}
                    <Box mt={4}>
                        <Typography variant="h6" fontWeight={700} mb={2}>
                            Data / Task Panel
                        </Typography>

                        <TableContainer
                            component={Paper}
                            elevation={0}
                            sx={{
                                borderRadius: 3,
                                border: "1px solid",
                                borderColor: "divider",
                            }}
                        >
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ bgcolor: "#f9fafc" }}>
                                        <TableCell>Image</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Content</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {tableRows.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <Box
                                                    sx={{
                                                        width: 42,
                                                        height: 42,
                                                        borderRadius: 2,
                                                        bgcolor: "#e9eef8",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        fontSize: 12,
                                                        color: "text.secondary",
                                                    }}
                                                >
                                                    Img
                                                </Box>
                                            </TableCell>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.content}</TableCell>
                                            <TableCell>{row.status}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                    <Typography variant="h6">Enquiry tab content here</Typography>
                </TabPanel>

                <TabPanel value={tabValue} index={2}>
                    <Typography variant="h6">Quotation tab content here</Typography>
                </TabPanel>

                <TabPanel value={tabValue} index={3}>
                    <Typography variant="h6">Sample Cart tab content here</Typography>
                </TabPanel>
            </Paper>
        </Box>
    )
}