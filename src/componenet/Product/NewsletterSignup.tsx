"use client"

import * as React from "react"
import { Paper, Box, TextField, Button, Typography, Stack } from "@mui/material"
import SendRoundedIcon from "@mui/icons-material/SendRounded"

export default function NewsletterSignup() {
  const [email, setEmail] = React.useState("")
  const [sent, setSent] = React.useState(false)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert("Please enter a valid email.")
    setSent(true)
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "primary.light",
      }}
      aria-label="Newsletter signup"
    >
      <form onSubmit={onSubmit}>
        <Stack direction={{ xs: "column", md: "row" }} alignItems="center" spacing={2}>
          <Typography variant="h6" component="p" sx={{ m: 0, fontWeight: 700, color: "primary.dark" }}>
            Newsletter Signup
          </Typography>
          <Box sx={{ flex: 1, width: "100%" }}>
            <TextField
              fullWidth
              size="medium"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
              sx={{ bgcolor: "#ffffff" }}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            endIcon={<SendRoundedIcon />}
            sx={{ px: 3, fontWeight: 700 }}
          >
            {sent ? "Subscribed" : "Subscribe"}
          </Button>
        </Stack>
      </form>
    </Paper>
  )
}
