"use client"

import { useEffect, useRef, useState } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Typography,
} from "@mui/material"
import Title from "./Title"


const marketData = [
    {
        attribute: "Commodity",
        pomegranate: "Pomegranate",
        whiteOnionPowder: "White Onion Powder",
        whiteOnionFlakes: "White Onion Flakes",
        driedGarlicFlakes: "Dried Garlic Flakes",
        driedGarlicPowder: "Dried Garlic Powder",
        redOnionPowder: "Red Onion Powder",
        garlicGranules: "Garlic Granules",
        onionGranules: "Onion Granules",
        turmericPowder: "Turmeric Powder",
        corianderSeeds: "Coriander Seeds",
        cuminSeeds: "Cumin Seeds",
        fennelSeeds: "Fennel Seeds",
    },
    {
        attribute: "Country",
        pomegranate: "Middle-east,South-east",
        whiteOnionPowder: "European & Asian std.",
        whiteOnionFlakes: "Global standard",
        driedGarlicFlakes: "European & Asian std.",
        driedGarlicPowder: "Global standard",
        redOnionPowder: "Indian standard",
        garlicGranules: "Chinese standard",
        onionGranules: "European standard",
        turmericPowder: "Indian premium",
        corianderSeeds: "Indian & Middle-east",
        cuminSeeds: "Indian & Turkish",
        fennelSeeds: "Indian & European",
    },
    {
        attribute: "Quality",
        pomegranate: "250-450 gm Red",
        whiteOnionPowder: "Grade A dobule sortex",
        whiteOnionFlakes: "Grade A double Sortex",
        driedGarlicFlakes: "Grade A double sortex",
        driedGarlicPowder: "Grade A double Sortex",
        redOnionPowder: "Grade A sortex",
        garlicGranules: "8-16 mesh",
        onionGranules: "8-16 mesh",
        turmericPowder: "Curcumin 3-5%",
        corianderSeeds: "99% purity",
        cuminSeeds: "99.5% purity",
        fennelSeeds: "99% purity",
    },
    {
        attribute: "Packing type",
        pomegranate: "3.5 gross 5 Ply CFP Boxes",
        whiteOnionPowder: "25kg PP bag",
        whiteOnionFlakes: "20 kg PP bag",
        driedGarlicFlakes: "25kg PP bag.",
        driedGarlicPowder: "25kg PP bag",
        redOnionPowder: "25kg PP bag",
        garlicGranules: "25kg PP bag",
        onionGranules: "25kg PP bag",
        turmericPowder: "25kg PP bag",
        corianderSeeds: "50kg PP bag",
        cuminSeeds: "50kg PP bag",
        fennelSeeds: "25kg PP bag",
    },
    {
        attribute: "Delivery",
        pomegranate: "Ex Cold-storage",
        whiteOnionPowder: "Ex-factory & As Required",
        whiteOnionFlakes: "Ex-factory or FOB",
        driedGarlicFlakes: "Ex-factory or FOB",
        driedGarlicPowder: "Ex-factory or FOB",
        redOnionPowder: "Ex-factory or FOB",
        garlicGranules: "Ex-factory or FOB",
        onionGranules: "Ex-factory or FOB",
        turmericPowder: "Ex-factory or FOB",
        corianderSeeds: "Ex-factory or FOB",
        cuminSeeds: "Ex-factory or FOB",
        fennelSeeds: "Ex-factory or FOB",
    },
    {
        attribute: "Cargo type",
        pomegranate: "40ft Reefer Container",
        whiteOnionPowder: "20ft Dry Container",
        whiteOnionFlakes: "20ft Dry Container",
        driedGarlicFlakes: "20ft Dry Container",
        driedGarlicPowder: "20ft Reefer",
        redOnionPowder: "20ft Dry Container",
        garlicGranules: "20ft Dry Container",
        onionGranules: "20ft Dry Container",
        turmericPowder: "20ft Dry Container",
        corianderSeeds: "20ft Dry Container",
        cuminSeeds: "20ft Dry Container",
        fennelSeeds: "20ft Dry Container",
    },
    {
        attribute: "No of packing",
        pomegranate: "5300 Box +/- 5%",
        whiteOnionPowder: "500 Bags +/- 5%",
        whiteOnionFlakes: "500 Bags +/- 5%",
        driedGarlicFlakes: "500 Bags +/- 5 %",
        driedGarlicPowder: "500 Bags +/- 5%",
        redOnionPowder: "500 Bags +/- 5%",
        garlicGranules: "500 Bags +/- 5%",
        onionGranules: "500 Bags +/- 5%",
        turmericPowder: "500 Bags +/- 5%",
        corianderSeeds: "400 Bags +/- 5%",
        cuminSeeds: "400 Bags +/- 5%",
        fennelSeeds: "500 Bags +/- 5%",
    },
    {
        attribute: "Rate per kg",
        pomegranate: "105",
        whiteOnionPowder: "65",
        whiteOnionFlakes: "80",
        driedGarlicFlakes: "43",
        driedGarlicPowder: "30",
        redOnionPowder: "72",
        garlicGranules: "38",
        onionGranules: "85",
        turmericPowder: "28",
        corianderSeeds: "15",
        cuminSeeds: "45",
        fennelSeeds: "22",
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
    const [currentColumnIndex, setCurrentColumnIndex] = useState(0)
    const tableRef = useRef<HTMLDivElement>(null)
    const [isAutoScrolling, setIsAutoScrolling] = useState(true)

    const visibleColumns = 6
    const totalDataColumns = columns.length - 1
    const columnWidth = 180

    useEffect(() => {
        if (!isAutoScrolling) return

        const interval = setInterval(() => {
            setCurrentColumnIndex((prev) => {
                const nextIndex = prev + 1
                if (nextIndex > totalDataColumns) {
                    return 0
                }
                return nextIndex
            })
        }, 2000)

        return () => clearInterval(interval)
    }, [isAutoScrolling, totalDataColumns, visibleColumns])

    useEffect(() => {
        if (tableRef.current) {
            const scrollPosition = currentColumnIndex * columnWidth
            tableRef.current.scrollTo({
                left: scrollPosition,
                behavior: "smooth",
            })
        }
    }, [currentColumnIndex, columnWidth])

    const handleMouseEnter = () => setIsAutoScrolling(false)
    const handleMouseLeave = () => setIsAutoScrolling(true)

    const duplicatedColumns = [...columns.slice(1), ...columns.slice(1)]

    const visibleColumnKeys = duplicatedColumns.slice(currentColumnIndex, currentColumnIndex + visibleColumns)

    return (
        <>
            <Title title="Spot Market" label="Rate" />
            <Box sx={{ width: "100%", overflow: "hidden", display: 'flex', justifyContent: 'center' }}>
                <TableContainer
                    component={Paper}
                    ref={tableRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    sx={{
                        maxWidth: "100%",
                        overflow: "auto",
                        width: `${150 + visibleColumns * columnWidth}px`,
                        "&::-webkit-scrollbar": {
                            display: 'none',
                        },
                    }}
                >
                    <Table sx={{ minWidth: 1600 }} stickyHeader>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.key}
                                        sx={{
                                            backgroundColor: "#f8f9fa",
                                            fontWeight: 600,
                                            minWidth: column.key === "attribute" ? 150 : 180,
                                            position: column.key === "attribute" ? "sticky" : "static",
                                            left: column.key === "attribute" ? 0 : "auto",
                                            zIndex: column.key === "attribute" ? 10 : 1,
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {marketData.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell
                                        sx={{
                                            fontWeight: 600,
                                            backgroundColor: "#f8f9fa",
                                            position: "sticky",
                                            left: 0,
                                            zIndex: 9,
                                            minWidth: 150,
                                        }}
                                    >
                                        {row.attribute}
                                    </TableCell>
                                    {visibleColumnKeys.map((column) => (
                                        <TableCell
                                            key={column.key}
                                            sx={{
                                                backgroundColor: row.isHighlighted ? "secondary.main" : "white",
                                                color: row.isHighlighted ? "white" : "inherit",
                                                fontWeight: row.isHighlighted ? 600 : 400,
                                                minWidth: 180,
                                            }}
                                        >
                                            {row[column.key as keyof typeof row]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}