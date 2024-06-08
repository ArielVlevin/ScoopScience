
import React from 'react';
import MenuItem from '@mui/material/MenuItem';

interface MenuItemsProps {
  options: Array<number | string>;
  onClick: (value: any) => void;
}

const MenuItems: React.FC<MenuItemsProps> = ({ options, onClick }) => {
  return (
    <>
      {options.map((option) => (
        <MenuItem key={option} onClick={() => onClick(option)}>
          {option === 0 || option === '' ? 'All' : option}
        </MenuItem>
      ))}
    </>
  );
};

export default MenuItems;

