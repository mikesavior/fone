import React from 'react';
import { TableContainer } from '@mui/material';
import DriverStandings from './DriverStandings';
import RaceResults from './RaceResults';
import ConstructorStandings from './ConstructorStandings';
//wouldn't it be nice if there was a live timing endpoint?
// import LiveTiming from './LiveTiming';

function AppContainer({ children }) {
  return <TableContainer>{children}</TableContainer>
}

function App() {
  return (
    <AppContainer>
      <RaceResults />
      <DriverStandings />
      <ConstructorStandings />
      {/* <LiveTiming /> */}
    </AppContainer>
  );
}

export default App;