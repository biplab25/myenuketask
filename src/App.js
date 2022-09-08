import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function App() {

  const [list, setList] = useState([]);
  const [loading , setLoading]=useState(false);
  React.useEffect(() => {
    fetch(
      "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo"
    )
      .then((results) => results.json())
      .then((data) => {
        //console.log(data["Time Series (5min)"]);

        //datas.push(data["Time Series (5min)"]);
        const arrayOfObj = Object.entries(
          data["Time Series (5min)"]
        ).map((e) => ({ [e[0]]: e[1] }));
        //console.log("datas", arrayOfObj);
        setList(arrayOfObj);
        setLoading(true);
      });
  }, []);

  console.log('list', list);

  return (
    <div className="App">
      {/* {list?.map((el,i) => {
       // console.log(el[Object.keys(el)[0]]['1. open']);
        //console.log(Object.keys(Object.keys(el)[0]).forEach((prop)=> console.log(prop)));
        return <h1 key={Object.keys(el)}>{Object.keys(el)[ "1. open" ]}</h1>;
      })} */}
      {loading?
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead >
            <TableRow>
              <StyledTableCell>DateTime</StyledTableCell>
              <StyledTableCell align="right">Open</StyledTableCell>
              <StyledTableCell align="right">High</StyledTableCell>
              <StyledTableCell align="right">low</StyledTableCell>
              <StyledTableCell align="right">Close</StyledTableCell>
              <StyledTableCell align="right">Volume</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list?.map((el) => (
              <StyledTableRow key={Object.keys(el)[0]}>
                <StyledTableCell component="th" scope="row">
                  {Object.keys(el)[0]}
                </StyledTableCell>
                <StyledTableCell align="right">{el[Object.keys(el)[0]]['1. open']}</StyledTableCell>
                <StyledTableCell align="right">{el[Object.keys(el)[0]]['2. high']}</StyledTableCell>
                <StyledTableCell align="right">{el[Object.keys(el)[0]]['3. low']}</StyledTableCell>
                <StyledTableCell align="right">{el[Object.keys(el)[0]]['3. low']}</StyledTableCell>
                <StyledTableCell align="right">{el[Object.keys(el)[0]]['4. close']}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      :
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
        
      >
        <CircularProgress color="inherit" />
      </Backdrop>
  }
    </div>
  );
}

export default App;
