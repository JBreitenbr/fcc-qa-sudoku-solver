'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
const { puzzle, coordinate, value } = req.body;
    if (!puzzle|| !coordinate || !value) {
      res.json({ error: "Required field(s) missing" });
      return;
    }
    if (!/^[1-9]$/.test(value)) {
      return res.json({ error: 'Invalid value' });
    }

    if (!/^[A-I][1-9]$/.test(coordinate)) {
      return res.json({ error: 'Invalid coordinate' });
    }
    if (puzzle.length != 81) {
      res.json({ error: "Expected puzzle to be 81 characters long" });
      return;
    }
    if (/[^0-9.]/g.test(puzzle)) {
      res.json({ error: "Invalid characters in puzzle" });
      return;
    }
let row=coordinate.split("")[0];
let col=coordinate.split("")[1];
let validRow=solver.checkRowPlacement(puzzle,row,col,value);
let validCol=solver.checkColPlacement(puzzle,row,col,value);
let validReg=solver.checkRegionPlacement(puzzle,row,col,value);

let conflicts=[];
if (validRow && validCol && validReg) {
      res.json({ valid: true });
    } else {
      if (!validRow) {
        conflicts.push("row");
      }
      if (!validCol) {
        conflicts.push("column");
      }
      if (!validReg) {
        conflicts.push("region");
      }
      res.json({ valid: false, conflict: conflicts });
  }
    });
    
  app.route('/api/solve')
    .post((req, res) => {
const { puzzle } = req.body;

    if (!puzzle) {
      return res.json({ error: 'Required field missing' });
    }

    // Check puzzle is valid (length and characters) before trying to solve
   const [valid, error] = solver.validate(puzzle);

    if (!valid) {
      return res.json(error);
    }

    // Try to solve puzzle
    const solution = solver.solve(puzzle);

    if (!solution) {
      return res.json({ error: 'Puzzle cannot be solved' });
    }

    return res.json({ solution });
    });
};
