import * as React from "react"
import { Box, ImageList, ImageListItem, Paper, useTheme } from "@mui/material"

type Props = {
  images: string[]
  title: string
}

export default function ProductGallery({ images, title }: Props) {
  const [active, setActive] = React.useState(0)
  const theme = useTheme()

  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          mb: 1.5,
        }}
      >
        <Box
          component="img"
          src={images[active]}
          alt={`${title} image ${active + 1}`}
          sx={{
            width: "100%",
            height: { xs: 280, md: 350 },
            objectFit: "cover",
            borderRadius: 1.5,
          }}
        />
      </Paper>

      <ImageList cols={3} gap={8} sx={{ m: 0 }}>
        {images.map((src, idx) => (
          <ImageListItem key={idx} onClick={() => setActive(idx)} sx={{ cursor: "pointer" }}>
            <img
              src={src || "/placeholder.svg"}
              alt={`${title} thumbnail ${idx + 1}`}
              loading="lazy"
              style={{
                width: "100%",
                height: 90,
                objectFit: "cover",
                borderRadius: 8,
                border: idx === active ? `2px solid ${theme.palette.primary.dark}` : "1px solid rgba(0,0,0,0.08)",
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  )
}
