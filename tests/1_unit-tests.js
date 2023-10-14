const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();
let validPuzzle="..6.2493594..3...71....9......6.18....84.76...........89.7.2..1.3.9..2.....31856.";

suite('Unit Tests', () => {
  suite("solver tests", function () {
    test("Logic handles a valid puzzle string of 81 characters", function (done) {
      let complete =   "786124935942536187153879426274651893318497652569283714895762341631945278427318569";     assert.equal(solver.solve(validPuzzle), complete);
      done();
    });


test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", function (done) {
      let inValidPuzzle=".x6.2493594..3...71....9......6.18....84.76...........89.7.2..1.3.9..2.....31856.";

      assert.equal(solver.solve(inValidPuzzle), false);
      done();
    });
    
    test("Logic handles a puzzle string that is not 81 characters in length", function (done) {
      let inValidPuzzle =
        "999";
      assert.equal(solver.solve(inValidPuzzle), false);
      done();
    });

    
    test("Logic handles a valid row placement", function (done) {
      assert.equal(solver.checkRowPlacement(validPuzzle, "A", "1", "7"), true);
      done();
    });

    test("Logic handles an invalid row placement", function (done) {
      assert.equal(solver.checkRowPlacement(validPuzzle, "E", "5", "8"), false);
      done();
    });
    
    test("Logic handles a valid column placement", function (done) {
      assert.equal(solver.checkColPlacement(validPuzzle, "I", "5", "4"), true);
      done();
    });

    test("Logic handles an invalid column placement", function (done) {
      assert.equal(solver.checkColPlacement(validPuzzle, "D", "8", "3"), false);
      done();
    });

    test("Logic handles a valid region placement", function (done) {
      assert.equal(solver.checkRegionPlacement(validPuzzle, "E", "5", "5"), true);
      done();
    });

    test("Logic handles an invalid region placement", function (done) {
      assert.equal(solver.checkRegionPlacement(validPuzzle, "G", "3", "3"), false);
      done();
    });
    test("Valid puzzle strings pass the solver", function (done) {
      assert.equal(
        solver.solve(validPuzzle),
        "786124935942536187153879426274651893318497652569283714895762341631945278427318569"
      );
      done();
    });
    test("Invalid puzzle strings fail the solver", function (done) {
      let inValidPuzzle =
        "8..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1"
      assert.equal(solver.solve(inValidPuzzle), false);
      assert.equal(solver.solve(inValidPuzzle), false);
      done();
    });
    test("Solver returns the expected solution for an incomplete puzzzle", function (done) {
      assert.equal(
        solver.solve(
"8...426......362.1..1........5..482..46.........62.......2........8.......245...."
        ),
         "837142659459736281621589347195374826246918573378625194783291465514867932962453718"
      );
      done();
    });
  });
});