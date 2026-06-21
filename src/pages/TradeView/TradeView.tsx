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
  const tabs = [
    'Trade Controller',
    'Trade Regulator',
    'Trade Compliance',
    'Trade Laws',
    'Trade Grievance'
  ];

  const [activeTab, setActiveTab] = useState<string>(tabs[0]);

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

      <Box
        sx={{
          maxWidth: "1400px !important",
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4 },
          pb: { xs: 6, md: 10 },
          position: "relative",
          zIndex: 2,
          mt: -5
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Tabs
            value={activeTab}
            onChange={(_, value: string) => setActiveTab(value)}
            variant="scrollable"
            scrollButtons={true}
            allowScrollButtonsMobile
            TabIndicatorProps={{ sx: { display: "none" } }}
            sx={{
              minHeight: "auto",

              "& .MuiTabs-flexContainer": {
                gap: 1.2,
                justifyContent: "flex-start",
              },

              "& .MuiTabs-scrollButtons": {
                color: "primary.main",
                width: 40,
                borderRadius: 2,
                "&.Mui-disabled": {
                  opacity: 0.3,
                },
              },

              "& .MuiTab-root": {
                minHeight: "auto",
                minWidth: "auto",
                px: { xs: 1.8, sm: 2.5 },
                py: 1,
                borderRadius: 99,
                textTransform: "none",
                fontWeight: 800,
                color: "text.secondary",
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
                transition: "all 0.3s ease",
              },

              "& .MuiTab-root:hover": {
                color: "primary.dark",
                borderColor: "primary.main",
                bgcolor: "primary.light",
              },

              "& .Mui-selected": {
                color: "#fff !important",
                bgcolor: "primary.main",
                borderColor: "primary.main",
                boxShadow: "0 8px 20px rgba(59, 48, 39, 0.16)",
              },
            }}
          >
            {tabs.map((item) => (
              <Tab
                key={item}
                label={item}
                value={item}
              />
            ))}
          </Tabs>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'white',
            boxShadow: "0 8px 24px rgba(59, 48, 39, 0.04)",
          }}
        >
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={6}>
            <TextField
              fullWidth
              size="medium"
              placeholder={`Search in ${activeTab}...`}
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
              sx={{ minWidth: 120, borderRadius: 2, fontWeight: 600 }}
            >
              Search
            </Button>
          </Stack>

          <Box
            sx={{
              py: 10,
              textAlign: 'center',
              bgcolor: '#f8fafc',
              borderRadius: 3,
              border: '2px dashed',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h5" color="text.secondary" fontWeight={600}>
              {activeTab} content will come soon.
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
