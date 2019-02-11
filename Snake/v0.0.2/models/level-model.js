function LevelModel() {
    
    this.loadLevel = function (level) {
        //load the level from the levels folder and returns it as two dimentional matrix
        // level - number representing the requested level to return
        if (levels.hasOwnProperty(level)) {
            return levels.transformToMatrix(levels[level]['matrix']);
        }
    }
    
    this.loadLevelZoom = function(level) {
        try {
            return levels[level]['zoom'];
        } catch (error) {
            console.log(error);
            throw ReferenceError('Unable to load the zoom from the level');
        }
    }

    this.drawLevel = function (canvasElement, msgBox, scoreCounter, msgBoard, levelMatrix, zoom) {                
        
        var matrixWidth = levels.getLongestRow(levelMatrix);
        var matrixHeight = levelMatrix.length;
        
        canvasElement.width = msgBoard.style.width = matrixWidth * zoom;
        canvasElement.height = matrixHeight * zoom;
        msgBox.style.width = msgBoard.style.width / 2;
        scoreCounter.style.width = msgBoard.style.width / 2;
        scoreCounter.innerHTML = 'Score: 0';

        var gameArea = canvasElement.getContext("2d");
        
        for(var y = 0; y < levelMatrix.length; y++) {
            for(var x = 0; x < levelMatrix[y].length; x++) {
                if(levelMatrix[y][x] == 'b') {
                    gameArea.fillStyle = 'Lavender';
                    gameArea.fillRect(x * zoom, y * zoom, zoom, zoom);
                } else if (levelMatrix[y][x] == 'w') {
                    gameArea.fillStyle = 'SlateGray';
                    gameArea.fillRect(x * zoom, y * zoom, zoom, zoom);
                }
            }
        }
    }
    
    // level matrix symbols coding
    // e - empty space. it occupies space in the matrix but is not drawn.
    // b - border
    // f - free space
    // w - wall (cannot be passed by the snake)
    var levels = {
        transformToMatrix: function (oneDimLevelArray) {
            var twoDimLevelArray = [];
            for (var i = 0; i < oneDimLevelArray.length; i++) {
                twoDimLevelArray[i] = [];
                for (var j = 0; j < oneDimLevelArray[i].length; j++) {
                    twoDimLevelArray[i][j] = oneDimLevelArray[i].charAt(j);
                }
            }

            return twoDimLevelArray;
        },
        getLongestRow: function (levelMatrix) {
            var longestRow = 0;
            for (var i = 0; i < levelMatrix.length; i++) {
                if(levelMatrix[i].length > longestRow) {
                    longestRow = levelMatrix[i].length;
                }
            }
            return longestRow;
        },
        1: {matrix :[
            'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
            'bffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffb',
            'bffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffb',
            'bffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffb',
            'bffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffb',
            'bffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffb',
            'bffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffb',
            'bffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffb',
            'bffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffb',
            'bffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffb',
            'bffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffb',
            'bffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffb',
            'bffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffb',
            'bffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffb',
            'bffffffffffffffffffffffffffffffwfffffffffffffffffffffffffffffffffffffb',
            'bffffffffffffffffffffffffffffffwfffffffffffffffffffffffffffffffffffffb',
            'bfffffffffffffffffffffffwwwwwwwwwwwwwwwffffffffffffffffffffffffffffffb',
            'bffffffffffffffffffffffffffffffwfffffffffffffffffffffffffffffffffffffb',
            'bffffffffffffffffffffffffffffffwfffffffffffffffffffffffffffffffffffffb',
            'bffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffb',
            'bffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffb',
            'bffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffb',
            'bffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffb',
            'bffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffb',
            'bffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffb',
            'bffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffb',
            'bffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffb',
            'bffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffb',
            'bffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffb',
            'bffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffb',
            'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
        ],
        zoom: 15}
    }
}