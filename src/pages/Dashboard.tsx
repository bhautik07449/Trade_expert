import React from 'react'
import ImageSlider from '../commonUI/ImageSlider'
import CardUi from '../commonUI/CardUi'
import SpotMarketTable from '../commonUI/spotMarket'
import InquiryDialog from '../component/Dialog/inquiry-dialog'
import OurView from '../component/Ourview'
import OurProcess from '../component/OurProcess'
import Values from '../component/Values'
import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material'
import EmailIcon from "@mui/icons-material/Email"
import AboutTestimonial from '../component/AboutTestimonial'

export const Dashboard = () => {
  const [open, setOpen] = React.useState(false)
  const [selectedProduct, setSelectedProduct] = React.useState<{
    name: string
    description?: string
    image?: string
  } | null>(null)

  return (
    <>
      <ImageSlider />
      <SpotMarketTable />
      <CardUi
        title='All Season'
        label='Availability'
        onEnquire={(product) => {
          setSelectedProduct({ name: product.name })
          setOpen(true)
        }}
        onRequestSample={(product) => {
          setSelectedProduct({ name: product.name })
          setOpen(true)
        }}
      />

      <CardUi
        title='Current'
        label='Season'
        onEnquire={(product) => {
          setSelectedProduct({ name: product.name })
          setOpen(true)
        }}
        onRequestSample={(product) => {
          setSelectedProduct({ name: product.name })
          setOpen(true)
        }}
      />

      <CardUi
        title='Upcoming'
        label='Season'
        onEnquire={(product) => {
          setSelectedProduct({ name: product.name })
          setOpen(true)
        }}
        onRequestSample={(product) => {
          setSelectedProduct({ name: product.name })
          setOpen(true)
        }}
      />
      <OurView />
      <OurProcess />
      <Values />
      {/* <AboutTestimonial /> */}
      <Box
        sx={{
          background:
            "linear-gradient(to right, #b7e3a1, #9ee37d)",
          py: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            maxWidth: "1150px",
            mx: "auto",
            px: 3,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 500,
              whiteSpace: "nowrap",
              color: "#1a1a1a",
            }}
          >
            NEWSLETTER SIGNUP
          </Typography>

          <TextField
            placeholder="Email"
            type="email"
            fullWidth
            size="small"
            sx={{
              backgroundColor: "#fff",
              borderRadius: 1,
            }}
          />

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#5bc0de",
              textTransform: "none",
              px: 3,
              py: 1,
              fontSize: "14px",
              whiteSpace: "nowrap",
              "&:hover": {
                backgroundColor: "#46b8da",
              },
            }}
          >
            Subscribe
          </Button>
        </Box>
      </Box>

      <InquiryDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={(data) => {
          console.log("[v0] Inquiry payload:", data)
          alert("Inquiry submitted! Check console for payload.")
        }}
        product={{
          name: selectedProduct?.name || "Flavoured Khakhra",
          description:
            selectedProduct?.description ||
            "Khakhra is a thin cracker common in the Gujarati and Rajasthani cuisines of western India...",
        }}
      />
    </>
  )
}
