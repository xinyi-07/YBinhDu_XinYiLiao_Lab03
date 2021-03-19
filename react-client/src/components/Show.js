import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function Show(props) {
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/students/" + props.match.params.id;

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const editStudent = (id) => {
    props.history.push({
      pathname: '/edit/' + id
    });
  };

  const deleteStudent = (id) => {
    setShowLoading(true);
    const student = {
      studentNumber: data.studentNumber, password: data.password, firstName: data.firstName,
      lastName: data.lastName, address: data.address, city: data.city, phone: data.phone,
      email: data.email, program: data.program
    };

    axios.delete(apiUrl, student)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/list')
      }).catch((error) => setShowLoading(false));
  };

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>}
      <Jumbotron>
        <h1>Name: {data.firstName}, {data.lastName}</h1>
        <p><b>Email:</b> {data.email}</p>
        <p><b>Student Number:</b> {data.studentNumber}</p>

        <p>
          <Button type="button" variant="primary" onClick={() => { editStudent(data._id) }}>Edit</Button>&nbsp;
          <Button type="button" variant="danger" onClick={() => { deleteStudent(data._id) }}>Delete</Button>
        </p>
      </Jumbotron>
    </div>
  );
}

export default withRouter(Show);
