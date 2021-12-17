//--- Day 5: Hydrothermal Venture --//
const fs = require('fs');
var args = process.argv.slice(2);
var inputArray = fs.readFileSync(args[0]).toString().split("\n");

let vectorArray = [];

// 'x1,y1 -> x2,y2' parser 
const parseLineCoords = function(line){
    const lineStart = line.slice(0, line.indexOf('-')-1);
    const lineEnd = line.slice(line.indexOf('>')+2);


    // - only verticle lines aka x1 = x2 or y1 = y2
    let lineStartX = parseInt(lineStart.slice(0, lineStart.indexOf(',')));
    let lineEndX = parseInt(lineStart.slice(lineStart.indexOf(',')+1));
    let lineStartY = parseInt(lineEnd.slice(0,lineEnd.indexOf(',')));
    let lineEndY =  parseInt(lineEnd.slice(lineEnd.indexOf(',')+1));

    if((lineStartX === lineStartY) || (lineEndX === lineEndY)){
        console.log('processling line ' + line);
        while(lineStartX < lineStartY){
            // fill in x to y
            vectorArray.push([lineStartX,lineEndX].map(Number));
            lineStartX++;
        }
        while(lineStartX > lineStartY){
            // fill in y to x
            vectorArray.push([lineStartX,lineEndX].map(Number));
            lineStartX--;
        }

        // end marks
        while(lineEndX < lineEndY){
            // fill in x to y
            vectorArray.push([lineStartX,lineEndX].map(Number));
            lineEndX++;
        }
        vectorArray.push([lineStartX,lineEndY].map(Number));
        while(lineEndX > lineEndY){
            // fill in y to x
            vectorArray.push([lineStartX,lineEndX].map(Number));
            lineEndX--;
        }
    }else{
        return '.';
    }
}

for(line of inputArray){
    parseLineCoords(line);
}   

for(row of vectorArray){
    // console.log(row)
}
const counts = {};
vectorArray.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
// console.log(counts)

let crossOvers = 0;
for (entry in counts){
    if(counts[entry] > 1){
        crossOvers++;
    }
}

console.log(crossOvers);
