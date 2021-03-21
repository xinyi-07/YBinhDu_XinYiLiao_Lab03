import React, { useState, useEffect } from 'react';
//import ReactDOM from 'react-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
//
import View from './View'
//
function App(props) {
  //state variable for the screen, admin or student
  const { setIsLogIn } = props
  const [screen, setScreen] = useState('auth');
  //store input field data, student Number and password
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const apiUrl = "http://localhost:3000/signin";
  //send student email and password to the server
  // for initial authentication
  const auth = async () => {
    console.log('calling auth')
    console.log(email)
    try {
      //make a get request to /authenticate end-point on the server
      const loginData = { auth: { email, password } }
      //call api
      const res = await axios.post(apiUrl, loginData);
      console.log(res.data.auth)
      console.log(res.data.screen)
      //process the response
      if (res.data.screen !== undefined) {
        sessionStorage.setItem('email', res.data.screen);
        sessionStorage.setItem('studentNumber', res.data.studentNumber);
        setScreen(res.data.screen);
        setIsLogIn(true);
      }
    } catch (e) { //print the error
      console.log(e);
    }

  };

  //check if the student already logged-in
  const readCookie = async () => {
    try {
      console.log('--- in readCookie function ---');

      //
      const res = await axios.get('/read_cookie');
      // 
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);

        console.log(res.data.screen)
      }
    } catch (e) {
      setScreen('auth');
      console.log(e);
    }
  };
  //runs the first time the view is rendered
  //to check if student is signed in
  useEffect(() => {
    readCookie();
    setScreen((document.cookie).includes("token") ? sessionStorage.getItem("email") : "auth");
  }, [setScreen]); //only the first render
  //
  return (
    <div>
      {screen === 'auth'
        ? <div>
          <Jumbotron>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' name='email' id='email' onChange={(e) => setEmail(e.target.value)} ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' name='password' id='password' onChange={(e) => setPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Button variant='primary' type='submit' onClick={auth}> Log In </Button>
          </Jumbotron>
        </div>
        : <View screen={screen} setScreen={setScreen} />
      }
    </div>
  );
}

export default App;

