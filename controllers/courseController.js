const { where } = require('sequelize')
const db = require('../models/indexStart')
const createError = require('http-errors')

//use the model
const Course = db.courses

module.exports = {
    //add a course
    addCourse: async (req, res, next) => {
        try {
            let info = {
                classtime: req.body.classtime,
                intake: req.body.intake,
                course: req.body.course
            }

            const addCourse = await Course.create(info)
            // console.log(addcourse);
            // console.log(info);

            res.status(200).send(addCourse)
        } catch (error) {
            next(error)
        }
    },

    getAllCourses: async (req, res, next) => {
        try {
            let courses = await Course.findAll({});
            res.status(200).send(courses)
        } catch (error) {
            next(error);
        }
    },

    getCourse: async (req, res, next) => {
        try {
            let id = req.params.course_id
            let course = await Course.findOne({ where: { course_id: id } })

            if (!course) {
                throw (createError(420, 'Course does not exist'))
            }
            res.status(200).send(course)
        } catch (error) {
            next(error)
        }
    },

    // update Student
    updateCourse: async (req, res, next) => {
        try {
            let id = req.params.course_id

            const course = await Course.update(req.body, { where: { course_id: id } })
            if (!course) {
                throw (createError(404, "course does not exist"))
            }
            res.status(200).send(`course updated succesfully`)
        } catch (error) {
            next(error)
        }
    },

    // delete course
    deleteCourse: async (req, res, next) => {
        try {
            let id = req.params.course_id

            await Course.destroy({ where: { course_id: id } })
            res.status(200).send("Course Deleted Succesfully")

        } catch (error) {
            next(error)
        }
    }
}