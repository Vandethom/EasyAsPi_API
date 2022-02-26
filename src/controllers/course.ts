import { Controller, Get, QueryParam } from 'routing-controllers';
import express, { NextFunction, Request, Response } from 'express'
import 'reflect-metadata';
import * as Course from '../models/course'

import db from '../models'

/* -~-~-~-~-~-~-~-~-~-~-~-~-~-~ Get all courses -~-~-~-~-~-~-~-~-~-~-~-~-~-~ */

export async function getAllCourses (req: Request, res: Response, next: NextFunction) {
  const courses = await db.Course.findAll()
  res.status(200)
    .json({ courses })  
}

/* -~-~-~-~-~-~-~-~-~-~-~-~-~-~ Get one course -~-~-~-~-~-~-~-~-~-~-~-~-~-~ */

export async function getCourse (req: Request, res: Response, next: NextFunction) {
  const course: object = await db.Course.findAll({
    where: { id: req.params.id }
  })
  res.status(200)
    .json({ course })
}

/* -~-~-~-~-~-~-~-~-~-~-~-~-~-~ Delete course -~-~-~-~-~-~-~-~-~-~-~-~-~-~ */

export async function deleteCourse (req: Request, res: Response, next: NextFunction) {
  const toDelete: object = await db.Course.destroy({
    where: { id: req.params.id}
  })
  res.status(204)
    .json({ res: 'Course was deleted accordingly to your wishes' })
}

/* -~-~-~-~-~-~-~-~-~-~-~-~-~-~ Delete course -~-~-~-~-~-~-~-~-~-~-~-~-~-~ */

// export const createCourse = async(payload: Course): Promise<Course> => {
//   return db.Course.create(payload)
// }

export async function createCourse (req: Request, res: Response, next: NextFunction) {
  const course: object = {
    title: req.body.title,
    grade: req.body.grade,
    theme: req.body.theme,
    content: req.body.content,
  }
  await db.Course.create(course)

  res.status(201)
    .json({ course })
}

export async function updateCourse (req: Request, res: Response, next: NextFunction) {
  const toUpdate: object = await db.Course.update(
    {
      title: req.body.title,
      grade: req.body.grade,
      theme: req.body.theme,
      content: req.body.content,
    },
    { where: {id: req.params.id} }
  )

  res.status(200)
    .json({ toUpdate })
}