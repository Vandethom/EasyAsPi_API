import { Router } from 'express'
import * as ctrl from '../controllers/course'

const course_routes: Router = Router()

course_routes.get('/create_course', ctrl.getAll)

export default course_routes
