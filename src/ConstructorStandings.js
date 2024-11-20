import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function StandingsContainer({ children }) {
  return <TableContainer>{children}</TableContainer>
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
      <h1 style={{textAlign: 'center'}}>Constructor's Standings</h1>
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