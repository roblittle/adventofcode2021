
const fs = require('fs');
var args = process.argv.slice(2);
var inputArray = fs.readFileSync(args[0]).toString().split("\n");

const sonarSweep = async(args) => {
    let goingDeeper = 0;
    let left = 0;
    let right = args.length-1;
    while(left < right){
        if(args[left] < args[left+1]) goingDeeper++;
        if(args[right] > args[right-1])goingDeeper++;
        left++;
        right--;
    }

    console.log(goingDeeper);
    return goingDeeper;
};
sonarSweep(inputArray);
