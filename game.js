// document.addEventListener('DOMContentLoaded', function() {
//     let $hp = document.getElementById('harryGame');
//     let $scene = document.getElementById('scene'); 
// });
// let vp1 = 0;
// let bp1 = [];
// let $hp = document.getElementById('harryGame');
// let $scene = document.getElementById('scene');
// let $bullet = document.getElementById("bullet");

// function moveHP($hp, v) {
//     let position = $hp.offsetLeft;
//     const limit = $scene.offsetWidth - $hp.offsetWidth;
//     if (position < 0) {
//         let v = 0;
//         position = 0;
//     }
//     if (position > limit) {
//         let v = 0;
//         position = limit;
//     }
//     $hp.style.left = position + v + "px";
// }

// function sendBullet($bullet, v) {
//     let position = $bullet.offsetTop;
//     // const limit = $scene.offsetHeight - $bullet.offsetHeight;
//     if (position < 0) {
//         let v = 0;
//         position = 0;

//         //Ramener la balle à Harry quand elle sort de l'écran
//         if($bullet.style.top = position - 10 + "px") {
//             position = $scene.offsetWidth - $hp.offsetWidth;
//         }
//     }

//     // if (position > limit) {
//     //     let v = 0;
//     //     position = limit;
//     // }

//     $bullet.style.top = position + v + "px";
// }

// document.addEventListener("keydown", function(event) {
//     switch (event.code) {
//         case "KeyQ": // move player 1 up
//         vp1 = -10;
//         break;
//         case "KeyP": // move player 1 down
//         vp1 = 10;
//         break;
//     }
// });

// document.addEventListener("keyup", function(event) {
//     switch (event.code) {
//       case "KeyQ":
//       case "KeyP":
//         // stop player 1
//         vp1 = 0;
//         break;
//       case "Space":
//         // start/pause the game
//         break;
//     }
// });

// document.addEventListener("keydown", function(event) {
//     switch (event.code) {
//         case "KeyS": // bullet 1 up
//             sendBullet($bullet, bp1 = -10);
//         break;
//     }
// });
    
// function gameLoop() {
//     moveHP($hp, vp1);
//     sendBullet($bullet, bp1);
    
//     requestAnimationFrame(gameLoop);
// }

// requestAnimationFrame(gameLoop);


//On définit une fonction de construction d'objet
function Sprite (filename, left, top, height) {
    this._node = document.createElement("img");
    this._node.src = filename;
    this._node.style.position = "absolute";
    document.body.appendChild(this._node);

    Object.defineProperty(this, "left", {
        get: function() {
            return this._left;
        },
        set: function(value) {
            this._left = value;
            this._node.style.left = value + "px";
        }
    });

    Object.defineProperty(this, "top", {
        get: function() {
            return this._top;
        },
        set: function(value) {
            this._top = value;
            this._node.style.top = value + "px";
        }
    });

    Object.defineProperty(this, "display", {
        get: function() {
            return this._node.style.display;
        },
        set: function(value) {
            this._node.style.display = value;
        }
    });

    Object.defineProperty(this, "height", {
        get: function() {
            return this._node.style.height;
        },
        set: function(value) {
            this._height = value;
            this._node.style.height = value + "px";
        }
    });

    this.left = left;
    this.top = top;
    this.height = height;
};

//On a sur l'objet construit un tableau de méthode: le prototype
//On "capture" le this pour pouvoir le réutiliser 
Sprite.prototype.startAnimation = function( fct, interval) {
    if (this._clock) window.clearInterval (this._clock);
    var _this = this;
    this._clock = window.setInterval( function() {
        fct( _this);
    }, interval);
};

Sprite.prototype.stopAnimation = function() {
    window.clearInterval(this._clock);
};

Sprite.prototype.checkCollision = function (other) {
    //on a inversé le sens de la contrainte
    return !( (this.top + this._node.height < other.top) ||
                this.top > (other.top + other._node.height) ||
                (this.left + this._node.width < other.left) ||
                this.left > (other.left + other._node.width));
};
  