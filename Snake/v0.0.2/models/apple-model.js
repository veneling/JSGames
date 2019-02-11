function AppleModel(canvasElement, snake, levelMatrix, zoom) {
    var canvas = canvasElement;

    this.generateAppleXY = function () {
        var isAppleOverSnakeCoords = function (appleX, appleY) {
            for (var i = 0; i < snake.snakeCoords.length; i++) {
                if (appleX == snake.snakeCoords[i].x / zoom && appleY == snake.snakeCoords[i].y / zoom) {
                    return true;
                }
            }
            return false;
        }        

        do {
            var appleY = 1 + Math.floor(Math.random() * (levelMatrix.length - 2));
            var appleX = 1 + Math.floor(Math.random() * (levelMatrix[appleY].length - 2));
        }
        while (isAppleOverSnakeCoords.call(this, appleX, appleY) && levelMatrix[appleY][appleX] != 'f')

        this.appleX = appleX;
        this.appleY = appleY;
    }

    this.paintApple = function () {
        var gameArea = canvas.getContext("2d");
        gameArea.fillStyle = '#CC0066';
        gameArea.fillRect(this.appleX * zoom, this.appleY * zoom, zoom, zoom);
    }
}