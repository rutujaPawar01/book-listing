import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import {Link} from "react-router-dom";
import './Header.css';
import TextField from '@material-ui/core/TextField';

function Header() {
    return(
            <Container className="menu" maxWidth="lg">
                <Grid className="header-item" item md={12}>
                    <Link className="menu-item" to="/">Home</Link>
                    <Link className="menu-item" to="/add">Add</Link>
                </Grid>
                <Grid  className="site-title" item md={12}>
                    <h2>Welcome to Book Listing App</h2>
                </Grid>
                <Grid className="header-item" item md={12}>
                    <TextField label="Search Here" variant="outlined" />
                </Grid>
            </Container>
        );
}

export default Header;