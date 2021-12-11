
const fs = require('fs');
var args = process.argv.slice(2);
var inputArray = fs.readFileSync(args[0]).toString().split("\n");

let depth = 0;
let position = 0;

const directions =  {
    "forward": function(inputP){
        position = position + inputP;
    },
    "down": function(inputD){
        depth = depth + inputD;
    },
    "up": function(inputD){
        depth = depth - inputD;
    }
};

const finalPosition = async(navDirections) =>{
    let left = 0;
    let right = navDirections.length-1;
    while(left < right){
        let dir = navDirections[left].split(' ')[0]; 
        directions[dir](Number(navDirections[left].split(' ')[1]));

        let dir2 = navDirections[right].split(' ')[0]; 
        directions[dir2](Number(navDirections[right].split(' ')[1]));

        left++;
        right--;
    }
    console.log(depth*position);
}

finalPosition(inputArray);