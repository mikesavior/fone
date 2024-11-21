import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';

function ResultsContainer({ children }) {
  return(<TableContainer>{children}</TableContainer>);
}

function RaceResults() {
  const [raceResults, setRaceResults] = React.useState([]);
  const [raceVenue, setRaceVenue] = React.useState([]);

  React.useEffect(() => {
    const fetchRaceResults = async () => {
      const data = await fetch('https://ergast.com/api/f1/current/last/results.json');
      const jsonData = await data.json();
      setRaceResults(jsonData.MRData.RaceTable.Races[0].Results);
      setRaceVenue(jsonData.MRData.RaceTable.Races[0].raceName);
    };
    fetchRaceResults();
  }, []);

  return (
    <ResultsContainer>
      <AppBar position="static" sx={{ borderRadius: 2, backgroundColor: 'slategray'}}>
        <Toolbar>
          <Typography variant="h4" sx={{ backgroundColor: 'slategray', color: 'lightgray', textAlign: 'center', flexGrow: 1 }}>Drivers' Standings ({raceVenue})</Typography>
        </Toolbar>
      </AppBar>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Position</TableCell>
            <TableCell>Driver</TableCell>
            <TableCell>Constructor</TableCell>
            <TableCell>Laps</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {raceResults.map((result, number) => (
            <TableRow key={number}>
              <TableCell>{result.position}</TableCell>
              <TableCell>{result.Driver.givenName} {result.Driver.familyName}</TableCell>
              <TableCell>{result.Constructor.name}</TableCell>
              <TableCell>{result.laps}</TableCell>
              <TableCell>{result.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ResultsContainer>
  );
}

export default RaceResults;