import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import { List, ListItem } from "../components/List";
import API from "../utils/API";

class Saved extends Component {
  state = {
    books: []
  };
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount() {
    API.saveBooks()
      .then(res => {console.log(res.data); this.setState({ books: res.data })})
      .catch(err => console.log(err));
  }

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => {
        console.log(res.data); 
        API.saveBooks()
        .then(res => {console.log(res.data); this.setState({ books: res.data })})
        .catch(err => console.log(err));}
      )
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
        <Col size="md-12 sm-12">
              <h1>Saved Books: {this.state.books.length} </h1>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <a>
                    <a style={{fontSize: '32px', fontWeight: '700'}}>{book.title}</a>
                    <button onClick={() => this.deleteBook(book._id)} className="btn" style={{marginLeft: '5px', float: 'right', backgroundColor: 'rgb(235, 104, 100)', color: 'white'}}>Delete Book</button>
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
        </Row>
      </Container>
    );
  }
}

export default Saved;
