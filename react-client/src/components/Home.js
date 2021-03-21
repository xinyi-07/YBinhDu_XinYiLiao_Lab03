
import { withRouter } from 'react-router-dom';

import React, { Component } from 'react';

function Home(props) {


    return (
        <div>
            <h1>This is the Homepage!</h1>
            <h3> Express - React with CRUD Operations</h3>
            <p>React front-end calls Express REST API to add,
            list, update, or delete a student</p>
        </div>
    );

}

export default withRouter(Home);