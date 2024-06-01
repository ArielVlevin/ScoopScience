import React from 'react';
import Button from '@mui/material/Button';

interface FilterButtonProps {
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isSelected: boolean;
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, onClick, isSelected }) => {
  return (
    <Button
      aria-controls={`${label.toLowerCase()}-menu`}
      aria-haspopup="true"
      onClick={onClick}
      sx={{ borderTop: isSelected ? '2px solid #000' : 'none' }}
    >
      {label}
    </Button>
  );
};


export default FilterButton;
