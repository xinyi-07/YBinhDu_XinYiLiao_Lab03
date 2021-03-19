import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function ShowCourse(props) {
    console.log('props.match.params', props.match.params.id)
    const [data, setData] = useState({});
    const [showLoading, setShowLoading] = useState(true);
    const apiUrl = "http://localhost:3000/api/courses/" + props.match.params.id;

    useEffect(() => {
        setShowLoading(false);
        const fetchData = async () => {
            const result = await axios(apiUrl);
            console.log('results from courses', result.data);

            setData(result.data);
            setShowLoading(false);
        };

        fetchData();
    }, []);

    const editCourse = (id) => {
        props.history.push({
            pathname: '/editcourse/' + id
        });
    };

    const deleteCourse = (id) => {
        setShowLoading(true);
        const course = { courseCode: data.courseCode, courseName: data.courseName, section: data.section, semester: data.semester };
        //
        axios.delete(apiUrl, course)
            .then((result) => {
                setShowLoading(false);
                props.history.push('/listcourses')
            }).catch((error) => setShowLoading(false));
    };

    return (
        <div>
            {showLoading && <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>}
            <Jumbotron>
                <h1>Course Code: {data.courseCode}</h1>
                <p>Course Name: {data.courseName}</p>

                <p>
                    <Button type="button" variant="primary" onClick={() => { editCourse(data._id) }}>Update</Button>&nbsp;
                    <Button type="button" variant="danger" onClick={() => { deleteCourse(data._id) }}>Drop</Button>
                </p>
            </Jumbotron>
        </div>
    );
}

export default withRouter(ShowCourse);
