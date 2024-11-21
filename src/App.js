import React from 'react';
import { TableContainer } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import DriverStandings from './DriverStandings';
import RaceResults from './RaceResults';
import ConstructorStandings from './ConstructorStandings';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid, Card, CardContent, Typography } from '@mui/material';
//wouldn't it be nice if there was a live timing endpoint?
// import LiveTiming from './LiveTiming';

const darkTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#333',
    },
    secondary: {
      main: '#666',
    },
    background: {
      default: '#444',
      paper: 'lightgray',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <div style={{ backgroundColor: 'teal', minHeight: '100vh', padding: 30 }}>
        <AppBar position="static" sx={{ borderTopLeftRadius: 6, borderTopRightRadius: 6 }}>
          <Toolbar>
            <Typography variant="h4" textAlign="center">Formula 1 Standings and Results</Typography>
          </Toolbar>
        </AppBar>
        <Grid container spacing={2}>
          <Grid item xs={15}>
            <Card>
              <CardContent>
                <RaceResults />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <DriverStandings />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <ConstructorStandings />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}
export default App;