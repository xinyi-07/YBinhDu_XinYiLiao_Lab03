import CreateCourse from './CreateCourse';
import ListCoursesByStudent from './ListCoursesByStudent'
import React, { useState } from 'react';
//
import axios from 'axios';
import { withRouter } from 'react-router-dom';
//
function View(props) {
  const studentNumber = sessionStorage.getItem('studentNumber');
  // read the info from props, coming from the ancestor component
  const { screen, setScreen } = props;
  // return a stateful value and funcion to update it
  const [data, setData] = useState();
  //
  const [course, setCourse] = useState('all');
  // called when user clicks on Logout button
  // to clear the cookie and set the screen state variable 

  // back to its initial state.
  const deleteCookie = async () => {
    try {
      await axios.get('/signout');
      setScreen('auth');
    } catch (e) {
      console.log(e);
    }
  };
  // called when user clicks on Get Data button
  // end-point demonstrates another example for the use
  // of cookie specific response from the server.
  const verifyCookie = async () => {
    try {
      const res = await axios.get('/welcome');
      console.log(res.data)
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  }
  //
  const listCoursesByStudent = (studentNumber) => {
    console.log('in listCourseByStudent: ')
    props.history.push('/listCoursesByStudent/' + studentNumber)
  }
  //
  const createCourse = () => {
    console.log('in CreateCourse')
    setCourse('courseList')

  }


  return (
    <div className="App">
      {course === 'courseList' ? (
        <CreateCourse studentNumber={studentNumber} screen={screen} setScreen={setScreen} />
      ) : (
        <div>
          <p>Welcome <b>{screen}</b>! </p>
          <p>You have logged in successfully. </p>
          <p>{data}</p>
          <button onClick={verifyCookie}>Verify Cookie</button>
          <button onClick={createCourse}>Create Course</button>
          <button onClick={() => listCoursesByStudent(studentNumber)}>View my Courses</button>
          <button onClick={deleteCookie}>Log out</button>
        </div>
      )
      }
    </div>
  );
}

//
export default withRouter(View);