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

    return null
  }
  checkRowPlacement(puzzleString, row, column, value) {

  }
  checkColPlacement(puzzleString, row, column, value) {

  }
  checkRegionPlacement(puzzleString, row, column, value) {

  }
  solve(puzzleString) {

  }
  static #createGridFromString(puzzleString) {
    for (let row = 0; row < TOTALWIDTH; row++) {

    }
    for (let row = 0; row < TOTALHEIGHT; row++) {
      for (let col = 0; col < TOTALWIDTH; col++) {
        const charOfInputStr = puzzleString.charAt(String(row).concat(String(col))-row)
        this.#puzzle[row][col] = SudokuSolver.isValidInput(charOfInputStr) ? parseInt(charOfInputStr): 0;
      }
    }
  }
  static isValidInput(inputChar) {

  }
}

export {
  SudokuSolver as Solver
}
