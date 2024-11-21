import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';


function StandingsContainer({ children }) {
  return(<TableContainer>{children}</TableContainer>);
}

function ConstructorStandings() {
  const [constructorStandings, setConstructorStandings] = React.useState([]);

  React.useEffect(() => {
    const fetchConstructorStandings = async () => {
      const data = await fetch('https://ergast.com/api/f1/current/constructorStandings.json');
      const jsonData = await data.json();
      setConstructorStandings(jsonData.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
    };
    fetchConstructorStandings();
  }, []);

  return (
    <StandingsContainer>
      <AppBar position="static" sx={{ borderRadius: 6, backgroundColor: 'slategray'}}>
      <Toolbar>
          <Typography variant="h4" sx={{ backgroundColor: 'slategray', color: 'lightgray', textAlign: 'center', flexGrow: 1 }}>Constructor's Point Rankings</Typography>
        </Toolbar>
      </AppBar>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Position</TableCell>
            <TableCell>Constructor</TableCell>
            <TableCell>Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {constructorStandings.map((constructor, constructorId) => (
            <TableRow key={constructorId}>
              <TableCell>{constructor.position}</TableCell>
              <TableCell>{constructor.Constructor.name}</TableCell>
              <TableCell>{constructor.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StandingsContainer>
  );
}

export default ConstructorStandings;