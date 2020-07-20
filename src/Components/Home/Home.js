import React, { Component } from 'react';
import './Home.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = theme => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

const headers = [
  { id: "title", label: 'Title', minWidth: 100 }, 
  { id: 'subtitle', label: 'Subtitle', minWidth: 100 },
  { id: 'author', label: 'Auther', minWidth: 100 },
  { id: 'published', label: 'Published On', minWidth: 100 },
  { id: 'publisher', label: 'Publisher', minWidth: 100 },
  { id: 'pages', label: 'No. Of Pages', minWidth: 100 }
];

class Home extends Component {
  constructor() {
    super();
    this.state = {
      page: 0,
      rowsPerPage: 10,
      columns: headers,
      rows: []
    }
  }
  
   componentDidMount() {
     axios.get("http://localhost:3000/books").then((response) => {
        this.setState({rows : [...this.state.rows, ...response.data]});
     });
   }
  
   handleChangePage = (event, newPage) => {
    this.setState({page: newPage}); 
  };

  handleChangeRowsPerPage = (event) => {
   
     this.setState({rowsPerPage: +event.target.value});
    this.setState({page: 0});
  };

  render() {
    const {handleChangePage, handleChangeRowsPerPage } = this;
    const { classes } = this.props; 

    let {page, rowsPerPage, columns, rows} = this.state;

    return(
      <div>
        <Header />
        <Container className="home-container" maxWidth="lg">
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                    <TableCell>Action     </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, key) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={key}>
                        {columns.map((column) => {
                          const value = row[column.id];

                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number' ? column.format(value) : value}
                            </TableCell>
                          );
                        })}
                        <TableCell><button>Edit</button><button>Delete</button></TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        </Container>
        <Footer />
      </div>
      );
  }
}

export default withStyles(useStyles)(Home);