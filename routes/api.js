import { Solver } from '../controllers/sudoku-solver.js'
import asyncHandler from 'express-async-handler'

export default function (app) {
  const solver = new Solver()

  app.post('/check', asyncHandler(async (req, res) => {

  }))

  app.post('/solve', asyncHandler(async (req, res) => {

  }))
}
