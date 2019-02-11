function PlayerModel() {

    this.bindControls = function (snake, pauseGame, resumeGame) {
        var isPaused = false;
        document.addEventListener('keydown', function (e) {
            console.log(e.which);
            switch (e.which) {
                // left 'a'
                case 65:
                    snake.tempDirection = snake.directions.left;
                    break;
                // up 'w'
                case 87:
                    snake.tempDirection = snake.directions.up;
                    break;
                // right 'd' 
                case 68:
                    snake.tempDirection = snake.directions.right;
                    break;
                // down 's'
                case 83:
                    snake.tempDirection = snake.directions.down;
                    break;
                // pause 'space'
                case 32:
                    isPaused = !isPaused;
                    (isPaused) ? pauseGame() : resumeGame();
                    break;
                default: return; // exit this handler for other keys
            }
            e.preventDefault(); // prevent the default action (scroll / move caret)
        });
    }
}