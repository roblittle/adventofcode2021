
const fs = require('fs');
var args = process.argv.slice(2);
var inputArray = fs.readFileSync(args[0]).toString().trim().split("\n");

let bingoDraws = inputArray.shift().split(",").map(Number);

inputArray.shift();     // just makes parsing align on the 5, for sanity
const DIMENSION = 5;    // its bingo, so its 5x5, always, no need to calc

let resultHash = {};    // k:v = boardID+row or col toString : count of matches
let calledNumbers = [];

const createAllBoards = function(boardRows){
    let allBoards = [];
    let board = [];
    let rowCount = 0;

    for(let i=0;i<=boardRows.length;i++){ 
        if(rowCount === DIMENSION){
            // every 5th item, a new board starts.
            allBoards.push(board);
            board = [];
            rowCount = 0;
            continue;
        } 
        // must use \s+ to grab random spaces instead of " " to handle single digits
        board[rowCount] = boardRows[i].trim().split(/\s+/g).map(Number);
        rowCount++;
    }
    return allBoards;
};

const arrayColumn = (array, column) => array.map(e => e[column]);

const checkBoard = function(board, bingoBallVal, boardID){
    // check every board row and column for the value
    for(let row=0; row<board.length; row++){
        let rowCheckResult = checkRow(board[row], bingoBallVal, boardID);
        if(rowCheckResult === 'BINGO'){
            return 'BINGO';
        }
    }
    for(let col=0; col<board[0].length; col++){
        let colCheckResult = checkCol(arrayColumn(board,col), bingoBallVal, boardID);
        if(colCheckResult === 'BINGO'){
            return 'BINGO';
        }
    }
}

const checkRow = function(row, bingoBallVal, boardID){
    if(row.includes(bingoBallVal)){
        resultHash[boardID+ ' ' +row] = isNaN(resultHash[boardID+ ' ' +row]) ? 1 : resultHash[boardID+ ' ' +row]+1;
    }
    if(resultHash[boardID+ ' ' +row] === 5){
        return winner(boardID, bingoBallVal);
    }
}

const checkCol = function(col, bingoBallVal, boardID){
    if(col.includes(bingoBallVal)){
        resultHash[boardID+ ' ' +col] = isNaN(resultHash[boardID+ ' ' +col]) ? 1 : resultHash[boardID+ ' ' +col]+1;
    }
    if(resultHash[boardID+ ' ' +col] === 5){
        return winner(boardID, bingoBallVal);
    }
}

const winner = function(boardID, bingoBallVal){
    let winningBoardAsArray = [].concat.apply([], allBoards[boardID]);
    let boardUnmarkedNums = winningBoardAsArray.filter(x => !calledNumbers.includes(x));
    let boardSum = boardUnmarkedNums.toString().split(",").map(Number).reduce((a, b) => a + b, 0);
    console.log('high score possible: ' + bingoBallVal*boardSum);
    return 'BINGO';;
}

allBoards = createAllBoards(inputArray);

for(bingoBall of bingoDraws){
    calledNumbers.push(bingoBall);    // Store for final score calculating assitance
    for(let boardID=0; boardID<allBoards.length; boardID++){
        let boardResult = checkBoard(allBoards[boardID], bingoBall, boardID);
        if(boardResult === 'BINGO'){
            return 'bingo bingo BINGO BINGO B I N G O!!!!!'
        }
    }
}


