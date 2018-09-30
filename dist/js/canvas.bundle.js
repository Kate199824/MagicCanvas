/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/canvas.js":
/*!***********************!*\
  !*** ./src/canvas.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

var _utils2 = _interopRequireDefault(_utils);

var _math = __webpack_require__(/*! ./math */ "./src/math.js");

var _math2 = _interopRequireDefault(_math);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

var mouse = {
    x: innerWidth / 3,
    y: innerHeight / 3,
    mass: 10,
    radius: 10
};

var colors = ['#2185C5', '#7ECEFD', '#FF7F66'];

// Event Listeners
addEventListener('mousemove', function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener('resize', function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});

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

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = this.color;
        c.stroke();
        c.save();
        c.fillStyle = this.color;
        c.globalAlpha = this.opacity;
        c.fill();
        c.restore();
        c.closePath();
    };

    this.update = function () {
        // this.speed.x = this.speed.x + this.acceleration.x;
        // this.speed.y = this.speed.y + this.acceleration.y;
        //move
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
        // this.speed.y = this.speed.y + this.acceleration.y;
        //change direction when reach border
        if (this.x + this.radius + this.velocity.x >= innerWidth || this.x - this.radius + this.velocity.x <= 0) {
            this.velocity.x = -this.velocity.x;
        }
        if (this.y + this.radius + this.velocity.y >= innerHeight || this.y - this.radius + this.velocity.y <= 0) {
            this.velocity.y = -this.velocity.y;
        }
        //change opacity when touch mouse
        if (_utils2.default.distance(this.x, this.y, mouse.x, mouse.y) < 80 && this.opacity < this.maxOpacity) {
            this.opacity += 0.001;
            this.opacity = Math.max(this.opacity, this.maxOpacity);
        } else if (this.opacity > 0) {
            this.opacity -= 0.005;
            this.opacity = Math.max(this.opacity, 0);
        }

        this.draw();
    };
}

function hasOverlap(ballArray, ball) {
    for (var i = 0; i < ballArray.length; i++) {
        if (_utils2.default.distance(ballArray[i].x, ballArray[i].y, ball.x, ball.y) < ballArray[i].radius + ball.radius) {
            return true;
        }
    }
    return false;
}

// Implementation
var ballArray = [];
var testBall = void 0;
function init() {
    console.log("init");
    // testBall = new Ball(innerWidth/2,innerHeight/2,20,colors[1],0.6,0,0);
    ballArray = [];
    var maxRadius = 60;
    for (var i = 0; i < 300; i++) {
        var speedX = _utils2.default.randomFloatFromRange(-1, 1, 0);
        var speedY = _utils2.default.randomFloatFromRange(-1, 1, 0);
        var color = _utils2.default.randomColor(colors);
        var maxOpacity = 0.6;
        var x = _utils2.default.randomIntFromRange(maxRadius + 1, innerWidth - maxRadius - 1, 0);
        var y = _utils2.default.randomIntFromRange(maxRadius + 1, innerHeight - maxRadius - 1, 0);
        var radius = _utils2.default.randomFloatFromRange(8, maxRadius, 0);
        var ball = new Ball(x, y, radius, color, maxOpacity, speedX, speedY);
        while (hasOverlap(ballArray, ball)) {
            x = _utils2.default.randomIntFromRange(25, innerWidth - 25, 0);
            y = _utils2.default.randomIntFromRange(25, innerHeight - 25, 0);
            radius = _utils2.default.randomFloatFromRange(10, 20, 0);
            ball = new Ball(x, y, radius, color, maxOpacity, speedX, speedY);
        }

        ballArray.push(ball);
    }
}

// Animation Loop
function animate() {
    console.log("ani");
    c.clearRect(0, 0, innerWidth, innerHeight);
    // testBall.update();
    // myMath.attractionGravity(mouse,testBall);
    requestAnimationFrame(animate);

    for (var i = 0; i < ballArray.length; i++) {
        _math2.default.attractionGravity(mouse, ballArray[i]);
        for (var j = 0; j < ballArray.length; j++) {
            if (_utils2.default.distance(ballArray[i].x, ballArray[i].y, ballArray[j].x, ballArray[j].y) <= ballArray[i].radius + ballArray[j].radius) {
                _math2.default.resolveCollision(ballArray[i], ballArray[j]);
            }
        }
        ballArray[i].update();
    }
}

init();
animate();

/***/ }),

/***/ "./src/math.js":
/*!*********************!*\
  !*** ./src/math.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function rotate(velocity, angle) {
  var rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
  };

  return rotatedVelocities;
}

function resolveCollision(particle, otherParticle) {
  var xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
  var yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

  var xDist = otherParticle.x - particle.x;
  var yDist = otherParticle.y - particle.y;

  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    var angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

    var m1 = particle.mass;
    var m2 = particle.mass;

    var u1 = rotate(particle.velocity, angle);
    var u2 = rotate(otherParticle.velocity, angle);

    var v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
    var v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

    var vFinal1 = rotate(v1, -angle);
    var vFinal2 = rotate(v2, -angle);

    particle.velocity.x = vFinal1.x;
    particle.velocity.y = vFinal1.y;

    otherParticle.velocity.x = vFinal2.x;
    otherParticle.velocity.y = vFinal2.y;
  }
}

function attractionGravity(mouse, particle) {
  var G = 15;
  var angle = Math.atan((particle.y - mouse.y) / (mouse.x - particle.x));

  var M = mouse.mass;
  var m = particle.mass;

  var distance = _utils2.default.distance(mouse.x, mouse.y, particle.x, particle.y);
  if (distance <= particle.radius + mouse.radius) {
    particle.velocity.x = 0;
    particle.velocity.y = 0;
    return;
  }

  var F = G * M * m / (distance * distance);

  var a = F / m;

  var ay = a * Math.cos(angle) * (particle.y > mouse.y ? -1 : 1);
  var ax = a * Math.cos(angle) * (particle.x > mouse.x ? -1 : 1);

  particle.velocity.x += ax;
  particle.velocity.y += ay;
}

module.exports = { resolveCollision: resolveCollision, attractionGravity: attractionGravity };

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function randomIntFromRange(min, max, except) {
    var res = Math.floor(Math.random() * (max - min + 1) + min);
    while (res === except) {
        res = Math.floor(Math.random() * (max - min + 1) + min);
    }
    return res;
}

function randomFloatFromRange(min, max, except) {
    var res = Math.random() * (max - min + 1) + min;
    while (res === except) {
        res = Math.random() * (max - min + 1) + min;
    }
    return res;
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
    var xDist = x2 - x1;
    var yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

module.exports = { randomIntFromRange: randomIntFromRange, randomColor: randomColor, distance: distance, randomFloatFromRange: randomFloatFromRange };

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map