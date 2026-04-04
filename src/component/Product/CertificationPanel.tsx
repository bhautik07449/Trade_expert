import * as React from "react"
import { Box, Paper, Tabs, Tab, Typography, useTheme, useMediaQuery } from "@mui/material"

export default function CertificationPanel({ product }: any) {
  const [tab, setTab] = React.useState(0)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  return (
    <Paper
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        minHeight: 200,
      }}
    >
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        orientation={isMobile ? "horizontal" : "vertical"}
        variant="scrollable"
        textColor="primary"
        indicatorColor="primary"
        sx={{
          minWidth: isMobile ? "100%" : 180,
          bgcolor: "primary.light",
          "& .MuiTab-root": {
            alignItems: "flex-start",
            color: "primary.dark",
            fontWeight: 700,
            textTransform: "none",
          },
        }}
      >
        <Tab label="Product Certification" />
        <Tab label="Seasonal Chart" />
      </Tabs>

      <Box sx={{ p: { xs: 2, md: 3 }, flex: 1 }}>
        {tab === 0 && (
          <Box display="flex" justifyContent="center">
            <Box
              component="img"
              src={product?.certification}
              alt="Certification logo"
              sx={{
                width: { xs: 200, sm: 400 },
                height: { xs: 200, sm: 400 },
                objectFit: "contain",
              }}
            />
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