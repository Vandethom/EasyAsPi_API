import { Controller, Get, QueryParam } from 'routing-controllers';
import express, { NextFunction, Request, RequestHandler, Response } from 'express'
import {v4 as uuidv4} from 'uuid';
import 'reflect-metadata';
import * as Course from '../models/course'

import db from '../models'
import HttpException from '../middlewares/HttpException';
import Course_type from '../types/model_types'


/* -~-~-~-~-~-~-~-~-~-~-~-~-~-~ Get all courses -~-~-~-~-~-~-~-~-~-~-~-~-~-~ */

export async function getAllCourses (req: Request, res: Response, next: NextFunction) {
  const courses = await db.Course.findAll()

  if (courses.length <= 0) {
    next(new HttpException(404, 'No course were found in the database.'))
  }
  res.status(200).json({ courses })  
}


/* -~-~-~-~-~-~-~-~-~-~-~-~-~-~ Get one course -~-~-~-~-~-~-~-~-~-~-~-~-~-~ */

export async function getCourse (req: Request, res: Response, next: NextFunction) {  
  const course = await db.Course.findAll({ 
    where: { id: req.params.id } 
  })

  if (!course[0]) {
    next(new HttpException(404, 'Course not found'))
  }

  res.status(200).json({ course })
}


/* -~-~-~-~-~-~-~-~-~-~-~-~-~-~ Create course -~-~-~-~-~-~-~-~-~-~-~-~-~-~ */

export async function createCourse (req: Request, res: Response, next: NextFunction) {
  const course: Course_type = {
    id!: uuidv4(),
    title!: req.body.title,
    grade!: req.body.grade,
    theme!: req.body.theme,
    content!: req.body.content,
  }

  await db.Course.create(course)
  const check_id: Array<any> = await db.Course.findAll({where: { id: course.id}})
  const idToCheck: string = check_id[0].dataValues.id
  console.log(idToCheck)

  if (idToCheck) {
    next(new HttpException(400, 'Course already exists.'))
  } else if (!course.id || !course.title || !course.grade || !course.theme || !course.content) {
    next(new HttpException(400, 'All fields must be completed in order to create a new course.'))
  }
  
  res.status(201).json({ course })


  // await db.Course.create(course)

  // if (!course.id || !course.title || !course.grade || !course.theme || !course.content) {
  //   next(new HttpException(400, 'All fields must be completed in order to create a new course.'))
  // } 
  
  // res.status(201)
  //   .json({ course })
}


/* -~-~-~-~-~-~-~-~-~-~-~-~-~-~ Update course -~-~-~-~-~-~-~-~-~-~-~-~-~-~ */

export async function updateCourse (req: Request, res: Response, next: NextFunction) {
  const toUpdate: object = await db.Course.update(
    {
      title: req.body.title,
      grade: req.body.grade,
      theme: req.body.theme,
      content: req.body.content,
    },
    { 
      where: {id: req.params.id},
      returning: true,
      plain: true
    }
  )

  res.status(200)
    .json({ toUpdate })  
}


/* -~-~-~-~-~-~-~-~-~-~-~-~-~-~ Delete course -~-~-~-~-~-~-~-~-~-~-~-~-~-~ */

export async function deleteCourse (req: Request, res: Response, next: NextFunction) {
  const toDelete: object = await db.Course.destroy({
    where: { id: req.params.id}
  })
  res.status(204)
    .json({ res: 'Course was deleted accordingly to your wishes' })
}