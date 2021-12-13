
const fs = require('fs');
var args = process.argv.slice(2);
var inputArray = fs.readFileSync(args[0]).toString().split("\n");

const BINARY = 2;

let o2GenRating = '';
let c02ScrubRating = '';
const lifeSupportRating = function(){
    return parseInt(o2GenRating, BINARY) * parseInt(c02ScrubRating, BINARY);
};

var O2BitMatrix = inputArray.map(function(el){ return el.split("");});
var C02BitMatrix = inputArray.map(function(el){ return el.split("");});

const locate = function(array, target) {
    // for each column
    for (var col=0; col<array[0].length; col++) {
        // count the zeros from every row
        zeros = 0
        for (var row=0; row<array.length; row++) {
            if (array[row][col] == "0") {
                zeros++
            }
        }
        // apply filtering on zero count per column based on target type (o2/co2)
        if (zeros > array.length/2) {
            if (target == "O2") {
                search = "0"
            } else {
                search = "1"
            }
        } else {
            if (target == "O2") {
                search = "1"
            } else {
                search = "0"
            }
        }
        // use filter set above to apply 'are we keeping this or tossing it' based on the zero count + target type combo
        for (var row=0; row<array.length; row++) {
            if (array[row][col] != search) {
                array.splice(row, 1)
                row--
            }
        }
        // were done
        if (array.length == 1) {
            break
        }
    }
    
    return array[0].join("")
}

o2GenRating = locate(O2BitMatrix, "O2");
c02ScrubRating = locate(C02BitMatrix, "co2");
console.log(lifeSupportRating())
