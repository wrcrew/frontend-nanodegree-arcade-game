var activeGame = 1;

var Enemy = function() {

    this.sprite = 'images/enemy-bug.png';
    this.x = -100;

    this.col = 0;
    this.colBehind = 0;
    this.row = Math.floor(Math.random() * 3) + 1;


    this.y = 65 + (83 * (this.row - 1));

    this.speed = Math.floor(Math.random() * 3) + 1;

};

Enemy.prototype.update = function(dt) {

    if (this.x < 506) {
        this.x = (this.x + (this.speed * 1.5));
    }


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
    }

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
    }




    if (this.row === player.row) {
        if (this.col === player.col || this.colBehind === player.col) {
            gameOver();
            ctx.fillText("Game Over", 200, 200);
        }
    }
};


Enemy.prototype.render = function() {

    if (this.x < 650) {

        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    }
};

var allEnemies = [];

var myVar;
var enemyTimeout = function() {
    myVar = setInterval(createEnemy, 600);
};



var createEnemy = function() {
    var enemyNew = new Enemy();
    allEnemies.push(enemyNew);
};

enemyTimeout();


var Player = function() {

    this.sprite = 'images/char-boy.png';
    this.row = 5;
    this.col = 2;
    this.x = 202;
    this.y = 397;

};

Player.prototype.update = function(dt) {

    Player.prototype.handleInput = function(key) {

        if (key === 'left') {
            if (this.col === 0) {} else {
                this.col = this.col - 1;
                //console.log(this.col);
                this.x = colToCoord(this.col);
                //console.log(this.x);
            }
        } else if (key === 'right') {
            if (this.col === 4) {} else {
                this.col = this.col + 1;
                this.x = colToCoord(this.col);
            }
        } else if (key === 'up') {
            if (this.row === 0) {} else {
                this.row = this.row - 1;
                this.y = rowToCoord(this.row);
            }
        } else if (key === 'down') {
            if (this.row === 5) {} else {
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
};



Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if (this.row === 0) {
        ctx.font = "30px Arial";
        ctx.fillText("you win", 10, 100);
        setTimeout(gameOverTimeout, 500);

    }

};


var player = new Player();

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});