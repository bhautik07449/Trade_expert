import { useEffect, useState } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Skeleton,
    Typography,
    Tabs,
    Tab,
} from "@mui/material"
import LabelTitle from "./labelTitle"
import HomePageservice from "../service/homepages.service"
import CMSservice from "../service/cms.service"
import NoDataFound from "./NoDataFound"

type ColumnType = {
    key: string
    label: string
}

type RowType = {
    attribute: string
    isHighlighted?: boolean
    [key: string]: any
}

const transformMarketData = (data: any[]) => {
    if (!data || data.length === 0) return { columns: [], rows: [] }

    const dynamicColumns =(Array.isArray(data) ? data : []).map((item) => ({
        key: `col_${item.id}`,
        label: item.dmrName || "-",
    }))

    const attributes = [
        { key: "country", label: "Country" },
        { key: "quality", label: "Quality" },
        { key: "packing", label: "Packing Type" },
        { key: "delivery", label: "Delivery" },
        { key: "categoryType", label: "Category Type" },
        { key: "noOfPacking", label: "No of packing" },
        { key: "rate", label: "Rate per kg", isHighlighted: true },
    ]

    const rows =(Array.isArray(attributes) ? attributes : []).map((attr) => {
        const row: any = {
            attribute: attr.label,
            isHighlighted: attr.isHighlighted || false,
        }

        data.forEach((item) => {
            const source = item.market?.[0] || item;

            if (attr.key === "packing") {
                row[`col_${item.id}`] = `${source.packing || "-"}`
            } else if (attr.key === "categoryType") {
                row[`col_${item.id}`] = source.categoryType || "-"
            } else if (attr.key === "noOfPacking") {
                row[`col_${item.id}`] = source.noOfPacking || "-"
            } else {
                row[`col_${item.id}`] = source[attr.key] || "-"
            }
        })

        return row
    })

    return {
        columns: [{ key: "attribute", label: "" }, ...dynamicColumns],
        rows,
    }
}

