import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab
} from '@mui/material';
import PageMainLayout from '../../commonUI/PageMainLayout';
import TradeLaw from './TradeLaw';
import TradeGrievance from './TradeGrievance';
import TradeCompliance from './TradeCompliance';
import OtherTrades from './OtherTrades';

export default function TradeView() {
  const tabs = [
    'Trade Controller',
    'Trade Law',
    // 'Trade Arbitration',
    // 'Trade Compliance',
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
        title="Trade Bureau"
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
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="bold" sx={{ color: 'secondary.main', textTransform: 'uppercase', mb: 2 }}>
            Trade Bureau.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 2, md: 4 }, flexWrap: 'wrap', mb: 1 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ color: 'secondary.main', borderBottom: '1px solid', borderColor: 'primary.main', display: 'inline-block' }}>
              Engineered for Efficiency
            </Typography>
            <Typography variant="h6" fontWeight="bold" sx={{ color: 'secondary.main', borderBottom: '1px solid', borderColor: 'primary.main', display: 'inline-block' }}>
              Executed for Proficiency
            </Typography>
            <Typography variant="h6" fontWeight="bold" fontStyle="italic" sx={{ color: 'secondary.main', borderBottom: '1px solid', borderColor: 'primary.main', display: 'inline-block' }}>
              'Powered' by Consolidated Components.
            </Typography>
          </Box>
        </Box>
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
          {(activeTab === 'Trade Controller' || activeTab === 'Trade Arbitration' || activeTab === 'Trade Compliance') ? (
            <TradeCompliance activeTab={activeTab} />
          ) : activeTab === 'Trade Law' ? (
            <TradeLaw />
          ) : activeTab === 'Trade Grievance' ? (
            <TradeGrievance />
          ) : (
            <OtherTrades activeTab={activeTab} />
          )}
        </Paper>
      </Box>
    </Box>
  );
}