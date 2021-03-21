
import { withRouter } from 'react-router-dom';

import React, { Component } from 'react';

function Home(props) {


    return (
        <div class="App">
            <h3> Express - React with CRUD Operations</h3>
            <p>React front-end calls Express REST API to add,
            list, update, or delete a course a student is taking</p>
            <br></br>
            <h3> About the Application!</h3>
            <p>1. This application allows students to signup, login, add/update/drop a course. <br></br>
                2. They can view the list of courses they are taking, the list of all the students,<br></br>
                the list of all the courses and the list of the students in a course.<br></br>
                3. The list of all students and courses are visible to everyone without having to login.<br></br>
                4. After a student signs in, they will be navigated to the Home page, where they will be able<br></br>
                to create/update/drop a course and also view the list of courses they are taking.<br></br>
                5. Only the student who created that course is allowed to update/drop it.
             </p>
        </div>
    );

}

export default withRouter(Home);