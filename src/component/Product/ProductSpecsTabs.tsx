"use client"

import * as React from "react"
import { Box, Tabs, Tab, Table, TableBody, TableRow, TableCell, Paper } from "@mui/material"

type SpecItem = { label: string; value: string }
type Specs = Record<string, SpecItem[]>

export default function ProductSpecsTabs({ specs }: { specs: Specs }) {
  const keys = Object.keys(specs)
  const [tab, setTab] = React.useState(0)

  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "auto", // Ensure horizontal scrolling for smaller screens
      }}
    >
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        aria-label="Product specifications tabs"
        textColor="primary"
        indicatorColor="primary"
        variant="scrollable" // Make tabs scrollable for mobile view
        scrollButtons="auto"
        sx={{
          "& .MuiTab-root": { textTransform: "none", fontWeight: 600 },
        }}
      >
        {keys.map((k) => (
          <Tab key={k} label={k} id={`spec-tab-${k}`} aria-controls={`spec-panel-${k}`} />
        ))}
      </Tabs>

      <Paper
        variant="outlined"
        sx={{
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderColor: "divider",
          mt: -0.25,
          overflowX: "auto", // Ensure table content is scrollable horizontally
        }}
      >
        <Table size="small" aria-label={`${keys[tab]} table`}>
          <TableBody>
            {specs[keys[tab]].map((row, idx) => (
              <TableRow key={idx} sx={{ "&:last-child td": { border: 0 } }}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    width: { xs: "50%", md: "35%" }, // Adjust width for mobile view
                    fontWeight: 600,
                    bgcolor: "background.paper",
                  }}
                >
                  {row.label}
                </TableCell>
                <TableCell>{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  )
}
