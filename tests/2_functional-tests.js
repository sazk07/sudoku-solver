import chai, { assert } from "chai";
import chaiHttp from "chai-http";
import { app } from '../app.js'
import { after } from "mocha";

chai.use(chaiHttp)
after(() => {
  chai.request(app).get('/api')
})

suite('Functional Tests', () => {
  suite('POST req to /api/solve', () => {
    test('solve a puzzle with valid puzzle string', (done) => {
      const validPuzzleStr = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const output = '769235418851496372432178956174569283395842761628713549283657194516924837947381625';
      chai.request(app)
      .post('/api/solve')
      .send({
        puzzle: validPuzzleStr
      })
      .end((err, res) => {
        assert.isNull(err)
        assert.isObject(res.body)
        assert.property(res.body, 'solution')
        assert.strictEqual(res.body.solution, output)
        done()
      })
    })
    test('puzzle missing', (done) => {
      chai.request(app)
      .post('/api/solve')
      .end((err, res) => {
        assert.isNull(err)
        assert.property(res.body, 'error')
        assert.strictEqual(res.body.error, 'Required field missing')
        done()
      })
    })
    test('test for invalid characters', (done) => {
      const invalidCharPuzzle = "..X..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      chai.request(app)
      .post('/api/solve')
      .send({
        puzzle: invalidCharPuzzle
      })
      .end((err, res) => {
        assert.isNull(err)
        assert.property(res.body, 'error')
        assert.deepStrictEqual(res.body.error, 'Invalid characters in puzzle')
        done()
      })
    })
    test('test for puzzle length not equalling 81 characters', (done) => {
      const shortLenStr = '..9..5.1.85.4....2432....1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const longLenStr = '..9..5.1.85.4....2432........1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      chai.request(app)
      .post('/api/solve')
      .send({
        puzzle: shortLenStr
      })
      .end((err, res) => {
        assert.isNull(err)
        assert.property(res.body, 'error')
        assert.deepStrictEqual(res.body.error, 'Expected puzzle to be 81 characters long')
        chai.request(app)
        .post('/api/solve')
        .send({
          puzzle: longLenStr
        })
        .end((err, res) => {
          assert.isNull(err)
          assert.property(res.body, 'error')
          assert.deepStrictEqual(res.body.error, 'Expected puzzle to be 81 characters long')
          done()
        })
      })
    })
    test('test for unsolvable puzzle', (done) => {
      const unsolvablePuzzleStr = '779235418851496372432178956174569283395842761628713549283657194516924837947381625'
      chai.request(app)
      .post('/api/solve')
      .send({
        puzzle: unsolvablePuzzleStr
      })
      .end((err, res) => {
        assert.isNull(err)
        assert.property(res.body, 'error')
        assert.deepStrictEqual(res.body.error, 'Puzzle cannot be solved')
        done()
      })
    })
  })
  suite('POST req to /api/check', () => {
    const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    test('test for puzzle, coordinate, value to be object, letterNumber and number respectively', (done) => {
      const coordinate = "A1"
      const value = "7"
      chai.request(app)
      .post('/api/check')
      .send({
        puzzle,
        coordinate,
        value
      })
      .end((err, res) => {
        assert.isNull(err)
        assert.property(res.body, 'valid')
        assert.isTrue(res.body.valid)
        done()
      })
    })
  })
})
