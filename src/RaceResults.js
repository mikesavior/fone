import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { alignProperty } from '@mui/material/styles/cssUtils';

function ResultsContainer({ children }) {
  return <TableContainer>{children}</TableContainer>
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
      <h1 style={{textAlign: 'center'}}>Last Race's Driver Standings ({raceVenue})</h1>
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
          {raceResults.map((result) => (
            <TableRow key={result.number}>
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