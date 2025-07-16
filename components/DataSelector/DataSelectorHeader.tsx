'use client';

import React from 'react';
import { FormControl, InputLabel, useTheme, Typography, Box } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import styles from './DataSelectorHeader.module.css';

const DataSelectorHeader: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (isMobile) {
    return (
      <Box sx={{ 
        p: 2, 
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        mb: 2,
      }}>
        <Typography variant="h6" sx={{ mb: 2, color: theme.palette.text.primary }}>
          Data Fields
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          Add and configure your data fields below
        </Typography>
      </Box>
    );
  }

  return (
    <div className={styles.container}>
      <FormControl 
        variant="outlined" 
        sx={{ 
          flex: 1,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: theme.palette.divider,
            },
            '&:hover fieldset': {
              borderColor: theme.palette.primary.main,
            },
          },
        }}
      >
        <InputLabel>Data Type</InputLabel>
      </FormControl>
      <FormControl 
        variant="outlined" 
        sx={{ 
          flex: 1,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: theme.palette.divider,
            },
            '&:hover fieldset': {
              borderColor: theme.palette.primary.main,
            },
          },
        }}
      >
        <InputLabel>Field Name</InputLabel>
      </FormControl>
      <div className={styles.deleteIconSpacer} data-testid="delete-icon-spacer"></div>
    </div>
  );
};

export default DataSelectorHeader;