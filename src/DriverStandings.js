import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function StandingsContainer({ children }) {
  return <TableContainer>{children}</TableContainer>
}

function DriverStandings() {
  const [driverStandings, setDriverStandings] = React.useState([]);

  React.useEffect(() => {
    const fetchDriverStandings = async () => {
      const data = await fetch('https://ergast.com/api/f1/current/driverStandings.json');
      const jsonData = await data.json();
      setDriverStandings(jsonData.MRData.StandingsTable.StandingsLists[0].DriverStandings);
    };
    fetchDriverStandings();
  }, []);

  return (
    <StandingsContainer>
      <h1 style={{textAlign: 'center'}}>Drivers' Standings</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Position</TableCell>
            <TableCell>Driver</TableCell>
            <TableCell>Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {driverStandings.map((driver, driverId) => (
            <TableRow key={driverId}>
              <TableCell>{driver.position}</TableCell>
              <TableCell>{driver.Driver.givenName} {driver.Driver.familyName}</TableCell>
              <TableCell>{driver.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StandingsContainer>
  );
}

export default DriverStandings;