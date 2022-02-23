import { Controller, Get, QueryParam } from 'routing-controllers';
import express, { NextFunction, Request, Response } from 'express'
import 'reflect-metadata';

import db from '../models'

export async function getAll (req: Request, res: Response, next: NextFunction) {
  const courses = await db.Course.findAll()
  res.status(200)
    .json({ courses })  
}
