import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import Login from './Login';

function ListCourses(props) {
    const [data, setData] = useState([]);
    const [showLoading, setShowLoading] = useState(true);
    const apiUrl = "http://localhost:3000/api/courses";

    useEffect(() => {
        const fetchData = async () => {
            axios.get(apiUrl)
                .then(result => {
                    console.log('result.data:', result.data)
                    //check if the user has logged in
                    //if(result.data.screen !== 'auth')
                    //{

                    console.log('data in if:', result.data)
                    setData(result.data);
                    setShowLoading(false);
                    //}
                }).catch((error) => {
                    console.log('error in fetchData:', error)
                });
        };
        fetchData();
    }, []);

    const listStudents = (courseCode) => {
        console.log("in list courses -> list students. Course code ")
        props.history.push({
            pathname: '/listStudentsInCourse/' + courseCode,
        });
    }

    return (
        <div class="App">
            { data.length !== 0
                ? <div>
                    {showLoading && <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>}
                    <h2>This is the list of all the courses taken by different students!</h2>
                    <br></br>
                    <ListGroup>
                        {data.map((item, idx) => (
                            <ListGroup.Item key={idx} action onClick={() => { listStudents(item.courseCode) }}><b>Course Code: </b>{item.courseCode}, <b>Course Name: </b>{item.courseName}</ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
                : < Login />
            }
        </div>

    );
}
//
export default withRouter(ListCourses);
