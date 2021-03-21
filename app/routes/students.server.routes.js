// Load the 'students' controller
var students = require('../../app/controllers/students.server.controller');

// Define the routes module' method
module.exports = function (app) {
    // handle a get request made to /students path
    // and list students when /students link is selected
    app.route("/students")
        .get(students.list)
        .post(students.create);
    //go to http://localhost:3000/students to see the list

    // Set up the 'students' parameterized routes 
    app.route('/students/:studentId')
        .get(students.read)
    //.put(students.update)
    //.delete(students.delete)
    // Set up the 'studentId' parameter middleware
    //All param callbacks will be called before any handler of 
    //any route in which the param occurs, and they will each 
    //be called only once in a request - response cycle, 
    //even if the parameter is matched in multiple routes
    app.param('studentId', students.studentByID);
    //authenticate student
    app.post('/signin', students.authenticate);
    app.get('/signout', students.signout);
    app.get('/read_cookie', students.isSignedIn);


    //path to a protected page
    app.get('/welcome', students.welcome);

};

