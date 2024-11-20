const express = require('express')
const courseController = require('../controllers/courseController')

const router = express.Router()


router.post('/addcourse', courseController.addCourse)
router.get('/getallcourses', courseController.getAllCourses)
router.get('/getcourse/:course_id', courseController.getCourse)
router.patch('/updatecourse/:course_id', courseController.updateCourse)
router.delete('/deletecourse/:course_id', courseController.deleteCourse)

module.exports = router