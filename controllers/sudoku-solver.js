const TOTALHEIGHT = 9
const TOTALWIDTH = 9

class SudokuSolver {

  #puzzle
  #recursions
  constructor() {
    this.#puzzle = []
    this.#recursions = 0
  }

  validate(puzzleString) {
    // has 81 valid chars as puzzleString input?
    if (puzzleString.length !== 81) {
      throw new Error('Expected puzzle to be 81 characters long')
    }

    const invalidChars = /[^1-9.]/gi;
    if (puzzleString.match(invalidChars)) {
      throw new Error('Invalid characters in puzzle')
    }

    this.#createGridFromString(puzzleString)
    return null
  }

  static #isUsedInRow(grid, row, value) {
    for (let col = 0; col < TOTALWIDTH; col++) {
      if (grid[row][col]===value) {
        return true
      }
    }
    return false
  }

  checkRowPlacement(puzzleString, row, value) {
    this.#createGridFromString(puzzleString)
    if (SudokuSolver.#isUsedInRow(this.#puzzle, row, value)) {
      return false
    }
    return true
  }

  static #isUsedInColumn(grid, col, value) {
    for (let row = 0; row < TOTALHEIGHT; row++) {
      if (grid[row][col]===value) {
        return true
      }
    }
    return false
  }

  checkColPlacement(puzzleString, column, value) {
    this.#createGridFromString(puzzleString)
    if (SudokuSolver.#isUsedInColumn(this.#puzzle, column, value)) {
      return false
    }
    return true
  }

  static #isUsedInSubGrid(grid, initRow, initCol, value) {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (grid[initRow+row][initCol+col]===value) {
          return true
        }
      }
    }
    return false
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    this.#createGridFromString(puzzleString)
    if (SudokuSolver.#isUsedInSubGrid(this.#puzzle, row, column, value)) {
      return false
    }
    return true
  }

  solve(puzzleString) {

  }

  static #isDigitLegal({ emptyCellsAllowed }) {
    for (let row=0; row<TOTALHEIGHT; row++) {
      for (let col=0; col<TOTALWIDTH; col++) {
        let value = this.#puzzle[row][col]
        // if empty cells are allowed then ignore zeroes
        if (emptyCellsAllowed && value === 0) {
          continue
        }
        // fill with zeroes
        this.#puzzle[row][col] = 0
        if ((!emptyCellsAllowed && value === 0) || !SudokuSolver.#isSafe(this.#puzzle, row, col, value)) {
          this.#puzzle[row][col] = value
          return false
        }
        this.#puzzle[row][col] = value
      }
    }
    return true
  }

  #createGridFromString(puzzleString) {
    for (let row = 0; row < TOTALWIDTH; row++) {
      this.#puzzle.push([])
    }
    for (let row = 0; row < TOTALHEIGHT; row++) {
      for (let col = 0; col < TOTALWIDTH; col++) {
        const charOfInputStr = puzzleString.charAt(String(row).concat(String(col))-row)
        this.#puzzle[row][col] = SudokuSolver.#isValidInput(charOfInputStr) ? parseInt(charOfInputStr): 0;
      }
    }
  }

  static #isSafe(grid, row, col, value) {
    // check is num placed in row, col or subgrid?
    return true
  }
  static #isValidInput(inputChar) {
    return (typeof inputChar === 'string' && inputChar.match(/[1-9]/))
  }
}

export {
  SudokuSolver as Solver
}
