import utils from './utils';
import myMath from './math';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
    x: innerWidth / 3,
    y: innerHeight / 3,
    mass : 10,
    radius: 10,
};

const colors = ['#2185C5', '#7ECEFD', '#FF7F66'];

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
})

// Objects
function Ball(x, y, radius, color, maxOpacity, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.opacity = 0;
    this.maxOpacity = maxOpacity;
    this.velocity = { x: speedX, y: speedY };
    this.mass = radius * radius;


    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.strokeStyle = this.color;
        c.stroke();
        c.save();
        c.fillStyle = this.color;
        c.globalAlpha = this.opacity;
        c.fill();
        c.restore();
        c.closePath();
    }

    this.update = function() {
        // this.speed.x = this.speed.x + this.acceleration.x;
        // this.speed.y = this.speed.y + this.acceleration.y;
        //move
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
        // this.speed.y = this.speed.y + this.acceleration.y;
        //change direction when reach border
        if((this.x+this.radius+this.velocity.x) >= innerWidth || (this.x-this.radius+this.velocity.x) <= 0){
            this.velocity.x = -this.velocity.x;
        }
        if((this.y+this.radius+this.velocity.y) >= innerHeight || (this.y-this.radius+this.velocity.y) <= 0){
            this.velocity.y = -this.velocity.y;
        }
        //change opacity when touch mouse
        if(utils.distance(this.x, this.y, mouse.x, mouse.y) < 80 && this.opacity < this.maxOpacity){
            this.opacity += 0.001;
            this.opacity = Math.max(this.opacity, this.maxOpacity);
        }
        else if(this.opacity > 0){
            this.opacity -= 0.005;
            this.opacity = Math.max(this.opacity, 0);
        }


        this.draw();
    }
}

function hasOverlap(ballArray, ball) {
    for(let i=0;i<ballArray.length;i++){
        if(utils.distance(ballArray[i].x, ballArray[i].y, ball.x, ball.y) < ballArray[i].radius + ball.radius) {
            return true;
        }
    }
    return false;
}

// Implementation
let ballArray = [];
let testBall ;
function init() {
    console.log("init");
    // testBall = new Ball(innerWidth/2,innerHeight/2,20,colors[1],0.6,0,0);
    ballArray = []
    let maxRadius = 60;
    for (let i = 0; i < 300; i++) {
        let speedX = utils.randomFloatFromRange(-1,1,0);
        let speedY = utils.randomFloatFromRange(-1,1,0);
        let color = utils.randomColor(colors);
        let maxOpacity = 0.6;
        let x = utils.randomIntFromRange(maxRadius+1,innerWidth-maxRadius-1,0);
        let y = utils.randomIntFromRange(maxRadius+1,innerHeight-maxRadius-1,0);
        let radius = utils.randomFloatFromRange(8,maxRadius,0);
        let ball = new Ball(x,y,radius,color,maxOpacity,speedX,speedY);
        while(hasOverlap(ballArray, ball)) {
          x = utils.randomIntFromRange(25,innerWidth-25,0);
          y = utils.randomIntFromRange(25,innerHeight-25,0);
          radius = utils.randomFloatFromRange(10,20,0);
          ball = new Ball(x,y,radius,color,maxOpacity,speedX,speedY);
        }

        ballArray.push( ball );
    }
}

// Animation Loop
function animate() {
    console.log("ani")
    c.clearRect(0,0,innerWidth,innerHeight);
    // testBall.update();
    // myMath.attractionGravity(mouse,testBall);
    requestAnimationFrame(animate);

    for(let i=0;i<ballArray.length;i++){
        myMath.attractionGravity(mouse, ballArray[i]);
        for(let j=0;j<ballArray.length;j++) {
          if(utils.distance(ballArray[i].x, ballArray[i].y, ballArray[j].x, ballArray[j].y) <= ballArray[i].radius + ballArray[j].radius) {
            myMath.resolveCollision(ballArray[i], ballArray[j]);
          }
        }
        ballArray[i].update();
    }
}

init();
animate();
