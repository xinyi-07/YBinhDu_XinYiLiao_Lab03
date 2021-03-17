const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CourseSchema = new Schema({ //not sure if i am right about the types.
    courseCode: {
        type: String,
        default: '',
        required: 'Course Code cannot be blank'
    },
    courseName: {
        type: String,
        default: '',
        trim: true,
        required: 'Course Name cannot be blank'
    },
    section: {
        type: String,
        default: '',
    },
    semester: {
        type: String,
        default: '',
    },
    creator: {
        type: Schema.ObjectId,      //not sure about this...?
        ref: 'Student'
    }
});
mongoose.model('Course', CourseSchema);
