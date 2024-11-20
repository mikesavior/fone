import React from 'react';
import { TableContainer } from '@mui/material';
import DriverStandings from './DriverStandings';
import RaceResults from './RaceResults';
import ConstructorStandings from './ConstructorStandings';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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
      paper: '#555',
    },
  },
});

function AppContainer({ children }) {
  return <TableContainer>{children}</TableContainer>
}

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <AppContainer>
        <RaceResults />
        <DriverStandings />
        <ConstructorStandings />
        {/* <LiveTiming /> */}
      </AppContainer>
    </ThemeProvider>
    );
}

export default App;