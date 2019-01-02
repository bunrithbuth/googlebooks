import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

class Books extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    search: ""
  };

  saveBook = (title,author,description,link,image) => {
    API.saveBook({
      title: title,
      author: author,
      description: description,
      link: link,
      image: image
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value, search: value
    });
  };

  handleSearch = event => {
    event.preventDefault();
    const q = this.state.search.replace(' ','+')
    console.log(event)
    console.log(q)
    API.getBooks(q)
      .then(res => {
        let books = []
        res.data.forEach(element => {
          books.push({
            title: element.volumeInfo.title,
            authors: element.volumeInfo.authors ? element.volumeInfo.authors.join(', ') : "",
            description: element.volumeInfo.description ? element.volumeInfo.description : "",
            link: element.volumeInfo.infoLink,
            image: (element.volumeInfo.imageLinks) ? element.volumeInfo.imageLinks.thumbnail : ""
          })
        })
        this.setState({ books: books })
      })
      .catch(err => console.log(err))
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Search Books: </h1>
              <form>
                  <Input
                    value={this.state.title}
                    onChange={this.handleInputChange}
                    name="title"
                    placeholder="Title (required)"
                  />
                  <button
                    disabled={!(this.state.title)}
                    onClick={this.handleSearch}
                    className="btn btn-dark"style={{float: 'right'}}
                  >
                    Submit Book
                  </button>
              </form>
            </Jumbotron>
          </Col>
        </Row>
          <Col size="md-12 sm-12">
              <h1>Results:</h1>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <a>
                    <a style={{fontSize: '32px', fontWeight: '700'}}>{book.title}</a>
                    <button onClick={() => this.saveBook(book.title, book.authors, book.description, book.link, book.image)} className="btn" style={{marginLeft: '5px', float: 'right', backgroundColor: 'rgb(235, 104, 100)', color: 'white'}}>Save Book</button>
                    <a href={book.link}><button className="btn btn-dark" style={{marginRight: '5px', float: 'right'}}>GoogleBooks</button></a>
                    </a>
                    <List>
                      <ListItem>
                        <strong>Author(s): </strong> {book.authors ? book.authors : 'Not Available'}
                      </ListItem>
                      <ListItem>
                      <strong>Description: </strong> {book.description ? book.description : 'Not Available'}
                      </ListItem>
                      <ListItem>
                        {book.image ? <img src={book.image} /> :'Image Not Available'}
                      </ListItem>
                    </List>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col> 
      </Container>
    );
  }
}

export default Books;
