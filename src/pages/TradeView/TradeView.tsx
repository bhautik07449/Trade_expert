import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  InputAdornment,
  Stack,
  Tabs,
  Tab
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PageMainLayout from '../../commonUI/PageMainLayout';

export default function TradeView() {
  const [activeTab, setActiveTab] = useState<any>();

  const tabs = [
    'Trade Controller',
    'Trade Regulator',
    'Trade Compliance',
    'Trade Laws',
    'Trade Grievance'
  ];

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        minHeight: "100vh"
      }}
    >
      <PageMainLayout
        title="Trade View"
        image="https://sourceseas.itcoders.in/img/front-end/quality.jpg"
        slug="trade_view"
        activeCountry=""
        setActiveCountry={() => { }}
      />

      <Tabs
        value={activeTab || false}
        onChange={(_, value: string) => setActiveTab(value)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        aria-label="subcategory tabs"
        sx={{
          minHeight: 52,

          "& .MuiTabs-scroller": {
            overflowX: "auto !important",
            overflowY: "hidden",
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          },

          "& .MuiTabs-indicator": {
            display: "none",
          },

          "& .MuiTabs-flexContainer": {
            gap: 1,
            justifyContent: {
              xs: "flex-start",
              md: "center",
            },
            flexWrap: "nowrap",
          },

          "& .MuiTabs-scrollButtons": {
            color: "secondary.main",
            width: 34,
            "&.Mui-disabled": {
              opacity: 0.25,
            },
          },

          "& .MuiTab-root": {
            minHeight: 44,
            minWidth: "auto",
            px: { xs: 2.2, sm: 3 },
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 700,
            color: "text.secondary",
            border: "1px solid",
            borderColor: "divider",
            whiteSpace: "nowrap",
            flexShrink: 0,
          },

          "& .MuiTab-root:hover": {
            bgcolor: "primary.light",
            color: "secondary.dark",
          },

          "& .Mui-selected": {
            bgcolor: "primary.main",
            color: "#fff !important",
            borderColor: "primary.main",
          },
        }}
      >
        {(Array.isArray(tabs) ? tabs : []).map((item) => (
          <Tab
            key={item}
            label={item}
            value={item}
          />
        ))}
      </Tabs>

      <Box
        sx={{
          maxWidth: "1400px !important",
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4 },
          pb: { xs: 6, md: 10 },
          position: "relative",
          zIndex: 2,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'white',
          }}
        >
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={6}>
            <TextField
              fullWidth
              size="medium"
              placeholder={`Search in ${tabs[activeTab]}...`}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              size="large"
              sx={{ minWidth: 120 }}
            >
              Search
            </Button>
          </Stack>

          <Box
            sx={{
              py: 8,
              textAlign: 'center',
              bgcolor: '#f1f5f9',
              borderRadius: 3,
              border: '2px dashed',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h5" color="text.secondary" fontWeight={600}>
              {tabs[activeTab]} content will come soon.
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
