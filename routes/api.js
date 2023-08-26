import { Solver } from '../controllers/sudoku-solver.js'
import asyncHandler from 'express-async-handler'
import { Router } from 'express'

const solver = new Solver()
const router = Router()

router.post('/check', asyncHandler(async (req, res) => {
  const { puzzle, coordinate, value } = req.body
  const valueNum = new Number(value).valueOf()
  const isBetween = (num, min, max) => {
    return min < num && num < max
  }
  if (!puzzle || !coordinate || !value) {
    return next(new Error("Required field(s) missing"))
  }
  if (!Number.isInteger(valueNum) || !isBetween(valueNum, 0, 10)) {
    return next(new Error("Invalid value"))
  }
  solver.validate(puzzle)
  solver.getCoordinate(coordinate)
  return res.json({
    valid: true
  })
}))

const solveFn = async (req, res, next) => {
  const { puzzle } = req.body
  if (!puzzle) {
    return next(new Error('Required field missing'))
  }
  solver.validate(puzzle)
  const answer = solver.solve(puzzle)
  if (!answer) {
    return next(new Error('Puzzle cannot be solved'))
  }
  return res.json({
    solution: solver.createStringFromGrid()
  })
}

router.post('/solve', asyncHandler(solveFn))

export {
  router
}
