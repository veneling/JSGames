(function () {
    var canvasElement = document.querySelector("#gameArea");
    var msgBox = document.querySelector("#msgBox");
    var scoreCounter = document.querySelector("#scoreCounter");
    var msgBoard = document.querySelector("#msgBoard");
    var engine = new GameController(canvasElement, msgBox, scoreCounter, msgBoard);
} ())

function GameController(canvasElement, msgBox, scoreCounter, msgBoard) {

    var level = new LevelModel();
    var currentLevel = 1;
    var levelMatrix = level.loadLevel(currentLevel);
    var zoom = level.loadLevelZoom(currentLevel);
    var player = new PlayerModel();
    var snake = new SnakeModel2(canvasElement, levelMatrix, zoom);
    var apple = new AppleModel(canvasElement, snake, levelMatrix, zoom);

    var runner;
    var pauseGame = function () {
        clearInterval(runner);
    }
    var resumeGame = function () {
        runner = setInterval(gameRun, snake.speed.getSpeed());
    }

    level.drawLevel(canvasElement, msgBox, scoreCounter, msgBoard, levelMatrix, zoom);
    player.bindControls(snake, pauseGame, resumeGame);
    apple.generateAppleXY();
    apple.paintApple();
    snake.updateDirection(snake.tempDirection);
 
    
    resumeGame();

    function gameRun(canvasElement) {
        snake.updateDirection(snake.tempDirection);
        snake.moveSnake();
        snake.paintSnake();
        var colCheck = snake.collisionCheck(apple);
        if (colCheck.collision) {
            switch (colCheck.ev) {
                case 'apple':
                    document.querySelector("#msgBox").innerHTML = 'Speed: ' + snake.speed.getSpeed();
                    document.querySelector("#scoreCounter").innerHTML = 'Score: ' + snake.points;
                    console.log('current speed ' + snake.speed.getSpeed());
                    apple.generateAppleXY(snake);
                    apple.paintApple(canvasElement);
                    pauseGame();
                    resumeGame();
                    break;
                case 'gameOver':
                    document.querySelector("#msgBox").innerHTML = colCheck.msg;
                    break;
            }
        }
    }
}

function splashStart(canvasElement) {

}