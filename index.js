require('dotenv').config();
const express = require('express');
const cors = require('cors')
const app = express();

const studentRoutes = require('./routes/studentRoute')
const courseRoutes = require('./routes/courseRoutes')
const userRoutes = require('./routes/userRoutes')

app.use(cors({
    origin: 'http://localhost:5175',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(studentRoutes);
app.use(courseRoutes);
app.use(userRoutes)


//handling 404 error
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404
    next(err)
})


//Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

// setting up a server
app.listen(process.env.PORT || 4000, function () {
    console.log("Now listening for request on http://localhost:4000")
});