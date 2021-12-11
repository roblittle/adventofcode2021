
const fs = require('fs');
var args = process.argv.slice(2);
var inputArray = fs.readFileSync(args[0]).toString().split("\n");

let depth = 0;
let position = 0;
let aim = 0;

const directions =  {
    "forward": function(inputP){
        position = position + inputP;
        depth = depth + (aim * inputP);
    },
    "down": function(inputD){
        aim = aim + inputD;
    },
    "up": function(inputD){
        aim = aim - inputD;
    }
};

const finalPosition = async(navDirections) =>{
    let left = 0;
    let right = navDirections.length-1;
    // can't do double-pointer in reality... as order really matters in math!
    while(left < right){
        let dir = navDirections[left].split(' ')[0]; 
        directions[dir](Number(navDirections[left].split(' ')[1]));
        left++;
    }
    // don't forget the last item as input presumes no empty final line.
    let dir2 = navDirections[right].split(' ')[0]; 
    directions[dir2](Number(navDirections[right].split(' ')[1]));

    console.log(depth*position);
}

finalPosition(inputArray);