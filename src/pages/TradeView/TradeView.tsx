import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  InputAdornment,
  Stack
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import GavelIcon from '@mui/icons-material/Gavel';
import PageMainLayout from '../../commonUI/PageMainLayout';
import SupplierTab from '../../component/SupplierTab';

export default function TradeView() {

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

      <SupplierTab />

      <Box
        sx={{
          maxWidth: "1400px !important",
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 6, md: 10 },
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
            <Button
              variant="outlined"
              startIcon={<GavelIcon />}
              sx={{ minWidth: 160, color: 'text.primary', borderColor: 'divider' }}
            >
              Trade-law
            </Button>
            <TextField
              fullWidth
              size="medium"
              placeholder="Search..."
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
              Will come soon.
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
