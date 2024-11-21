import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from '@mui/material';

function DriverStandings() {
  const [driverStandings, setDriverStandings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDriverStandings = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetch('https://ergast.com/api/f1/current/driverStandings.json');
        const jsonData = await data.json();
        setDriverStandings(jsonData.MRData.StandingsTable.StandingsLists[0].DriverStandings);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDriverStandings();
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error fetching data: {error}</div>;
  }

  return (
    <TableContainer>
      <h1 style={{ textAlign: 'center' }}>Drivers' Standings</h1>
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
    </TableContainer>
  );
}

export default DriverStandings;