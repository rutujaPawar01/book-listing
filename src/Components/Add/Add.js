import React, { Component } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Add extends Component {
    constructor() {
        super();
        this.state = {
            bookInfo : {
                title : '',
                subtitle : '',
                author : '',
                published : '',
                publisher : '',
                pages : ''
            }
        }
    }

    submitBookInfo = (event) => {
        event.preventDefault();

        axios.post('http://localhost:3000/books', this.state.bookInfo)
        .then((response)=> {
            if(response.status===201) {
                alert(`${response.data.title} Saved. Thanks!`); 
                this.setState({redirect: '/'});
            }
        }).catch((error)=>{
            console.log(error);
        });
    }

    onChangeInput = (event, name) => {
        if(event && event.target && event.target.value ) {
            const value = event.target.value;

            this.setState( (state) => ({
                bookInfo: {
                    ...state.bookInfo,
                     [name]: value
                    }
            }));
        }
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
         }
        return(
            <div>
                <Header />
                    <Container>
                        <form>
                            <label htmlFor="bName">Title:</label><br></br>
                            <input 
                                type="text"
                                id="bName"
                                name="bname"
                                value={this.state.bookInfo.title}
                                onChange={(event) => this.onChangeInput(event, "title")}
                               /><br></br>

                            <label htmlFor="subName">Subtitle</label><br></br>
                            <input 
                                type="text" 
                                id="subName" 
                                name="subName" 
                                value={this.state.bookInfo.subtitle}
                                onChange={(event) => this.onChangeInput(event, "subtitle")}
                                /><br></br>

                            <label htmlFor="bAuther">Auther :</label><br></br>
                            <input 
                                type="text" 
                                id="bAuther" 
                                name="bAuther" 
                                value={this.state.bookInfo.author} 
                                onChange={(event) => this.onChangeInput(event, "author")}
                            /><br></br>

                            <label htmlFor="bPub">Published On:</label><br></br>
                            <input 
                                type="date" 
                                id="bPub" 
                                name="bPub" 
                                value={this.state.bookInfo.published}
                                onChange={(event) => this.onChangeInput(event, "published")}
                            /><br></br>

                            <label htmlFor="pubName">Publisher Name:</label><br></br>
                            <input 
                                type="text" 
                                id="pubName" 
                                name="pubName" 
                                value={this.state.bookInfo.publisher}
                                onChange={(event) => this.onChangeInput(event, "publisher")}
                            /><br></br>

                            <label htmlFor="bPages">Number of pages:</label><br></br>
                            <input 
                                type="Number" 
                                id="bPages" 
                                name="bPages" 
                                value={this.state.bookInfo.pages}
                                onChange={(event) => this.onChangeInput(event, "pages")}
                            /><br></br>

                            <button type="submit" onClick={(event) => this.submitBookInfo(event)}>Submit</button>
                        </form>
                    </Container>
                <Footer />
            </div>
        );
    }
}

export default Add;