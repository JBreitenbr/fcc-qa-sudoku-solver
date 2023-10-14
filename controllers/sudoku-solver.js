class SudokuSolver {
  validate(puzzleString) {
    if (puzzleString.length !== 81) {
      return [false, { error: 'Expected puzzle to be 81 characters long' }];
    }

    if (!/[1-9\.]{81}/.test(puzzleString)) {
      return [false, { error: 'Invalid characters in puzzle' }];
    }

    return [true, {}];
  }

  // Some helper functions
  stringToGrid(puzzleString){
  let grid=Array(9).fill().map(() => Array(9).fill(0));  
  for(let i=0;i<81;i++){
      let col=i%9;
     let row=(i-i%9)/9;
      grid[row][col]=puzzleString[i]=="."?0:parseInt(puzzleString[i]);
}
  return grid;
}

   gridToString(grid){
   let stri="";
    for(let i=0;i<9;i++){
       for(let j=0;j<9;j++){
         if(grid[i][j]>0){
         stri+=grid[i][j].toString();
         }
         else {
           stri+=".";
          }
       }
    }
   return stri;
}

   letterToNumber(row){
   let alphToNum={"A":1,"B":2,"C":3,"D":4,"E":5,"F":6,"G":7,"H":8,"I":9}
  let Row=row.toUpperCase();
  if(!(Row in alphToNum)){
    return "none";
  }
  else {
    return alphToNum[Row];
  }
}

checkRowPlacement(puzzleString, row, column, value) {
let grid=this.stringToGrid(puzzleString);
  row=this.letterToNumber(row);
  if(grid[row-1][column-1]==value){
    return true;
  }
  for(let i=0;i<9;i++){
    if(grid[row-1][i]==value){
      return false;
    }
  }
  return true;
}

checkColPlacement(puzzleString, row, column, value) {
let grid=this.stringToGrid(puzzleString);
  row=this.letterToNumber(row);
  if(grid[row-1][column-1]==value){
    return true;
  }
  for(let i=0;i<9;i++){
    if(grid[i][column-1]==value){
      return false;
    }
  }
  return true;
  }

checkRegionPlacement(puzzleString, row, column, value) {
let grid=this.stringToGrid(puzzleString);
  row=this.letterToNumber(row);
  if(grid[row-1][column-1]==value){
    return true;
  }
  let startRow=row<9?row-row%3:6;
  let startCol=column<9?column-column%3:6;
  for(let i=0;i<3;i++){
    for(let j=0;j<3;j++){
      if(grid[startRow+i][startCol+j]==value){
        return false;
      }
    }
  }
  return true;
}
/************************************
I took the functions isSafe and solveSudoku, which I adapted a little bit to be suitable for a class, from
https://www.geeksforgeeks.org/sudoku-backtracking-7/ 
************************************/
isSafe(grid, row, col, num)
{

    // Check if we find the same num
    // in the similar row , we
    // return false
    for(let x = 0; x <= 8; x++)
        if (grid[row][x] == num)
            return false;

    // Check if we find the same num
    // in the similar column ,
    // we return false
    for(let x = 0; x <= 8; x++)
        if (grid[x][col] == num)
            return false;

    // Check if we find the same num
    // in the particular 3*3
    // matrix, we return false
    let startRow = row - row % 3,
        startCol = col - col % 3;

    for(let i = 0; i < 3; i++)
        for(let j = 0; j < 3; j++)
            if (grid[i + startRow][j + startCol] == num)
                return false;

    return true;
}

solveSudoku(grid, row, col)
{
    let N=9;
    if (row == N - 1 && col == N)
        return grid;
    if (col == N)
    {
        row+=1;
        col = 0;
    }

    if (grid[row][col] != 0)
        return this.solveSudoku(grid, row, col + 1);

    for(let num = 1; num < 10; num++)
    {
        if (this.isSafe(grid, row, col, num))
        {
            grid[row][col] = num;
            if (this.solveSudoku(grid, row, col + 1))
                return grid;
        }
        grid[row][col] = 0;
    }
    return false;
}

  solve(puzzleString) {
    if (puzzleString.length != 81) {
      return false;
    }
    if (/[^0-9.]/g.test(puzzleString)) {
      return false;
    }
    console.log(puzzleString);
    let grid = this.stringToGrid(puzzleString);
    let solved = this.solveSudoku(grid, 0, 0);

    if (!solved) {
      return false;
    }
    let outputString = this.gridToString(solved);
    return outputString;
  }
}

module.exports = SudokuSolver;

