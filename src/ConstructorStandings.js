import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Collapse } from '@mui/material';
import SectionHeader from './SectionHeader';

function StandingsContainer({ children }) {
  return(<TableContainer>{children}</TableContainer>);
}

function ConstructorStandings() {
  const [constructorStandings, setConstructorStandings] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchConstructorStandings = async () => {
      const data = await fetch('https://ergast.com/api/f1/current/constructorStandings.json');
      const jsonData = await data.json();
      setConstructorStandings(jsonData.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
    };
    fetchConstructorStandings();
  }, []);

  return (
    <StandingsContainer>
      <SectionHeader title="Constructor's Point Rankings" onClick={() => setOpen(!open)} />
      <Collapse in={open} timeout="auto" unmountOnExit>
        <TableContainer>
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
        </TableContainer>
      </Collapse>
    </StandingsContainer>
  );
}

export default ConstructorStandings;
