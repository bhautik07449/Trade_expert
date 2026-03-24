import { Box, Container, Grid, Link, Typography } from '@mui/material';

const Footer = () => {
  return (
    <>
      <Box
        component="footer"
        sx={{
          bgcolor: 'secondary.dark',
          color: 'common.white',
          py: 6,
          mt: 8,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Information Section */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Information
              </Typography>
              <Box component="nav" sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, color: 'text.disabled' }}>
                <Link href="#" underline="hover" color="inherit">About Us</Link>
                <Link href="#" underline="hover" color="inherit">Delivery Info</Link>
                <Link href="#" underline="hover" color="inherit">Privacy Policy</Link>
                <Link href="#" underline="hover" color="inherit">Terms & Conditions</Link>
                <Link href="#" underline="hover" color="inherit">Site Map</Link>
              </Box>
            </Grid>

            {/* Policy Section */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Policy & Terms
              </Typography>
              <Box component="nav" sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, color: 'text.disabled' }}>
                <Link href="#" underline="hover" color="inherit">Terms of Use</Link>
                <Link href="#" underline="hover" color="inherit">Disclaimer</Link>
                <Link href="#" underline="hover" color="inherit">Tradology</Link>
                <Link href="#" underline="hover" color="inherit">How to Pay</Link>
                <Link href="/credit-account" underline="hover" color="inherit">Credit Account Form</Link>
              </Box>
            </Grid>

            {/* Contact Section */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Get in Touch
              </Typography>
              <Typography sx={{ py: 2 }}>
                Sourceseas Overseas Pvt. Ltd.
              </Typography>
              <Box sx={{ color: 'text.disabled' }}>
                Registered Office
                <br />
                C-604, Shree Nidhi Residency
                <br />
                Nr. Sudamachowk, Satellite Road,
                <br />
                Mota Varachha, Surat(Guj), India - 3940101
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box textAlign="center" sx={{ bgcolor: 'secondary.main', p: 3, color: 'white' }}>
        {/* <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
            Concept designed and maintained by - TDS (the_digital_salon)
          </Typography> */}
        <Typography variant="body2">
          © 2025 All rights reserved by Sourceseas Overseas Private Limited
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
