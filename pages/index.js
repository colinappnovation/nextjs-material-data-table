import fetch from 'isomorphic-unfetch';
import Link from 'next/link'
import React from 'react'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';

import { Button, Chip} from '@material-ui/core';
import dayjs, { Dayjs } from 'dayjs';


const Index = ({ objectives }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);    
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <h1>Your Objectives in one accessible place!</h1>
      <p>Authoritatively leverage existing one-to-one intellectual capital vis-a-vis progressive process improvements. Dynamically leverage other's visionary supply chains without 24/7 content. Quickly monetize excellent channels whereas ubiquitous materials. Completely provide access to effective scenarios whereas user-centric initiatives. Interactively build prospective channels before premium collaboration and idea-sharing.

Continually.</p>
      {/* <ul>
        {objectives.map(objective => (
          <li key={objective.id}>
            <Link href="/p/[id]" as={`/p/${objective.id}`}>
              <a>{objective.title}</a>
            </Link>
          </li>
        ))}
      </ul> */}

  <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Created</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Deadline</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {objectives.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                <Link href="/p/[id]" as={`/p/${row.id}`} >
                  <a>{row.title}</a>
                  </Link>
              </TableCell>
              <TableCell align="right">{dayjs(row.created).format('DD/MM/YYYY')}</TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{dayjs(row.deadline).format('MMMM YYYY')}</TableCell>
              <TableCell align="right"><Chip label={row.status} color={row.status == 'Cancelled' ? "secondary" : "primary"} /></TableCell>
              <TableCell align="right">
                <Link href="/p/[id]" as={`/p/${row.id}`}>
                  <Button variant="contained" color="primary">View</Button>
              </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15, { label: 'All', value: -1 }]}
              colSpan={3}
              count={objectives.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>


    </>);
}


  Index.getInitialProps = async function() {
    const res = await fetch('http://localhost:3001/objectives?_limit=100');
    const data = await res.json();
  
    console.log(`Show data fetched. Count: ${data.length}`);
  
    return {
      objectives: data,
    };
  };
  
  export default Index;