import * as React from "react"
import { Box, Paper, Tabs, Tab, Typography } from "@mui/material"

export default function CertificationPanel({ product }: any) {
  const [tab, setTab] = React.useState(0)
  return (
    <Paper variant="outlined" sx={{ display: "flex", minHeight: 200 }}>
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        orientation="vertical"
        textColor="primary"
        indicatorColor="primary"
        sx={{
          minWidth: 180,
          bgcolor: "primary.light",
          "& .MuiTab-root": {
            alignItems: "flex-start",
            color: "primary.dark",
            fontWeight: 700,
            textTransform: "none",
          },
          "& .Mui-selected": { color: "primary.dark" },
        }}
        aria-label="Side tabs"
      >
        <Tab label="Product Certification" id="cert-tab-0" />
        <Tab label="Seasonal Chart" id="cert-tab-1" />
      </Tabs>

      <Box sx={{ p: 2.5, flex: 1 }}>
        {tab === 0 && (
          <Box display="flex" alignItems="center" gap={2}>
            <Box
              component="img"
              src="/apeda-certification-logo.jpg"
              alt="Certification logo"
              sx={{ width: 90, height: 90, objectFit: "contain", borderRadius: 1 }}
            />
            <Typography variant="body2" color="text.secondary">
              Certified export quality. Documentation available upon request.
            </Typography>
          </Box>
        )}
        {tab === 1 && (
          <Typography variant="body2" color="text.secondary">
            {product?.seasonalChart}
          </Typography>
        )}
      </Box>
    </Paper>
  )
}
