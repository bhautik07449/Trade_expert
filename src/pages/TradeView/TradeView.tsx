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
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
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
          <Typography variant="h4" fontWeight="bold" sx={{ color: 'secondary.main', textTransform: 'uppercase', mb: 1 }}>
            Trade Bureau.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 1 }}>
            <Typography variant="subtitle1" fontWeight="500" sx={{ borderBottom: '1px solid', borderColor: 'primary.main', display: 'inline-block' }}>
              Engineered for Efficiency
            </Typography>
            <Typography variant="subtitle1" fontWeight="500" sx={{ borderBottom: '1px solid', borderColor: 'primary.main', display: 'inline-block' }}>
              Executed for Proficiency
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary" fontStyle="italic">
            'Powered' by Consolidated Components.
          </Typography>
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
          {activeTab === 'Trade Controller' ? (
            <Box>
              <Paper
                elevation={0}
                sx={{
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" align="center" fontWeight="bold" sx={{ mb: 4, textTransform: 'uppercase', borderBottom: '2px solid', borderColor: 'primary.main', display: 'inline-block', pb: 0.5, mx: 'auto', width: 'fit-content' }}>
                  Trade Finder
                </Typography>
              </Paper>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" mb={4}>
                <Typography fontWeight="bold" sx={{ whiteSpace: 'nowrap' }}>
                  Enter HSN Code -
                </Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  sx={{ minWidth: 200, bgcolor: 'white' }}
                />
                <Typography fontWeight="bold" sx={{ color: 'text.secondary' }}>
                  or
                </Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  placeholder="Description"
                  sx={{ flex: 1, minWidth: 200, bgcolor: 'white' }}
                />
                <Button variant="outlined" sx={{ minWidth: 'auto', p: 1 }}>
                  <SearchIcon />
                </Button>
                <Button variant="outlined" sx={{ minWidth: 'auto', p: 1, fontWeight: 'bold' }}>
                  RESET
                </Button>
              </Stack>

              <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
                <Table>
                  <TableHead sx={{ bgcolor: 'grey.100' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold', borderRight: '1px solid', borderColor: 'divider' }}>SR No</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', borderRight: '1px solid', borderColor: 'divider' }}>HSN Code</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', borderRight: '1px solid', borderColor: 'divider' }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', borderRight: '1px solid', borderColor: 'divider' }}></TableCell>
                      <TableCell sx={{ fontWeight: 'bold', borderRight: '1px solid', borderColor: 'divider' }}>Country Selector</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[1, 2, 3].map((row) => (
                      <TableRow key={row}>
                        <TableCell sx={{ borderRight: '1px solid', borderColor: 'divider', verticalAlign: 'top' }}>
                          {row}
                        </TableCell>
                        <TableCell sx={{ borderRight: '1px solid', borderColor: 'divider', verticalAlign: 'top' }}>
                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            CAR124
                          </Box>
                        </TableCell>
                        <TableCell sx={{ borderRight: '1px solid', borderColor: 'divider', verticalAlign: 'top' }}>
                          <Typography variant="body2" fontWeight="500">Main Name</Typography>
                        </TableCell>
                        <TableCell sx={{ borderRight: '1px solid', borderColor: 'divider', verticalAlign: 'top' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <Typography variant="caption" color="text.secondary">CAR12433</Typography>
                            </Box>
                            <Typography variant="body2">Description</Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ borderRight: '1px solid', borderColor: 'divider', verticalAlign: 'top' }}>
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Select size="small" defaultValue="" sx={{ minWidth: 100, height: 32, mb: 1 }}>
                              <MenuItem value=""><em>Select</em></MenuItem>
                            </Select>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ verticalAlign: 'top' }}>
                          <Stack spacing={1}>
                            <Button variant="contained" size="small" sx={{ borderRadius: 6, textTransform: 'none' }}>Import</Button>
                            <Typography variant="caption" align="center">or</Typography>
                            <Button variant="outlined" size="small" sx={{ borderRadius: 6, textTransform: 'none' }}>Export</Button>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ) : (
            <Box>
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
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
}
