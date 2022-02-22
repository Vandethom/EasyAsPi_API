import express, { Request, Response } from 'express'
require('dotenv').config();

import db from './models'
import log from './logger/index'

const port: any = process.env.API_PORT,
    host: any = process.env.DB_HOST,
    app = express()
        .use(express.json())
        .use(express.urlencoded({ extended: false }))

// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))

db.sequelize.sync().then(() => {
    app.listen(port, host, () => {
        log.info(`Server listening at http://${host}:${port}`)
    })
})


app.get('/hello', (req, res, next) => {
    db.User.findAll()
    .then((result: object) => res.json({ result }))
    .catch((err: string) => console.error(err))
})

// const createUsers = () => {
//     users.map(user => {
//         db.User.create(user)
//     })
// }
// createUsers()

// const createCourses = () => {
//     courses.map(course => {
//         db.Course.create(course)
//     })
// }
// createCourses()

// const createCourseAssignments = () => {
//     courseassignments.map(courseassignment => {
//         db.CourseAssignment.create(courseassignment)
//     })
// }
// createCourseAssignments()
