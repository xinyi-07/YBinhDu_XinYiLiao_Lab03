import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import axios from 'axios';
//
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.css';
//
import CreateStudent from './components/CreateStudent';

import EditCourse from './components/EditCourse';

import List from './components/List';
import ListCourses from './components/ListCourses';

import Show from './components/Show';
import Home from './components/Home';
import Login from './components/Login';
import ShowCourse from './components/ShowCourse';

import ListCoursesByStudent from './components/ListCoursesByStudent';
import ListStudentsInCourse from './components/ListStudentsInCourse';
//
function App() {
  const [isLoginIn, setIsLogIn] = useState((document.cookie).includes("token"));

  useEffect(() => {
    setIsLogIn((document.cookie).includes("token"));
  }, [isLoginIn]);

  const clearLogin = async () => {
    const apiUrl = "/signout"
    const res = await axios.get(apiUrl);
    setIsLogIn(false);
    sessionStorage.clear();
    window.location.href = "/";
  };

  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">About</Nav.Link>
            <Nav.Link href="/list">List of All Students</Nav.Link>
            <Nav.Link href="/listcourses">List of All Courses</Nav.Link>
            {!isLoginIn ? <>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/create">Sign Up</Nav.Link>
            </> : <>
              <Nav.Link href="/login">Home</Nav.Link>
              <Nav.Link href="#" onClick={() => clearLogin()}>Logout</Nav.Link></>}

          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div>
        <Route render={() => < Home />} path="/home" />
        <Route render={() => < Login setIsLogIn={setIsLogIn} />} path="/login" />
        <Route render={() => < List />} path="/list" />
        <Route render={() => < ListCourses />} path="/listcourses" />
        <Route render={() => < CreateStudent />} path="/create" />
        <Route render={() => < Show />} path="/show/:id" />
        <Route render={() => < ShowCourse />} path="/showcourse/:id" />
        <Route render={() => < EditCourse />} path="/editcourse/:id" />
        <Route render={() => < ListCoursesByStudent />} path="/listCoursesByStudent/:studentNumber" />
        <Route render={() => < ListStudentsInCourse />} path="/listStudentsInCourse/:courseCode" />
      </div>

    </Router >


  );
}

//<Route render ={()=> < App />} path="/" />
export default App;
