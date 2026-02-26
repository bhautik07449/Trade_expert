"use client"

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
} from "@mui/material"
import Title from "./labelTitle"

const marketData = [
    {
        attribute: "Commodity",
        pomegranate: "Pomegranate",
        whiteOnionPowder: "White Onion Powder",
        whiteOnionFlakes: "White Onion Flakes",
        driedGarlicFlakes: "Dried Garlic Flakes",
        driedGarlicPowder: "Dried Garlic Powder",
        redOnionPowder: "Red Onion Powder",
    },
    {
        attribute: "Country",
        pomegranate: "Middle-east,South-east",
        whiteOnionPowder: "European & Asian std.",
        whiteOnionFlakes: "Global standard",
        driedGarlicFlakes: "European & Asian std.",
        driedGarlicPowder: "Global standard",
        redOnionPowder: "Indian standard",
    },
    {
        attribute: "Quality",
        pomegranate: "250-450 gm Red",
        whiteOnionPowder: "Grade A double sortex",
        whiteOnionFlakes: "Grade A double Sortex",
        driedGarlicFlakes: "Grade A double sortex",
        driedGarlicPowder: "Grade A double Sortex",
        redOnionPowder: "Grade A sortex",
    },
    {
        attribute: "Packing type",
        pomegranate: "3.5 gross 5 Ply CFP Boxes",
        whiteOnionPowder: "25kg PP bag",
        whiteOnionFlakes: "20 kg PP bag",
        driedGarlicFlakes: "25kg PP bag",
        driedGarlicPowder: "25kg PP bag",
        redOnionPowder: "25kg PP bag",
    },
    {
        attribute: "Delivery",
        pomegranate: "Ex Cold-storage",
        whiteOnionPowder: "Ex-factory & As Required",
        whiteOnionFlakes: "Ex-factory or FOB",
        driedGarlicFlakes: "Ex-factory or FOB",
        driedGarlicPowder: "Ex-factory or FOB",
        redOnionPowder: "Ex-factory or FOB",
    },
    {
        attribute: "Rate per kg",
        pomegranate: "105",
        whiteOnionPowder: "65",
        whiteOnionFlakes: "80",
        driedGarlicFlakes: "43",
        driedGarlicPowder: "30",
        redOnionPowder: "72",
        isHighlighted: true,
    },
]

const columns = [
    { key: "attribute", label: "" },
    { key: "pomegranate", label: "Pomegranate" },
    { key: "whiteOnionPowder", label: "White Onion Powder" },
    { key: "whiteOnionFlakes", label: "White Onion Flakes" },
    { key: "driedGarlicFlakes", label: "Dried Garlic Flakes" },
    { key: "driedGarlicPowder", label: "Dried Garlic Powder" },
    { key: "redOnionPowder", label: "Red Onion Powder" },
]

export default function SpotMarketTable() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoScrolling, setIsAutoScrolling] = useState(true)

    const visibleColumns = 4
    const columnWidth = 200

    const dataColumns = columns.slice(1)
    const duplicatedColumns = [...dataColumns, ...dataColumns]
    const totalColumns = dataColumns.length

    useEffect(() => {
        if (!isAutoScrolling) return

        const interval = setInterval(() => {
            setCurrentIndex((prev) => prev + 1)
        }, 3000)

        return () => clearInterval(interval)
    }, [isAutoScrolling])

    useEffect(() => {
        if (currentIndex >= totalColumns) {
            setTimeout(() => {
                setCurrentIndex(0)
            }, 600)
        }
    }, [currentIndex, totalColumns])

    const handleMouseEnter = () => setIsAutoScrolling(false)
    const handleMouseLeave = () => setIsAutoScrolling(true)

    return (
        <>
            <Title title="Spot Market" label="Rate" />

            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
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
                                <TableCell
                                    colSpan={visibleColumns}
                                    sx={{ padding: 0 }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            transform: `translateX(-${currentIndex * columnWidth}px)`,
                                            transition: "transform 0.6s ease-in-out",
                                        }}
                                    >
                                        {duplicatedColumns.map((column, index) => (
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
                            {marketData.map((row, rowIndex) => (
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

                                    <TableCell
                                        colSpan={visibleColumns}
                                        sx={{ padding: 0 }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                transform: `translateX(-${currentIndex * columnWidth}px)`,
                                                transition: "transform 0.6s ease-in-out",
                                            }}
                                        >
                                            {duplicatedColumns.map((column, index) => (
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
                                                    {row[column.key as keyof typeof row]}
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
        </>
    )
}