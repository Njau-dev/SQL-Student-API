const { where } = require('sequelize')
const db = require('../models/indexStart')
const createError = require('http-errors')

//use the model
const Student = db.students
const Course = db.courses

module.exports = {
    //add a sstudent
    addStudent: async (req, res, next) => {
        try {
            let info = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                gender: req.body.gender,
                course_id: req.body.course_id
            }

            const addStudent = await Student.create(info)

            res.status(200).send(addStudent)
        } catch (error) {
            next(error)
        }
    },

    getAllStudents: async (req, res, next) => {
        try {
            let students = await Student.findAll({
                include: [{ model: Course, attributes: ['course'] }]
            });
            res.status(200).send(students)
        } catch (error) {
            next(error);
        }
    },

    getStudent: async (req, res, next) => {
        try {
            let id = req.params.student_id
            let student = await Student.findOne({ where: { student_id: id } })

            if (!student) {
                throw (createError(420, 'Student does not exist'))
            }
            res.status(200).send(student)
        } catch (error) {
            next(error)
        }
    },

    // update Student
    updateStudent: async (req, res, next) => {
        try {
            let id = req.params.student_id

            const student = await Student.update(req.body, { where: { student_id: id } })
            if (!student) {
                throw (createError(404, "student does not exist"))
            }
            res.status(200).send(`${student} updated succesfully`)
        } catch (error) {
            next(error)
        }
    },

    // delete student
    deleteStudent: async (req, res, next) => {
        try {
            let id = req.params.student_id

            await Student.destroy({ where: { student_id: id } })
            res.status(200).send("Student Deleted Succesfully")

        } catch (error) {
            next(error)
        }
    }
}