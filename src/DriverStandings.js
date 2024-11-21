import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';

function DriverStandingsContainer({ children }) {
  return(<TableContainer>{children}</TableContainer>);
}

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
    <DriverStandingsContainer>
      {/* <h1 style={{ textAlign: 'center' }}>Drivers' Standings</h1> */}
      <AppBar position="static" sx={{ borderRadius: 6, backgroundColor: 'slategray'}}>
        <Toolbar>
          <Typography variant="h4" sx={{ backgroundColor: 'slategray', color: 'lightgray', textAlign: 'center', flexGrow: 1 }}>Drivers' Point Rankings</Typography>
        </Toolbar>
      </AppBar>
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
    </DriverStandingsContainer>
  );
}

export default DriverStandings;