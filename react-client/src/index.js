import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
/*
import List from './components/List';
import Edit from './components/Edit';
import Create from './components/Create';
import Show from './components/Show';
import Home from './components/Home';
import Login from './components/Login';
*/
//
ReactDOM.render(<App />, document.getElementById('root'));
/*
<Router>
        <div>
            <Route render ={()=> < App />} path="/" />
            <Route render ={()=> < Home />} path="/home" />
            <Route render ={()=> < Login />} path="/login" />
            <Route render ={()=> < List />} path="/list" />
            <Route render ={()=> < Edit />} path="/edit/:id" />
            <Route render ={()=> < Create />} path="/create" />
            <Route render ={()=> < Show />} path="/show/:id" />
        </div>
    </Router>, document.getElementById('root'));
*/

