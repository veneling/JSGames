function SnakeModel2(canvasElement, levelMatrix, zoom) {

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
        var spd = 20;
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
    this.tempDirection;
    this.direction = this.directions.getRandomDir();
    
    //Give some space when position snake initially
    do {
        this.headY = 1 + Math.floor(Math.random() * (levelMatrix.length));
        this.headX = 1 + Math.floor(Math.random() * (levelMatrix[this.headY].length));
    }
    while (levelMatrix[this.headY][this.headX] != 'f')
    
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
    this.enlargeTail.setLength(this.length * zoom);
    //array to hold coordinates of all snake segments. at the beginning it gets only the head coordinates
    this.snakeCoords = [{ x: this.headX * zoom, y: this.headY * zoom }];
    this.lastSegment = this.snakeCoords[this.snakeCoords.length - 1];

    this.updateDirection = function (tempDirection) {
        //if the head is in position divisible by the zoom factor then change the direction
        if (this.snakeCoords[0].x % zoom == 0 && this.snakeCoords[0].y % zoom == 0) {
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
        //erase last segment
        gameArea.fillStyle = '#FFFFFF';
        gameArea.fillRect(this.lastSegment.x, this.lastSegment.y, zoom, zoom);
        //paint body
        for (var i = 1; i < this.snakeCoords.length; i++) {
            gameArea.fillStyle = '#888888';
            gameArea.fillRect(this.snakeCoords[i].x, this.snakeCoords[i].y, zoom, zoom);
        }
        //paint head
        gameArea.fillStyle = '#33CC66';
        gameArea.fillRect(this.snakeCoords[0].x, this.snakeCoords[0].y, zoom, zoom);
    }

    this.collisionCheck = function (apple) {
        //check if apple is eaten
        var snakeHeadX = this.snakeCoords[0].x;
        var snakeHeadY = this.snakeCoords[0].y;
        var x = Math.floor(snakeHeadX / zoom);
        var y = Math.floor(snakeHeadY / zoom);
        
        if (snakeHeadX == apple.appleX * zoom && snakeHeadY == apple.appleY * zoom) {
            this.enlargeTail.setLength(zoom * 3);
            this.points += 10;
            this.speed.changeSpeed(-2);

            return {
                collision: true,
                msg: 'apple',
                ev: 'apple'
            };
        }
        //check if snake went out of playfield                
        if (levelMatrix[y][x] == 'b' || levelMatrix[y][x] == 'w') {
            return {
                collision: true,
                msg: 'Snake went off the playfield',
                ev: 'gameOver'
            };
        }

        //check if snake head went into snake body
        for (var i = 1; i < this.snakeCoords.length; i++) {
            if (Math.floor(this.snakeCoords[i].x / zoom) == x && Math.floor(this.snakeCoords[i].y / zoom) == y) {
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