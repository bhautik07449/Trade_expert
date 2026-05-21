import * as React from "react"
import { Box, Paper, Tabs, Tab, Typography, useTheme, useMediaQuery } from "@mui/material"
import { getImageUrl } from "../../utils/imageUtils"

export default function CertificationPanel({ product }: any) {
  const [tab, setTab] = React.useState(0)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const seasonalIsImage = (val: any) => {
    if (!val) return false
    if (typeof val === "string") return val.startsWith("http") || val.match(/\.(jpeg|jpg|gif|png|webp)$/i)
    return false
  }

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
              src={getImageUrl(product?.certification)}
              alt="Certification logo"
              sx={{
                width: { xs: 160, sm: 260, md: 360 },
                height: { xs: 120, sm: 220, md: 360 },
                maxWidth: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
        )}

        {tab === 1 && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {seasonalIsImage(product?.seasonalChart) ? (
              <Box
                component="img"
                src={getImageUrl(product?.seasonalChart)}
                alt="Seasonal Chart"
                sx={{
                  width: { xs: "100%", sm: 500 },
                  height: { xs: 200, sm: "auto" },
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
              />
            ) : (
              <Typography variant="body2" color="text.secondary">
                {product?.seasonalChart || "No seasonal chart available."}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Paper>
  )
}