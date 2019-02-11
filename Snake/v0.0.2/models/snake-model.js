function SnakeModel(canvasElement, level, levelNum) {

    var canvasWidth = canvasElement.width / 10;
    var canvasHeight = canvasElement.height / 10;
    this.levelMatrix = level.loadLevel(levelNum);
    this.directions = {
        up: 1,
        right: 2,
        down: 3,
        left: 4,
        getRandomDir: function () {
            var direction = 1 + Math.floor(Math.random() * 4);
            switch (direction) {
                case 1: return this.up; break;
                case 2: return this.right; break;
                case 3: return this.down; break;
                case 4: return this.left; break;
            }
        }
    }

    this.sp = function () {
        var spd = 150;
        return {
            getSpeed: function () {
                return spd;
            },
            setSpeed: function (value) {
                spd = value;
            },
            changeSpeed(value) {
                spd += value;
            }
        }
    };
    this.speed = this.sp();
    this.points = 0;
    this.length = 8;
    
    //Give some space when position snake initially
    do {
        this.headX = 1 + Math.floor(Math.random() * (this.levelMatrix[1][1]));
        this.headY = 1 + Math.floor(Math.random() * (this.levelMatrix.length));
    } while (this.levelMatrix[this.headX][this.headY] != 'f')
    
    //array to hold coordinates of all snake segments. at the beginning it gets only the head coordinates
    this.snakeCoords = [{ x: this.headX, y: this.headY }];
    this.lastSegment = this.snakeCoords[this.snakeCoords.length - 1];
    //counter to track whether the snake went out of the hole
    this.et = function () {
        var len = 0;
        return {
            setLength: function (l) {
                len = l;
            },
            getLength: function () {
                return len;
            },
            decrement: function () {
                len--;
            }
        }
    };
    this.enlargeTail = this.et();
    this.enlargeTail.setLength(this.length);
    this.tempDirection;
    this.direction = this.directions.getRandomDir();

    this.updateDirection = function (tempDirection) {
        switch (tempDirection) {
            case this.directions.up:
                if (this.direction != this.directions.down) {
                    this.direction = this.directions.up;
                }
                break;
            case this.directions.down:
                if (this.direction != this.directions.up) {
                    this.direction = this.directions.down;
                }
                break;
            case this.directions.left:
                if (this.direction != this.directions.right) {
                    this.direction = this.directions.left;
                }
                break;
            case this.directions.right:
                if (this.direction != this.directions.left) {
                    this.direction = this.directions.right;
                }
                break;
            default:
                return;
        }
    }

    this.moveSnake = function () {
        var newHead = {
            x: this.snakeCoords[0].x,
            y: this.snakeCoords[0].y
        };
        switch (this.direction) {
            case this.directions.up: newHead.y--; break;
            case this.directions.right: newHead.x++; break;
            case this.directions.down: newHead.y++; break;
            case this.directions.left: newHead.x--; break;
        }
        this.snakeCoords.unshift(newHead);
        this.lastSegment = this.snakeCoords[this.snakeCoords.length - 1];
        //if the snake went out of her hole remove last element, otherwise decrease the counter
        if (this.enlargeTail.getLength() == 1) {
            this.snakeCoords.pop();
        } else {
            this.enlargeTail.decrement();
        }

    }

    this.paintSnake = function () {
        var gameArea = canvasElement.getContext("2d");
        var factor = 10;
        //erase last segment
        gameArea.fillStyle = '#FFFFFF';
        gameArea.fillRect(this.lastSegment.x * factor, this.lastSegment.y * factor, 10, 10);
        //paint head
        gameArea.fillStyle = '#33CC66';
        gameArea.fillRect(this.snakeCoords[0].x * factor, this.snakeCoords[0].y * factor, 10, 10);
        //paint body
        for (var i = 1; i < this.snakeCoords.length; i++) {
            gameArea.fillStyle = '#888888';
            gameArea.fillRect(this.snakeCoords[i].x * factor, this.snakeCoords[i].y * factor, 10, 10);
        }
    }

    this.collisionCheck = function (apple) {
        //check if apple is eaten
        var snakeHeadX = this.snakeCoords[0].x;
        var snakeHeadY = this.snakeCoords[0].y;
        if (snakeHeadX == apple.appleX && snakeHeadY == apple.appleY) {
            this.enlargeTail.setLength(3);
            this.points += 10;
            this.speed.changeSpeed(-5);

            return {
                collision: true,
                msg: 'apple',
                ev: 'apple'
            };
        }
        //check if snake went out of playfield
        if (snakeHeadX < 0 || snakeHeadY < 0 || snakeHeadX > canvasWidth || snakeHeadY > canvasHeight) {
            return {
                collision: true,
                msg: 'Snake went off the playfield',
                ev: 'gameOver'
            };
        }
        //check if snake head went into snake body
        for (var i = 1; i < this.snakeCoords.length; i++) {
            if (this.snakeCoords[i].x == snakeHeadX && this.snakeCoords[i].y == snakeHeadY) {
                return {
                    collision: true,
                    msg: 'Snake has bitten herself',
                    ev: 'gameOver'
                };
            }
        }

        return {
            collision: false,
            msg: '',
            ev: 'gameOver'
        }
    }
}