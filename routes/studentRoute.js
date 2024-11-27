const express = require('express')
const studentController = require('../controllers/studentController')
const { verifyAccessToken } = require('../helpers/jwtHelpers')
const auth = require('../helpers/jwtHelpers')

const router = express.Router()


router.post('/addstudent', verifyAccessToken, auth.restrict('user'), studentController.addStudent)
router.get('/getallstudents', verifyAccessToken, auth.restrict('user'), studentController.getAllStudents)
router.get('/getstudent/:student_id', studentController.getStudent)
router.patch('/updatestudent/:student_id', studentController.updateStudent)
router.delete('/deletestudent/:student_id', verifyAccessToken, auth.restrict('user'), studentController.deleteStudent)

module.exports = router