import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 100,
  lineHeight: '25px',
}));


const lightTheme = createTheme({ palette: { mode: 'light' } });

export default function PaperElevation() {
  return (
    <Grid container spacing={2}>
      {[lightTheme].map((theme, index) => (
        <Grid item xs={6} key={index}>
          <ThemeProvider theme={theme}>
            <Box
              sx={{
                p: 2,
                bgcolor: 'background.default',
                display: 'grid',
                gridTemplateColumns: { md: '1fr 1fr' },
                gap: 2,
              }}
            >
              
                <Item  elevation={5}>
                <Typography  style={{color:"#1c0c4f" ,paddingTop:"10px"}} variant="h5" gutterBottom>
      Total Sales
    </Typography>
                  <h2> 21234</h2>
                </Item>
                <Item  elevation={5}>
                <Typography  style={{color:"#1c0c4f", paddingTop:"10px"}} variant="h5" gutterBottom>
      Total Income
    </Typography>
                  <h2> Rs 6174754</h2>
                </Item>
            
            </Box>
          </ThemeProvider>
        </Grid>
      ))}
    </Grid>
  );
}