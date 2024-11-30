import React, { useState, useEffect, useCallback, memo } from 'react';
import { Card, CardContent, Typography, Collapse } from '@mui/material';
import SectionHeader from './SectionHeader';

const RaceSummary = memo(() => {
  const [raceSummary, setRaceSummary] = useState(null);
  const [open, setOpen] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isSubscribed = true;
    const controller = new AbortController();
    
    const fetchRaceSummary = async () => {
      if (!isSubscribed) return;
      
      setIsLoading(true);
      
      try {
        const response = await fetch('https://hook.us2.make.com/dundcc7czifay72xjd8s5xruyku8uq1e', {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache'
          },
          method: 'GET'
        });
        if (!response.ok) {
          throw new Error('Failed to fetch race summary');
        }
        
        const data = await response.json();
        console.log('API Response:', data);
        const summaryText = data?.data?.raceSummary;
        
        if (!summaryText) {
          throw new Error('No race summary found in response');
        }
        
        if (isSubscribed) {
          setRaceSummary(summaryText);
          setError(null);
        }
      } catch (err) {
        if (isSubscribed) {
          setError(`Error: ${err.message}`);
          setRaceSummary(null);
        }
      } finally {
        if (isSubscribed) {
          setIsLoading(false);
        }
      }
    };

    fetchRaceSummary();

    return () => {
      isSubscribed = false;
      controller.abort();
    };
  }, []);

  const handleClick = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  return (
    <>
      <SectionHeader title="Race Summary" onClick={handleClick} open={open} />
      <Collapse in={open}>
        <Card>
          <CardContent>
            {error ? (
              <Typography color="error">{error}</Typography>
            ) : isLoading ? (
              <Typography>Loading race summary...</Typography>
            ) : raceSummary ? (
              <Typography 
                variant="body1" 
                sx={{ 
                  whiteSpace: 'pre-wrap',
                  lineHeight: 1.6,
                  padding: 1
                }}
              >
                {raceSummary}
              </Typography>
            ) : (
              <Typography>No race summary available</Typography>
            )}
          </CardContent>
        </Card>
      </Collapse>
    </>
  );
});

export default RaceSummary;
