import CreateCourse from './CreateCourse';
import ListCourses from './ListCourses'
import React, { useState } from 'react';
//
import axios from 'axios';
//
function View(props) {
  // read the info from props, coming from the ancestor component
  const { screen, setScreen } = props;
  // return a stateful value and funcion to update it
  const [data, setData] = useState();
  //
  const [course, setCourse] = useState('');
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
  const listCourses = () => {
    console.log('in listCourses: ')
    setCourse('y')
  }
  //
  const createCourse = () => {
    console.log('in CreateCourse')
    setCourse('x')

  }

  return (
    <div className="App">
      {(course === 'x')
        ? <CreateCourse screen={screen} setScreen={setScreen} />
        : (course === 'y')
          ? <ListCourses screen={screen} setScreen={setScreen} />
          :
          <div>
            <p>You are logged in using student number <b>{screen}</b></p>
            <p>{data}</p>
            <button onClick={verifyCookie}>Verify Cookie</button>
            <button onClick={createCourse}>Create Course</button>
            <button onClick={listCourses}>List Courses</button>
            <button onClick={deleteCookie}>Log out</button>
          </div>
      }
    </div>
  );
}

//
export default View;