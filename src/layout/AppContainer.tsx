import { Box, CssBaseline, ThemeProvider, useTheme } from '@mui/material';
import React, { Suspense } from 'react';
import baseTheme from '../../src/themes/theme'
import Footer from './Footer';
import Content from './Content';
import Header from './Header';
import { useLocation } from 'react-router-dom';
import Email from '../component/Email';

function App() {
  const theme = useTheme();
  const location = useLocation()

  const hideLayoutRoutes = ['/login']

  const hideLayout = hideLayoutRoutes.includes(location.pathname)


  // const [drawerOpen, setDrawerOpen] = React.useState(false);
  // const [footerLinks, setFooterLinks] = React.useState<Record<LinksLabel, string>>({
  //   'discord': '#', 'docs': '#', 'medium': '#', 'privacyPolicy': '#',
  //   'telegram': '#', 'twitter': '#', 'terms': '#'
  // })

  return (
    <React.Fragment>
      <Box sx={{ bgcolor: theme.palette.background.default }}>
        <React.Fragment>
          <Box sx={{ minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Suspense>
              <CssBaseline />
              {!hideLayout && <Header />}
              <Box component="main" sx={{ flex: 1 }}>
                <Content />
              </Box>
              {!hideLayout && <Email />}
              {!hideLayout && <Footer />}
            </Suspense>
          </Box>
        </React.Fragment>
      </Box>
    </React.Fragment>
  )
}

export const AppContainer = () => {
  return (
    baseTheme &&
    <ThemeProvider theme={baseTheme}>
      <App />
    </ThemeProvider >
  )
}

