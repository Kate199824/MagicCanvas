function randomIntFromRange(min, max, except) {
    let res = Math.floor(Math.random() * (max - min + 1) + min);
    while(res === except){
      res = Math.floor(Math.random() * (max - min + 1) + min);
    }
    return res;
}

function randomFloatFromRange(min, max, except) {
   let res = Math.random() * (max - min + 1) + min;
   while(res === except) {
     res = Math.random() * (max - min + 1) + min;
   }
   return res;
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

module.exports = { randomIntFromRange, randomColor, distance, randomFloatFromRange}
