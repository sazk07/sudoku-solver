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
}))

const solveFn = async (req, res) => {
  const { puzzle } = req.body
  if (!puzzle) {
    return res.json({
      error: 'Required field missing'
    })
  }
  const answer = solver.solve(puzzle)
  if (!answer) {
    return res.json({
      error: 'Puzzle cannot be solved'
    })
  }
  return res.json({
    solution: solver.createStringFromGrid()
  })
}
router.post('/solve', asyncHandler(solveFn))

export {
  router
}
