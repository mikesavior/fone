import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function SectionHeader({ title, onClick, open }) {
  return (
    <AppBar position="static" sx={{ borderRadius: 2, backgroundColor: 'slategray', marginTop: 2 }}>
      <Toolbar onClick={onClick} sx={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ backgroundColor: 'slategray', color: 'lightgray', textAlign: 'center', flexGrow: 1 }}>
          {title}
        </Typography>
        <IconButton sx={{ color: 'lightgray' }}>
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default SectionHeader;
