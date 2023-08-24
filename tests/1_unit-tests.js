import { assert } from "chai";
import { Solver } from '../controllers/sudoku-solver.js'
const inputStr = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'

const solver = new Solver()
suite('Unit Tests', () => {
  suite('Function validate()', () => {
    test('is input length 81 chars?', (done) => {
      const output = solver.validate(inputStr)
      assert.strictEqual(output, null)
      done()
    })
    test('are there invalid characters in input?', (done) => {
      const invalidInputStr = '..9..5.1.85.4....2x32......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
      const outputFn = () => solver.validate(invalidInputStr)
      assert.throws(outputFn, 'Invalid characters in puzzle')
      done()
    })
  })
})
