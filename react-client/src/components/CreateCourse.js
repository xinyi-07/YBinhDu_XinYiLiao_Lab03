import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import React, { useState } from 'react';

//
function CreateCourse(props) {
    //
    const email = props.screen;
    console.log('props.screen', props.screen)
    const [course, setCourse] = useState({ _id: '', courseCode: '', courseName: '', section: '', semester: '', email: '' });
    const [showLoading, setShowLoading] = useState(false);
    //
    const apiUrl = "http://localhost:3000/api/courses"
    //
    const saveCourse = (e) => {
        setShowLoading(true);
        e.preventDefault();
        const data = { courseCode: course.courseCode, courseName: course.courseName, section: course.section, semester: course.semester, email: email };
        //
        axios.post(apiUrl, data)
            .then((result) => {
                setShowLoading(false);
                console.log('results from save course:', result.data)
                props.history.push('/showcourse/' + result.data._id)

            }).catch((error) => setShowLoading(false));
    };
    //
    const onChange = (e) => {
        e.persist();
        setCourse({ ...course, [e.target.name]: e.target.value });
    }

    return (
        <div>

            {showLoading &&
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            }
            <Jumbotron>
                <Form onSubmit={saveCourse}>
                    <h2> {email}, You can create a course here! </h2>
                    <Form.Group>
                        <Form.Label> Course Code</Form.Label>
                        <Form.Control type="text" name="courseCode" id="courseCode" placeholder="Enter course code" value={course.courseCode} onChange={onChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label> Course Name</Form.Label>
                        <Form.Control type="text" name="courseName" id="courseName" placeholder="Enter course name" value={course.courseName} onChange={onChange} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label> Section</Form.Label>
                        <Form.Control as="select" name="section" id="section" placeholder="Enter section" value={course.section} onChange={onChange} >
                            <option value='1'> Section 001</option>
                            <option value='2'> Section 002</option>
                            <option value='3'> Section 003</option>
                            <option value='4'> Section 004</option>
                            <option value='5'> Section 005</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label> Semester</Form.Label>
                        <Form.Control type="text" name="semester" id="semester" placeholder="Enter semester" value={course.semester} onChange={onChange} />
                    </Form.Group>

                    <Button variant="primary" type="submit">Save Course</Button>
                </Form>
            </Jumbotron>
        </div>
    );


}

export default withRouter(CreateCourse);
