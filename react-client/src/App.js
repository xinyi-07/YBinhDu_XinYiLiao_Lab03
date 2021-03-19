import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
//
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.css';
//
import CreateStudent from './components/CreateStudent';

import EditStudent from './components/EditStudent';
import EditCourse from './components/EditCourse';

import List from './components/List';
import ListCourses from './components/ListCourses';

import Show from './components/Show';
import Home from './components/Home';
import Login from './components/Login';
import ShowCourse from './components/ShowCourse';
//
function App() {

  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/list">List of All Students</Nav.Link>
            <Nav.Link href="/listcourses">List of All Courses</Nav.Link>
            <Nav.Link href="/create">Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div>

        <Route render={() => < Home />} path="/home" />
        <Route render={() => < Login />} path="/login" />
        <Route render={() => < List />} path="/list" />
        <Route render={() => < ListCourses />} path="/listcourses" />
        <Route render={() => < CreateStudent />} path="/create" />
        <Route render={() => < EditStudent />} path="/edit/:id" />
        <Route render={() => < Show />} path="/show/:id" />
        <Route render={() => < ShowCourse />} path="/showcourse/:id" />
        <Route render={() => < EditCourse />} path="/editcourse/:id" />
      </div>

    </Router>


  );
}

//<Route render ={()=> < App />} path="/" />
export default App;
