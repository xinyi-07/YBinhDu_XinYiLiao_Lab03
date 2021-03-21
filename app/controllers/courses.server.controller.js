const mongoose = require('mongoose');
const Course = mongoose.model('Course');
const Student = require('mongoose').model('Student');

//This function throws errors....
function getErrorMessage(err) {
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].
                message;
        }
    } else {
        return 'Unknown server error';
    }
};
//
exports.create = function (req, res) {
    const course = new Course();
    course.courseCode = req.body.courseCode;
    course.courseName = req.body.courseName;
    course.section = req.body.section;
    course.semester = req.body.semester;

    console.log(req.body)
    //
    //
    Student.findOne({ email: req.body.email }, (err, student) => {

        if (err) { return getErrorMessage(err); }
        //
        req.id = student._id;
        console.log('student._id', req.id);

    }).then(function () {
        course.creator = req.id
        console.log('req.student._id', req.id);

        course.save((err) => {
            if (err) {
                console.log('error', getErrorMessage(err))

                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.status(200).json(course);
            }
        });

    });
};
//
exports.list = function (req, res) {
    Course.find().sort('-created').populate('creator', 'courseCode courseName section semester').exec((err, courses) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(courses);
        }
    });
};
//
exports.courseByID = function (req, res, next, id) {
    Course.findById(id).populate('creator', 'courseCode courseName section semester').exec((err, course) => {
        if (err) return next(err);
        if (!course) return next(new Error('Failed to load course '
            + id));
        req.course = course;
        console.log('in courseById:', req.course)
        next();
    });
};
//
exports.read = function (req, res) {
    res.status(200).json(req.course);
};
//
exports.update = function (req, res) {
    console.log('in update:', req.course)
    const course = req.course;
    course.courseCode = req.body.courseCode;
    course.courseName = req.body.courseName;
    course.section = req.body.section;
    course.semester = req.body.semester;
    course.save((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(course);
        }
    });
};
//
exports.delete = function (req, res) {
    const course = req.course;
    course.remove((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(course);
        }
    });
};
//The hasAuthorization() middleware uses the req.course and req.student objects
//to verify that the current student is the creator of the current course
exports.hasAuthorization = function (req, res, next) {
    console.log('in hasAuthorization - creator: ', req.course.creator)
    console.log('in hasAuthorization - student: ', req.id)
    //console.log('in hasAuthorization - student: ',req.student._id)


    if (req.course.creator.id !== req.id) {
        return res.status(403).send({
            message: 'Student is not authorized'
        });
    }
    next();
};

exports.listCoursesByStudent = function (req, res, next, studentNumber) {
    var query = { creator: studentNumber };
    Course.find(query)
        .sort('-created')
        .populate('creator', 'courseCode courseName section semester')
        .exec((err, course) => {
            if (err) {
                return res.status(400).send({
                    message: getErrorMessage(err),
                });
            } else {
                res.status(200).json(course);
            }
        });
};

exports.listStudentsInCourse = function (req, res, next, courseCode) {
    console.log(courseCode);
    Course.find({ courseCode: courseCode }, (err, courses) => {
        const studentIds = courses.map((course) => course.creator);
        console.log(studentIds);
        //res.status(200).json(studentIds);
        Student.find({ _id: { $in: studentIds } }, (err, students) => {
            if (err) {
                res.status(500).json([]);
            } else {
                res.status(200).json(students);
            }
        })
    })
};
