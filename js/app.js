var activeGame = 1;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    // 1 is left and 2 is right
    this.col = 0;
    this.colBehind = 0;
    this.row = Math.floor(Math.random() * 3) + 1;
    //console.log(this.x);

    this.y = 65 + (83 * (this.row - 1));

    this.speed = Math.floor(Math.random() * 3) + 1;
    //console.log(this.speed);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //console.log(activeGame);

    if (this.x < 506) {
    this.x = (this.x + (this.speed * 1.5));
    };
    //ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //console.log(allEnemies);


    if (this.x > 505) {
        this.col = 5;
    } else if (this.x > 325) {
            this.col = 4;
        } else if (this.x > 225) {
                this.col = 3;
            } else if (this.x > 125) {
                    this.col = 2;
                } else if (this.x > 25) {
                    this.col = 1;
                    };

    if (this.x > 480) {
        this.colBehind = 5;
    } else if (this.x > 380) {
            this.colBehind = 4;
        } else if (this.x > 280) {
                this.colBehind = 3;
            } else if (this.x > 180) {
                    this.colBehind = 2;
                } else if (this.x > 80) {
                    this.colBehind = 1;
                    };

//var pauseEnemy = function() {
//   this.speed = 0;
//}


    if (this.row == player.row) {
        if (this.col == player.col || this.colBehind == player.col) {
            //pauseEnemy();
            gameOver();
            ctx.fillText("Game Over", 200, 200);
            //console.log(this.speed);
        }
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    if (this.x < 650) {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //console.log(this.x);
    };
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player




//var enemy1 = new Enemy();
//var enemy2 = new Enemy();
//var enemy3 = new Enemy();
var allEnemies = [];

//console.log(allEnemies);

var myVar;
var enemyTimeout = function() {
    myVar = setInterval(createEnemy, 600);
};



var createEnemy = function() {
        var enemyNew = new Enemy();
        allEnemies.push(enemyNew);
        //console.log(allEnemies);
};

enemyTimeout();


var Player = function() {

    this.sprite = 'images/char-boy.png';
    this.row = 5;
    this.col = 2;
    this.x = 202;
    this.y = 397;
    //console.log(this.col + "col");
};

Player.prototype.update = function(dt) {

    Player.prototype.handleInput = function(key) {

        //console.log(this.row+ "row in func");
        //console.log(this.col+ "col in func")
        //console.log(key);
        //console.log(this.x+ "x again");
        //console.log(this.y+ "y in func");

            if (key == 'left') {
                if (this.col == 0) {}
                    else {
                this.col = this.col - 1;
                //console.log(this.col);
                this.x = colToCoord(this.col);
                //console.log(this.x);
            }
            } else if (key == 'right') {
                if (this.col == 4) {}
                    else {
                    this.col = this.col + 1;
                    this.x = colToCoord(this.col);
                };
            } else if (key == 'up') {
                if (this.row == 0) {}
                    else {
                    this.row = this.row - 1;
                    this.y = rowToCoord(this.row);
                }
            } else if (key == 'down') {
                if (this.row == 5) {}
                    else {
                    this.row = this.row + 1;
                    this.y = rowToCoord(this.row);
                }
            }
        };
};

var rowToCoord = function(gridValue) {
        gridValue = 70 + (83 * (gridValue - 1));
        return gridValue;
    };

var colToCoord = function(gridValue) {
    gridValue = gridValue * 101;
    return gridValue;
}



Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //console.log(this.row);
    if (this.row == 0) {
        ctx.font = "30px Arial";
        ctx.fillText("you win", 10, 100);
        setTimeout(gameOverTimeout, 500);

    }

};

var gameOverTimeout = function() {

    activeGame = 0;
    ctx.clearRect(0, 0, 505, 606);
    allEnemies.length = 0;
    player.row = 5;
    player.col = 2;
    player.x = 202;
    player.y = 397;

};

var gameOver = function() {

    ctx.font = "30px Arial";
    ctx.fillText("GAME OVER", 300, 300);
    //console.log("game over");



    setTimeout(gameOverTimeout, 0);


};

var playerWins = function() {

};

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


