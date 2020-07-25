import React, { Component } from 'react';
import './Home.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Grid from '@material-ui/core/Grid';
import { Container, Tooltip } from '@material-ui/core';
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
import { Redirect } from 'react-router-dom';
// import Icon from 'import @material-ui/icons/Edit';
import { AccessAlarm, ThreeDRotation, DeleteTwoTone, Edit } from '@material-ui/icons';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';





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
    this.deleteID = '';
    this.state = {
      showDialogueBox: false,
      search: '',
      redirect: null,
      page: 0,
      rowsPerPage: 10,
      columns: headers,
      rows: [],
      duplicate: []
    }
  }

setSearch = (userInput) => {
  this.setState({search: userInput});
  const searchResult = this.state.duplicate.filter((book )=> book.title.toLowerCase().includes(userInput.toLowerCase())
        || book.subtitle.toLowerCase().includes(userInput.toLowerCase())
        || book.author.toLowerCase().includes(userInput.toLowerCase())
        );
  this.setState({rows: [...searchResult]})
}
  
  getBookInfo = () => {
    axios.get("http://localhost:3000/books").then((response) => {
        this.setState({rows : [...response.data], duplicate: [...response.data]});
     });
  }

   componentDidMount() {
     this.getBookInfo();
   }
  
   handleChangePage = (event, newPage) => {
    this.setState({page: newPage}); 
  };

  handleChangeRowsPerPage = (event) => {
     this.setState({rowsPerPage: +event.target.value});
    this.setState({page: 0});
  };

  edit = (event, id) => {
    this.setState({redirect: `/edit/${id}`}); 
  }

  handleDelete = (id) => {
    this.deleteID = id;
    this.setState({showDialogueBox: true});
  }

  handleCancel = () => {
    this.setState({showDialogueBox: false});
  }

  deleteBookInfo = (id) => {
    axios.delete(`http://localhost:3000/books/${id}`).then(() => {this.getBookInfo()}); 
    this.setState({showDialogueBox: false});
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
      
    const {handleChangePage, handleChangeRowsPerPage } = this;
    const { classes } = this.props;
    let {page, rowsPerPage, columns, rows} = this.state;

    return(
      <div className='booklist'>
        {this.state.showDialogueBox && (
        <Dialog className='dialog'
          disableBackdropClick
          enableEscapeKeyDown
          maxWidth="xs"
          aria-labelledby="confirmation-dialog-title"
          open={this.state.showDialogueBox}
          >
           <DialogTitle className='dialogTitle' >Warning!</DialogTitle>
          <DialogContent className='dialogContet' deviders>
            Are You Sure, You Want to Delete This Record?
          </DialogContent>  
          <DialogActions>
        <Button autoFocus className='cancel' onClick={this.handleCancel}>
          Cancel
        </Button>
        <Button className='ok' onClick={() => this.deleteBookInfo(this.deleteID)}>
          Ok
        </Button>
      </DialogActions>
        </Dialog>)}
        <Header setSearch={this.setSearch} />
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
                    <TableCell>Action</TableCell>
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
                        <TableCell >
                          <div className="action">
                            <Tooltip title="Edit">
                              <Edit className="editBook" onClick={(event) => this.edit(event,row.id)} >
                              </Edit>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <DeleteTwoTone className="deleteBook" onClick={(event)=> this.handleDelete(row.id)}>
                              </DeleteTwoTone> 
                            </Tooltip>
                          </div> 
                        </TableCell>
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