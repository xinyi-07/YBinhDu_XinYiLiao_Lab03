import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
//import Login from './Login';

function ListStudentsInCourse(props) {
    console.log("IN LIST STUDENTS IN COURSES View --" + props.match.params.courseCode)
    const courseCode = props.match.params.courseCode;
    const [data, setData] = useState([]);
    const [showLoading, setShowLoading] = useState(true);
    const [listError, setListError] = useState(false);
    console.log(props.match.params.courseCode)
    const apiUrl = "http://localhost:3000/api/listStudentsInCourse/" + props.match.params.courseCode;
    console.log("second " + props.match.params.courseCode)
    useEffect(() => {
        const fetchData = async () => {
            axios.get(apiUrl)
                .then(result => {
                    console.log('result.data:', result.data)
                    setData(result.data);
                    setShowLoading(false);
                }).catch((error) => {
                    console.log('error in fetchData:', error)
                    setListError(true)
                });
        };
        fetchData();
    }, []);

    return (
        <div>

            {showLoading && <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>}
            <h3>List of Students in {courseCode}!</h3>
            <ListGroup>
                {data.map((item, idx) => (
                    <ListGroup.Item
                        key={idx}
                        action
                        onClick={() => {
                            /*showDetail(item._id)*/
                        }}
                    >
                        <b>Name: </b> {item.fullName}
                    </ListGroup.Item>
                ))}
            </ListGroup>

        </div>

    );
}
//
export default withRouter(ListStudentsInCourse);
