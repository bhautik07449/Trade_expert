"use client"

import * as React from "react"
import { Box, Tabs, Tab, Table, TableBody, TableRow, TableCell, Paper } from "@mui/material"

type SpecItem = { label: string; value: string }
type Specs = Record<string, SpecItem[]>

export default function ProductSpecsTabs({ specs }: { specs: Specs }) {
  const keys = Object.keys(specs)
  const [tab, setTab] = React.useState(0)

  return (
    <Box>
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        aria-label="Product specifications tabs"
        textColor="primary"
        indicatorColor="primary"
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
        }}
      >
        <Table size="small" aria-label={`${keys[tab]} table`}>
          <TableBody>
            {specs[keys[tab]].map((row, idx) => (
              <TableRow key={idx} sx={{ "&:last-child td": { border: 0 } }}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ width: "35%", fontWeight: 600, bgcolor: "background.paper" }}
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
