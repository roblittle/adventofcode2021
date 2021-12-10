
const fs = require('fs');
var args = process.argv.slice(2);
var inputArray = fs.readFileSync(args[0]).toString().split("\n").map(Number);

const sonarSweepSingleVal = async(args) => {
    let goingDeeper = 0;
    let left = 0;
    let right = args.length-1;
    while(left < right){
        if(args[left] < args[left+1]) goingDeeper++;
        if(args[right] > args[right-1]) goingDeeper++;
        left++;
        right--;
    };
    console.log(goingDeeper);
    return goingDeeper;
};

const sonarSweepSlidingTripples = async(args) => {
    let goingDeeper = 0;
    let left = 1;                   // INTENTIONALLY, so in 'middle' of left triplet
    let leftSide = 2;               // leftSlide starts +1 to left
    let right = args.length-2;      // INTENTIONALLY, so in 'middle' of right triplet
    let rightSlide = args.length-3; // rightSlide starts -1 to right
    while(left < right && leftSide < rightSlide){
        if(( args[left] + args[left-1] + args[left+1]) < (args[leftSide] + args[leftSide-1] + args[leftSide+1])) goingDeeper++;
        if(( args[right] + args[right-1] + args[right+1]) > ( args[rightSlide] + args[rightSlide-1] + args[rightSlide+1] )) goingDeeper++;
        left++, leftSide++;
        right--, rightSlide--;
    };
    // IMPORTANT, when they are about to cross... do not double count, but do not miss it either. 1x needed!
    if(( args[left] + args[left-1] + args[left+1]) < (args[leftSide] + args[leftSide-1] + args[leftSide+1])) goingDeeper++;
    console.log(goingDeeper);
    return goingDeeper;
};

sonarSweepSingleVal(inputArray);
sonarSweepSlidingTripples(inputArray);