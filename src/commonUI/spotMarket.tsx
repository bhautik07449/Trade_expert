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
} from "@mui/material"
import Title from "./labelTitle"
import HomePageservice from "../service/homepages.service"

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

    const dynamicColumns = data.map((item) => ({
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

    const rows = attributes.map((attr) => {
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

    const visibleColumns = 5
    const columnWidth = 200

    const baseColumns = tableData.columns.slice(1)
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

    const getData = async (category: string) => {
        try {
            const res = await HomePageservice.getSpotMarketRateByCategory(category)
            const apiData = res?.data?.data || []

            const formatted = transformMarketData(apiData)
            setTableData(formatted)
        } catch (error: any) {
            console.log(error?.response?.data?.message, "market data not fetch")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (category) {
            getData(category)
        }
    }, [category])

    return (
        <Box sx={{ width: "100%", maxWidth: "1400px", mx: "auto", px: { xs: 2, sm: 4, md: 6 }, py: { xs: 3, md: 4 }, boxSizing: "border-box" }}>
            <Title title="Spot Market" label="Rate" />

            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
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
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                py: 6,
                            }}
                        >
                            <Typography variant="body1" color="text.secondary">
                                No spot market data is available for this category.
                            </Typography>
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
                                                {dataColumns.map((column, index) => (
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
                                    {tableData.rows.map((row: any, rowIndex: number) => (
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
                                                    {dataColumns.map((column, index) => (
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