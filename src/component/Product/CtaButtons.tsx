import { Stack, Button } from "@mui/material"
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined"
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined"

export default function CtaButtons() {
  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<QuestionAnswerOutlinedIcon />}
        sx={{ px: 3, fontWeight: 600 }}
        onClick={() => alert("Inquiry sent!")}
      >
        Inquiry Now
      </Button>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<ScienceOutlinedIcon />}
        sx={{ px: 3, fontWeight: 600 }}
        onClick={() => alert("Sample request submitted!")}
      >
        Request Sample
      </Button>
    </Stack>
  )
}
