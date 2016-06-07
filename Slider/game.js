
/*
var el = new Element();
var ce = el.createCE(270);

var cell = document.getElementById('c14');
cell.style.backgroundImage = el.SvgToString(ce);

var circle = el.createDot();
cell = document.getElementById('c33');
cell.style.backgroundImage = el.SvgToString(circle);

var line = el.createLine();
cell = document.getElementById('c43');
cell.style.backgroundImage = el.SvgToString(line);
line = el.createLine(90);
cell = document.getElementById('c42');
cell.style.backgroundImage = el.SvgToString(line);
line = el.createStartEnd();
cell = document.getElementById('c41');
cell.style.backgroundImage = el.SvgToString(line);
*/

"use strict";

var body = document.getElementsByTagName('body')[0];
var level = new Level();
var levels = level.levels;
var left_panel_maze = document.getElementById('left-panel-maze');
var right_panel_solution = document.getElementById('right-panel-solution');
level.draw(0, 'maze', left_panel_maze);
level.draw(0, 'solution', right_panel_solution);



function playLevel(lvl) {

    var w = window.innerWidth;
    var h = window.innerHeight;
    var levelChooser = document.getElementById('level-chooser');
    var gmwrapper = document.createElement('div');
    gmwrapper.setAttribute('id', 'game-wrapper');
    gmwrapper.style.width = w;
    gmwrapper.style.height = h;

    var gmfield = document.createElement('div');
    gmfield.setAttribute('id', 'game-field');
    var msgDisplay = document.createElement('div');
    msgDisplay.setAttribute('id', 'mgs-display');
    msgDisplay.setAttribute('class', 'outlined');
    var backToMenu = document.createElement('div');
    backToMenu.setAttribute('id', 'back-to-menu');
    backToMenu.setAttribute('class', 'text-centered');
    backToMenu.innerHTML += 'Back to levels list';
    backToMenu.onclick = () => {
        gmwrapper.remove();
        levelChooser.style.visibility = 'visible';
    }

    gmwrapper.appendChild(gmfield);
    gmwrapper.appendChild(msgDisplay);
    gmwrapper.appendChild(backToMenu);
    body.appendChild(gmwrapper);
    levelChooser.style.visibility = 'hidden';

    var level = new Level();
    level.draw(lvl, 'maze', gmfield);
    var gmtable = gmfield.getElementsByTagName('table')[0];
    level.fillInEventListeners(gmtable);
    console.log(level.levelArray);

    gmwrapper.style.position = 'absolute';
    gmwrapper.style.left = parseInt(w / 2 - gmfield.scrollWidth / 2) + 'px';
    gmwrapper.style.top = parseInt(h - h * 0.9) + 'px';

    /*
    
    чертаем нивото
    правим двумерен масив с 0 и 1 на база на нивото. 0 ако клетката е празна, 1 ако е пълна - тр да е сложено във функция
    на база на този масив попълваме евент слушателите в таблицата с която е изчертано нивото - тр да е сложено във функция
    като се цъкне на клетка слушателя проверява дали има само един въможен ход
        ако има само един възможен ход елемента се премества в празната клетка 
        ако има 2 или повече възможни хода се чака следващо цъкане в съседна клетка за да се знае накъде да се премести елемента
    проверява се дали пъзела е нареден
        ако да - край на играта
        ако не
            масива се пренарежда съобразно промяната
            евент слушателите се попълват наново           
    */

    //var levelMatrix = level.fillInLevelArray(lvl, 'maze');
}



