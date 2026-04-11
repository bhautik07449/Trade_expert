import { Stack, Button } from "@mui/material"
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined"
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined"
import { useState } from "react"
import InquiryDialog from "../Dialog/inquiry-dialog"
import EnquiryDialog from "../Dialog/enquiry-dialog"

export default function CtaButtons({ product }: any) {
  const [open, setOpen] = useState(false)
  const [openEnquiry, setOpenEnquiry] = useState(false)

  return (
    <>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<QuestionAnswerOutlinedIcon />}
          sx={{ px: 3, fontWeight: 600 }}
          onClick={() => setOpenEnquiry(true)}
        >
          Inquiry Now
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<ScienceOutlinedIcon />}
          sx={{ px: 3, fontWeight: 600 }}
          onClick={() => setOpen(true)}
        >
          Request Sample
        </Button>
      </Stack>

      <InquiryDialog
        open={open}
        onClose={() => setOpen(false)}
        product={{
          name: product?.name,
          description: product?.description,
          images: product?.images[0],
          id: product?.id
        }}
      />

      <EnquiryDialog
        open={openEnquiry}
        onClose={() => setOpenEnquiry(false)}
        product={{
          name: product?.name,
          description: product?.description,
          images: product?.images[0],
          id: product?.id
        }}
      />
    </>
  )
}
