import { Box, Button, Paper, Stack } from "@mui/material";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InlineEnquiryForm from "../Form/InlineEnquiryForm";
import InlineSampleForm from "../Form/InlineSampleForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";

type ActiveTab = "inquiry" | "sample";

export default function CtaButtons({ product }: any) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("inquiry");
  const navigate = useNavigate();

  const selectedCountry = useSelector(
    (state: RootState) => state.country.selectedCountry
  );

  const productData = {
    name: product?.name,
    description: product?.description,
    images: product?.images?.[0],
    id: product?.id,
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Button
          variant={activeTab === "inquiry" ? "contained" : "outlined"}
          color="primary"
          startIcon={<QuestionAnswerOutlinedIcon />}
          sx={{
            px: 3,
            fontWeight: 700,
            minHeight: 44,
          }}
          onClick={() => setActiveTab("inquiry")}
        >
          Inquiry Now
        </Button>

        <Button
          variant={activeTab === "sample" ? "contained" : "outlined"}
          color="secondary"
          startIcon={<ScienceOutlinedIcon />}
          sx={{
            px: 3,
            fontWeight: 700,
            minHeight: 44,
          }}
          onClick={() => setActiveTab("sample")}
        >
          Request Sample
        </Button>

        <Button
          variant="contained"
          color="success"
          startIcon={<LocalOfferOutlinedIcon />}
          sx={{
            px: 3,
            fontWeight: 700,
            minHeight: 44,
          }}
          onClick={() => navigate(`/trade-offers?country=${selectedCountry}`)}
        >
          Trade Deal
        </Button>
      </Stack>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        {activeTab === "inquiry" && (
          <InlineEnquiryForm product={productData} />
        )}

        {activeTab === "sample" && (
          <InlineSampleForm product={productData} />
        )}
      </Paper>
    </Box>
  );
}