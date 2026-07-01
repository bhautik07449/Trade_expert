import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

export default function TradeGrievance() {
  return (
    <Box>
      <Paper elevation={0} sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h6" align="center" fontWeight="bold" sx={{ textTransform: 'uppercase', borderBottom: '2px solid', borderColor: 'primary.main', display: 'block', pb: 0.5, mx: 'auto', width: 'fit-content' }}>
          Trade Grievance
        </Typography>
      </Paper>

      <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2, mb: 4, width: '100%' }}>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell rowSpan={2} sx={{ minWidth: 200, fontWeight: 'bold', borderRight: '1px solid', borderColor: 'divider', textAlign: 'center', p: 3 }}>
                <Typography variant="h6" fontWeight="bold">Threshold</Typography>
              </TableCell>
              <TableCell sx={{ minWidth: 200, borderRight: '1px solid', borderColor: 'divider', fontWeight: 'bold' }}>15000 & above</TableCell>
              <TableCell sx={{ minWidth: 200, borderRight: '1px solid', borderColor: 'divider', fontWeight: 'bold' }}>ITBP</TableCell>
              <TableCell sx={{ minWidth: 200 }}></TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ borderRight: '1px solid', borderColor: 'divider', fontWeight: 'bold' }}>
                15000 & below
                <Typography variant="caption" display="block" color="text.secondary">Limit/Item</Typography>
              </TableCell>
              <TableCell sx={{ borderRight: '1px solid', borderColor: 'divider', fontWeight: 'bold' }}>
                BSF
                <Typography variant="caption" display="block" color="text.secondary">(Organization)</Typography>
              </TableCell>
              <TableCell sx={{ minWidth: 200 }}></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: 'grey.100' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', borderRight: '1px solid', borderColor: 'divider', width: '20%' }}>Stage</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Activities to be done.</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{ borderRight: '1px solid', borderColor: 'divider', verticalAlign: 'top', textAlign: 'center', py: 3 }}>
                <Typography fontWeight="bold" color="primary">(1)</Typography>
                <Typography>Describ</Typography>
              </TableCell>
              <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center', py: 3 }}>
                <Typography>Just Information</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ borderRight: '1px solid', borderColor: 'divider', verticalAlign: 'top', textAlign: 'center', py: 3 }}>
                <Typography fontWeight="bold" color="primary">(2)</Typography>
                <Typography>Doc</Typography>
              </TableCell>
              <TableCell sx={{ verticalAlign: 'middle', p: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  {[1, 2, 3, 4].map((_,index) => (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, width: '100%', justifyContent: 'center' }} key={index}>
                      <Typography fontWeight="bold" color="primary">(A)</Typography>
                      <Typography sx={{ p: 3 }}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus corporis doloremque, asperiores ea temporibus eum reiciendis dolore vero beatae dignissimos officia? Ipsam error tempora quod autem dolor dicta. Provident, tempora.</Typography>
                    </Box>
                  ))}
                </Box>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ borderRight: '1px solid', borderColor: 'divider', verticalAlign: 'top', textAlign: 'center', py: 3 }}>
                <Typography fontWeight="bold" color="primary">(3)</Typography>
                <Typography>Track.</Typography>
              </TableCell>
              <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center', p: 3 }}>
                <Typography fontWeight="bold" sx={{ mb: 3 }}>Progress Tracker</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
                  {['A', 'B', 'C', 'D', 'E', 'F'].map((step, idx) => (
                    <React.Fragment key={step}>
                      <Box sx={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid', borderColor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'primary.main', fontWeight: 'bold' }}>
                        {step}
                      </Box>
                      {idx < 5 && (
                        <Typography color="text.secondary" sx={{ mx: 1 }}>&#8594;</Typography>
                      )}
                    </React.Fragment>
                  ))}
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
