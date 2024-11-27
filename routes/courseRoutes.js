const express = require('express')
const courseController = require('../controllers/courseController')
const { verifyAccessToken } = require('../helpers/jwtHelpers')
const auth = require('../helpers/jwtHelpers')

const router = express.Router()


router.post('/addcourse', courseController.addCourse)
router.get('/getallcourses', courseController.getAllCourses)
router.get('/getcourse/:course_id', verifyAccessToken, auth.restrict('user'), courseController.getCourse)
router.patch('/updatecourse/:course_id', courseController.updateCourse)
router.delete('/deletecourse/:course_id', courseController.deleteCourse)

module.exports = router