import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';

const IngredientsTable = () => {
  return (
   
   <Box display="flex" justifyContent="center">
       <Box mt={2} width="80%"> 
    <TableContainer component={Paper} >
      <Table aria-label="ingredients table">
        <TableHead>
          <TableRow>
            <TableCell>Ingredient</TableCell>
            <TableCell align="right">Weight (g)</TableCell>
            <TableCell align="right">Amount (%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Milk(2%)</TableCell>
            <TableCell align="right">350.0</TableCell>
            <TableCell align="right">34.97</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Cream(40%)</TableCell>
            <TableCell align="right">350.0</TableCell>
            <TableCell align="right">34.97</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Skim milk powder</TableCell>
            <TableCell align="right">40.0</TableCell>
            <TableCell align="right">4.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Sucrose</TableCell>
            <TableCell align="right">160.0</TableCell>
            <TableCell align="right">15.98</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Dextrose</TableCell>
            <TableCell align="right">40.0</TableCell>
            <TableCell align="right">4.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Egg yolk</TableCell>
            <TableCell align="right">60.0</TableCell>
            <TableCell align="right">5.99</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Stabilizer</TableCell>
            <TableCell align="right">1.0</TableCell>
            <TableCell align="right">0.10</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </Box>

    </Box>
  );
};

export default IngredientsTable;