export default function SpotMarketTable({ category }: any) {
    const [tableData, setTableData] = useState<{
        columns: ColumnType[]
        rows: RowType[]
    }>({
        columns: [],
        rows: [],
    })
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoScrolling, setIsAutoScrolling] = useState(true)
    const [loading, setLoading] = useState(true)
    const [activeSubcategory, setActiveSubCategory] = useState("")
    const [subcategories, setSubcategories] = useState<any[]>([])

    const visibleColumns = 5
    const columnWidth = 200

    const baseColumns = (Array.isArray(tableData.columns) ? tableData.columns : []).slice(1)
    const dataColumns = [...baseColumns, ...baseColumns]
    const totalColumns = baseColumns.length

    useEffect(() => {
        if (!isAutoScrolling || totalColumns <= visibleColumns) return

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % totalColumns)
        }, 3000)

        return () => clearInterval(interval)
    }, [isAutoScrolling, totalColumns])

    useEffect(() => {
        if (currentIndex >= totalColumns) {
            setCurrentIndex(0)
        }
    }, [currentIndex, totalColumns])

    const handleMouseEnter = () => setIsAutoScrolling(false)
    const handleMouseLeave = () => setIsAutoScrolling(true)

    const getData = async (category: string, subcategory: string) => {
        setLoading(true)
        try {
            const res = await HomePageservice.getSpotMarketRateByCategory(category, subcategory)
            const apiData = res?.data?.data || []

            const formatted = transformMarketData(apiData)
            setTableData(formatted)
        } catch (error: any) {
            console.log(error?.response?.data?.message, "market data not fetch")
        } finally {
            setLoading(false)
        }
    }

    const getCategoryDetails = async (id: string) => {
        try {
            const res = await CMSservice.getCategoryById(id)
            const children = res?.data?.children || []
            setSubcategories(children)
            if (children.length > 0) {
                setActiveSubCategory(children[0]?.id)
            } else {
                setActiveSubCategory("")
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (category) {
            getCategoryDetails(category)
        }
    }, [category])

    useEffect(() => {
        if (category) {
            getData(category, activeSubcategory)
        }
    }, [category, activeSubcategory])

    return (
        <Box sx={{ width: "100%", pb: { xs: 6, md: 10 }, boxSizing: "border-box", bgcolor: "background.default" }}>
            <LabelTitle title="Spot Market" label="Rate" tagLine="Get real-time updates on the latest spot market rates and trends." />

            <Paper
                elevation={0}
                sx={{
                    mt: 3,
                    mb: 0,
                    p: 1,
                    bgcolor: "transparent",
                    boxShadow: "none",
                    width: "100%",
                    overflow: "hidden",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        overflowX: "auto",
                        overflowY: "hidden",
                        WebkitOverflowScrolling: "touch",
                        scrollbarWidth: "none",
                        "&::-webkit-scrollbar": {
                            display: "none",
                        },
                    }}
                >
                    <Tabs
                        value={activeSubcategory || false}
                        onChange={(_, value: string) => setActiveSubCategory(value)}
                        variant="scrollable"
                        scrollButtons="auto"
                        allowScrollButtonsMobile
                        aria-label="subcategory tabs"
                        sx={{
                            minHeight: 52,

                            "& .MuiTabs-scroller": {
                                overflowX: "auto !important",
                                overflowY: "hidden",
                                scrollBehavior: "smooth",
                                scrollbarWidth: "none",
                                "&::-webkit-scrollbar": {
                                    display: "none",
                                },
                            },

                            "& .MuiTabs-indicator": {
                                display: "none",
                            },

                            "& .MuiTabs-flexContainer": {
                                gap: 1,
                                justifyContent: {
                                    xs: "flex-start",
                                    md: "center",
                                },
                                flexWrap: "nowrap",
                            },

                            "& .MuiTabs-scrollButtons": {
                                color: "secondary.main",
                                width: 34,
                                "&.Mui-disabled": {
                                    opacity: 0.25,
                                },
                            },

                            "& .MuiTab-root": {
                                minHeight: 44,
                                minWidth: "auto",
                                px: { xs: 2.2, sm: 3 },
                                borderRadius: 2,
                                textTransform: "none",
                                fontWeight: 700,
                                color: "text.secondary",
                                border: "1px solid",
                                borderColor: "divider",
                                whiteSpace: "nowrap",
                                flexShrink: 0,
                            },

                            "& .MuiTab-root:hover": {
                                bgcolor: "primary.light",
                                color: "secondary.dark",
                            },

                            "& .Mui-selected": {
                                bgcolor: "primary.main",
                                color: "#fff !important",
                                borderColor: "primary.main",
                            },
                        }}
                    >
                        {(Array.isArray(subcategories) ? subcategories : []).map((item) => (
                            <Tab
                                key={item?.id || item?.name}
                                label={item?.name}
                                value={item?.id}
                            />
                        ))}
                    </Tabs>
                </Box>
            </Paper>

            <Box
                sx={{
                    width: "100%",
                    maxWidth: "1400px",
                    mx: "auto",
                    display: "flex",
                    justifyContent: "center",
                    px: { xs: 2, sm: 4, md: 6 },
                }}
            >
                {loading ? (
                    <Box sx={{ width: "100%", overflow: "hidden" }}>
                        <TableContainer component={Paper} sx={{ width: `${150 + visibleColumns * columnWidth}px`, mx: "auto" }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ minWidth: 150, backgroundColor: "#f8f9fa" }}>
                                            <Skeleton variant="text" width="60%" />
                                        </TableCell>
                                        <TableCell colSpan={visibleColumns} sx={{ padding: 0 }}>
                                            <Box sx={{ display: "flex" }}>
                                                {Array.from(new Array(visibleColumns)).map((_, i) => (
                                                    <Box key={i} sx={{ minWidth: columnWidth, padding: "16px", borderRight: "1px solid #eee", backgroundColor: "#f8f9fa" }}>
                                                        <Skeleton variant="text" width="80%" />
                                                    </Box>
                                                ))}
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Array.from(new Array(6)).map((_, rowIndex) => (
                                        <TableRow key={rowIndex}>
                                            <TableCell sx={{ minWidth: 150, backgroundColor: "#f8f9fa" }}>
                                                <Skeleton variant="text" width="70%" />
                                            </TableCell>
                                            <TableCell colSpan={visibleColumns} sx={{ padding: 0 }}>
                                                <Box sx={{ display: "flex" }}>
                                                    {Array.from(new Array(visibleColumns)).map((_, i) => (
                                                        <Box key={i} sx={{ minWidth: columnWidth, padding: "16px", borderRight: "1px solid #eee" }}>
                                                            <Skeleton variant="text" width="40%" />
                                                        </Box>
                                                    ))}
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                ) : (
                    dataColumns?.length === 0 ? (
                        <Box
                            sx={{
                                width: "100%",
                                py: 6,
                            }}
                        >
                            <NoDataFound message="No spot market data is available for this category." />
                        </Box>
                    ) : (
                        <TableContainer
                            component={Paper}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            sx={{
                                overflow: "hidden",
                                width: `${150 + visibleColumns * columnWidth}px`,
                            }}
                        >
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                            sx={{
                                                minWidth: 150,
                                                fontWeight: 600,
                                                backgroundColor: "#f8f9fa",
                                                position: "sticky",
                                                left: 0,
                                                zIndex: 10,
                                            }}
                                        />
                                        <TableCell colSpan={visibleColumns} sx={{ padding: 0 }}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    transform: `translateX(-${currentIndex * columnWidth}px)`,
                                                    transition: "transform 0.6s ease-in-out",
                                                }}
                                            >
                                                {(Array.isArray(dataColumns) ? dataColumns : []).map((column, index) => (
                                                    <Box
                                                        key={index}
                                                        sx={{
                                                            minWidth: columnWidth,
                                                            fontWeight: 600,
                                                            backgroundColor: "#f8f9fa",
                                                            padding: "16px",
                                                            borderRight: "1px solid #eee",
                                                        }}
                                                    >
                                                        {column.label}
                                                    </Box>
                                                ))}
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {(Array.isArray(tableData.rows) ? tableData.rows : []).map((row: any, rowIndex: number) => (
                                        <TableRow key={rowIndex}>
                                            <TableCell
                                                sx={{
                                                    minWidth: 150,
                                                    fontWeight: 600,
                                                    backgroundColor: "#f8f9fa",
                                                    position: "sticky",
                                                    left: 0,
                                                    zIndex: 9,
                                                }}
                                            >
                                                {row.attribute}
                                            </TableCell>

                                            <TableCell colSpan={visibleColumns} sx={{ padding: 0 }}>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        transform: `translateX(-${currentIndex * columnWidth}px)`,
                                                        transition: "transform 0.6s ease-in-out",
                                                    }}
                                                >
                                                    {(Array.isArray(dataColumns) ? dataColumns : []).map((column, index) => (
                                                        <Box
                                                            key={index}
                                                            sx={{
                                                                minWidth: columnWidth,
                                                                padding: "16px",
                                                                borderRight: "1px solid #eee",
                                                                backgroundColor: row.isHighlighted
                                                                    ? "secondary.main"
                                                                    : "white",
                                                                color: row.isHighlighted
                                                                    ? "white"
                                                                    : "inherit",
                                                                fontWeight: row.isHighlighted
                                                                    ? 600
                                                                    : 400,
                                                            }}
                                                        >
                                                            {row[column.key] || "-"}
                                                        </Box>
                                                    ))}
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )
                )}
            </Box>
        </Box>
    )
}