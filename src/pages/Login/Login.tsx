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
export default function LoginForm() {
  const navigate = useNavigate()
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
      await new Promise((r) => setTimeout(r, 600))
      // console.log("[v0] Logged in with:", { email })
    } finally {
      setSubmitting(false)
    }
  }

  function goToSignup() {
    setFlipExit(true)
    setTimeout(() => {
      navigate("/sign-up")
    }, 250)
  }

  return (
    <Box
      component="section"
      aria-label="Login section"
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
          maxWidth: 420,
          p: 4,
          borderRadius: 3,
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          animation: `${flipExit ? flipOut : flipIn} ${flipExit ? "250ms" : "500ms"} ease`,
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Welcome back
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Sign in to continue
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
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
            autoComplete="current-password"
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
          />

          <Button type="submit" variant="contained" color="primary" disabled={submitting} fullWidth sx={{ mt: 2 }}>
            {submitting ? "Signing in..." : "Sign In"}
          </Button>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2">
              {"Don't have an account? "}
              <Button onClick={goToSignup} size="small">
                Create one
              </Button>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}
