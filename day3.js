
const fs = require('fs');
var args = process.argv.slice(2);
var inputArray = fs.readFileSync(args[0]).toString().split("\n");

const BINARY = 2;

let gammaRate = '';
let epsilonRate = '';
const powerConsumption = function(){
    return parseInt(gammaRate, BINARY) * parseInt(epsilonRate, BINARY);
}

var bitMatrix = inputArray.map(function(el){ return el.split("");});

// COLUMN first parsing... not ROW as normal 2d parsing is...
for(let col=0;col<bitMatrix[0].length;col++){
    let bitsInCol = 0;
    for(let row=0;row<bitMatrix.length;row++){
        if(bitMatrix[row][col]==='1') bitsInCol++;
    }
    if(bitsInCol > Math.ceil(bitMatrix.length/2)){
        gammaRate = gammaRate + '1';
        epsilonRate = epsilonRate + '0';
    }
    else{
        gammaRate = gammaRate + '0';
        epsilonRate = epsilonRate + '1';
    }
}

console.log(gammaRate);
console.log(epsilonRate);
console.log(powerConsumption());
