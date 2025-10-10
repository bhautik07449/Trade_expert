"use client"

import * as React from "react"
import { keyframes } from "@mui/material/styles"
import { Box, Paper, Typography, TextField, InputAdornment, IconButton, Button } from "@mui/material"
import EmailIcon from "@mui/icons-material/Email"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import LockIcon from "@mui/icons-material/Lock"
import { useNavigate } from "react-router-dom"

const flipIn = keyframes`
  from {
    transform: rotateY(-90deg);
    opacity: 0;
  }
  to {
    transform: rotateY(0);
    opacity: 1;
  }
`

const flipOut = keyframes`
  from {
    transform: rotateY(0);
    opacity: 1;
  }
  to {
    transform: rotateY(90deg);
    opacity: 0;
  }
`
export default function SignupForm() {
  const navigate = useNavigate()
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [submitting, setSubmitting] = React.useState(false)
  const [flipExit, setFlipExit] = React.useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    try {
      // TODO: Wire up to your auth API
      await new Promise((r) => setTimeout(r, 700))
      // console.log("[v0] Signed up with:", { name, email })
    } finally {
      setSubmitting(false)
    }
  }

  function goToLogin() {
    setFlipExit(true)
    setTimeout(() => {
      navigate("/login")
    }, 250)
  }

  return (
    <Box
      component="section"
      aria-label="Sign up section"
      sx={{
        perspective: "1200px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: "100%",
          maxWidth: 480,
          p: 4,
          borderRadius: 3,
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          animation: `${flipExit ? flipOut : flipIn} ${flipExit ? "250ms" : "500ms"} ease`,
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Create your account
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Join us in seconds
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Full name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((s) => !s)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            helperText="Use at least 8 characters"
          />

          <Button type="submit" variant="contained" color="primary" disabled={submitting} fullWidth sx={{ mt: 2 }}>
            {submitting ? "Creating account..." : "Sign Up"}
          </Button>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2">
              Already have an account?{" "}
              <Button onClick={goToLogin} size="small">
                Sign in
              </Button>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}
