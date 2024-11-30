import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Collapse } from '@mui/material';
import SectionHeader from './SectionHeader';

function ResultsContainer({ children }) {
  return(<TableContainer>{children}</TableContainer>);
}

function RaceResults() {
  const [raceResults, setRaceResults] = useState([]);
  const [raceVenue, setRaceVenue] = useState('');
  const [open, setOpen] = useState(true);

  useEffect(() => {
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
      <SectionHeader title={`Previous Race Standings (${raceVenue})`} onClick={() => setOpen(!open)}/>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Table table-layout="fixed">
          <TableHead>
            <TableRow >
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
      </Collapse>
    </ResultsContainer>
  );
}

export default RaceResults;
