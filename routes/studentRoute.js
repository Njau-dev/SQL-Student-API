const express = require('express')
const studentController = require('../controllers/studentController')

const router = express.Router()


router.post('/addstudent', studentController.addStudent)
router.get('/getallstudents', studentController.getAllStudents)
router.get('/getstudent/:student_id', studentController.getStudent)
router.patch('/updatestudent/:student_id', studentController.updateStudent)
router.delete('/deletestudent/:student_id', studentController.deleteStudent)

module.exports = router