import React from 'react';
import { FormControl, Select, MenuItem, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const SelectWrapper = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const Label = styled(Typography)(({ theme }) => ({
  color: '#002B5B',
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
  fontSize: '1rem',
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#fff',
    borderRadius: '4px',
    '& fieldset': {
      borderColor: '#e0e0e0',
    },
    '&:hover fieldset': {
      borderColor: '#002B5B',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#002B5B',
    },
  },
  '& .MuiSelect-select': {
    padding: '14px 16px',
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: '12px 16px',
  '&.Mui-selected': {
    backgroundColor: '#f5f5f5',
  },
  '&.Mui-selected:hover': {
    backgroundColor: '#e0e0e0',
  },
}));

const CourtSelector = ({ selectedCourt, onCourtChange }) => {
  const handleChange = (event) => {
    onCourtChange(event.target.value);
  };

  return (
    <SelectWrapper>
      <Label>CHOOSE YOUR COURT</Label>
      <StyledFormControl>
        <Select
          value={selectedCourt}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Filter, select court' }}
        >
          <StyledMenuItem value="">
            FILTER, SELECT COURT
          </StyledMenuItem>
          <StyledMenuItem value="HALF COURT 1">HALF COURT 1</StyledMenuItem>
          <StyledMenuItem value="HALF COURT 2">HALF COURT 2</StyledMenuItem>
          <StyledMenuItem value="FULL COURT">FULL COURT</StyledMenuItem>
          <StyledMenuItem value="SHOOTING BAY 1">SHOOTING BAY 1</StyledMenuItem>
          <StyledMenuItem value="SHOOTING BAY 2">SHOOTING BAY 2</StyledMenuItem>
        </Select>
      </StyledFormControl>
    </SelectWrapper>
  );
};

export default CourtSelector; 