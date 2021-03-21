//List of Courses taken by a student.

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import Login from './Login';

function ListCoursesByStudent(props) {
    const [data, setData] = useState([]);
    const [showLoading, setShowLoading] = useState(true);
    const apiUrl = "http://localhost:3000/api/listCoursesByStudent/" + props.match.params.studentNumber;

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

    const showDetail = (id) => {
        props.history.push({
            pathname: '/showCourse/' + id
        });
    }

    return (
        <div>
            { data.length !== 0
                ? <div>
                    {showLoading && <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>}
                    <h2>The list of courses you are enrolled in!</h2>
                    <br></br>
                    <ListGroup>
                        {data.map((item, idx) => (
                            <ListGroup.Item key={idx} action onClick={() => { showDetail(item._id) }}><b>Course Code: </b>{item.courseCode}, <b>Course Name: </b>{item.courseName}</ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
                : < Login />
            }
        </div>

    );
}
//
export default withRouter(ListCoursesByStudent);


