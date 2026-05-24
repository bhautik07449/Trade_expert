import { Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export const PageNotFound = () => {
  return (
    <Grid sx={{ height: '90vh', justifyContent: 'center', margin: 'auto', alignItems: 'center' }} container direction={'column'}>
      <Grid>
        <Typography variant='h2'>404 </Typography>
      </Grid>
      <Grid>
        <Typography variant='h3'>Page Not Found</Typography>
      </Grid>
      <Grid sx={{ mt: 3 }}>
        <Typography variant='h5'>Sorry, we couldn't find this page. Click this link to return to <Link to="/">Dashbaord</Link>.</Typography>
      </Grid>
    </Grid>
  )
}
