import React, { Component } from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Container } from '@material-ui/core';
import axios from 'axios';
import './Edit.css';

class Edit extends Component {
    constructor() {
        super();
        this.state = {
            redirect: null,
            bookInfo : {
                title : '',
                subtitle : '',
                author : '',
                published : '',
                publisher : '',
                pages : ''
            },
            validation: {
                author: true
            }
        }
    }
    
    validation = (name, value) => {
        let regex = /^[A-Za-z\s]+$/;
        let result = regex.test(value);

        if (name === 'author'){
            if (!result) {
                this.setState((state) => ({
                    validation: {
                        ...state.validation,
                        author: false
                    }
                }));
            } else {
                this.setState((state) => ({
                    validation: {
                        ...state.validation,
                        author: true
                    }
                }));
            }
        }

        if (name === 'title'){
            if (!result) {
                this.setState((state) => ({
                    validation: {
                        ...state.validation,
                        title: false
                    }
                }));
            } else {
                this.setState((state) => ({
                    validation: {
                        ...state.validation,
                        title: true
                    }
                }));
            }
        }
    }

    onChangeInput = (event, name) => {
        if(event && event.target && event.target.value ) {
            
            const value = event.target.value;

            this.validation(name, value);

            this.setState( (state) => ({
                bookInfo: {
                    ...state.bookInfo,
                     [name]: value
                    }
            }));
        } else{
            this.setState( (state) => ({
                bookInfo: {
                    ...state.bookInfo,
                     [name]: ''
                    },
                validation: {
                    ...state.validation,
                    [name]: false
                }                
            }));
        }
    }


    updateBookInfo = (event) => {
        event.preventDefault();

        let id = this.props.match.params.id;

        axios.put(`http://localhost:3000/books/${id}`, this.state.bookInfo)
        .then((response)=> {
            alert(`${response.data.title} Saved. Thanks!`); 
            this.setState({redirect: '/'});
        })
        .catch((error)=>{
            alert('Error');
        });
    }

    componentDidMount() {
        let id = this.props.match.params.id;

        axios.get(`http://localhost:3000/books/${id}`)
        .then((response) => {
            this.setState((prevState)=> {
                return {
                    ...prevState, bookInfo: {...prevState.bookInfo, ...response.data}
                }
            });
        })

    }

    resetBookInfo() {
        let id = this.props.match.params.id;

        axios.get(`http://localhost:3000/books/${id}`)
        .then((response) => {
            this.setState((prevState)=> {
                return {
                    ...prevState, bookInfo: {...prevState.bookInfo, ...response.data}
                }
            });
        })

    }

    cancel = (event) => {
        this.setState({redirect: '/'}); 
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
                            />
                            {!this.state.validation.title && (<p className='valmsg'>Please enter valid title Name</p>)}
                            <br></br>

                            <label htmlFor="subName">Subtitle</label><br></br>
                            <input 
                                type="text" 
                                id="subName" 
                                name="subName" 
                                value={this.state.bookInfo.subtitle}
                                onChange={(event) => this.onChangeInput(event, "subtitle")}
                                /><br></br>

                            <label htmlFor="bAuther">Author :</label><br></br>
                            <input 
                                type="text" 
                                id="bAuther" 
                                name="bAuther" 
                                value={this.state.bookInfo.author} 
                                onChange={(event) => this.onChangeInput(event, "author")}
                            />  
                            {!this.state.validation.author && (<p className='valmsg'>Please enter valid author Name</p>)}
                            <br></br>

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

                            <button type="submit" onClick={(event) => this.updateBookInfo(event)}>Save</button>
                            <button type="button" onClick={(event) => this.resetBookInfo(event)}>Reset Info</button>
                            <button type="button" onClick={(event) => this.cancel(event)}>Cancel</button>


                        </form>
                    </Container>
                <Footer />
            </div>
        );
    }
}

export default withRouter(Edit);