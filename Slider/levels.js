class Level {

    constructor() {
        this.currentLevelWidth = 0;
        this.currentLevelHeight = 0;
        this.levelArray = [];
    }

    get levels() { return this.constructor.levels; }
    set levels(value) { }

    initLevel(level) {
        this.currentLevelWidth = this.levels[level].width;
        this.currentLevelHeight = this.levels[level].height;
        this.levelArray = [];
    }

    draw(level, type, container) {
        //level - number of level
        //type - maze/solution
        //container - html element where the level is to be drawn
        if (this.levels[level] === undefined) {
            throw RangeError('Level ' + level + ' does not exists');
        }
        this.initLevel(level);
        let blockCodes = ((type == 'maze') ? this.levels[level].matrix : this.levels[level].solution);
        let counter = -1;
        let table = document.createElement('table');
        let isEmpty = false;

        for (var y = 0; y < this.currentLevelHeight; y++) {
            let tr = document.createElement('tr');
            this.levelArray.push([]);

            for (var x = 0; x < this.currentLevelWidth; x++) {
                let blockCode = blockCodes[++counter];
                let bt = blockCode.substr(0, 1);
                let bc = blockCode.substr(1, 1);
                (bc == 'e') ? this.levelArray[y].push(0) : this.levelArray[y].push(1);

                let el = new Element();
                let elSVG;

                switch (bc) {
                    case '0':
                        elSVG = el.createCE(); break;
                    case '1':
                        elSVG = el.createCE(90); break;
                    case '2':
                        elSVG = el.createCE(180); break;
                    case '3':
                        elSVG = el.createCE(270); break;
                    case '4':
                        elSVG = el.createLine(90); break;
                    case '5':
                        elSVG = el.createLine(); break;
                    case '6':
                        elSVG = el.createStartEnd(); break;
                    case '7':
                        elSVG = el.createStartEnd(90); break;
                    case '8':
                        elSVG = el.createStartEnd(180); break;
                    case '9':
                        elSVG = el.createStartEnd(270); break;
                    case 'a':
                        elSVG = el.createDot(); break;
                    case 'e':
                        elSVG = el.createEmpty();
                        isEmpty = true;
                        break;
                    default:
                        break;
                }

                let td = document.createElement('td');
                td.style.backgroundImage = el.SvgToString(elSVG);
                td.setAttribute('id', y + '' + x);
                td.setAttribute('width', '90px');
                td.setAttribute('height', '90px');
                td.setAttribute('isEmpty', isEmpty);
                tr.appendChild(td);
                isEmpty = false;
            }
            table.appendChild(tr);
        }

        container.appendChild(table);
    }

    fillInEventListeners(gameTable) {

        let copyLevelArray = [];
        let evt = (e) => {
            e = e || window.event;
            let target = e.target || e.srcElement,
                id = target.id;
            let y = parseInt(id.substr(0, 1));
            let x = parseInt(id.substr(1, 1));

            console.log(this.levelArray[y][x].canMoveTo);
        }

        for (let y = 0; y < gameTable.rows.length; y++) {
            copyLevelArray.push([]);
            let row = gameTable.rows[y];
            for (let x = 0; x < row.cells.length; x++) {

                let cell = {
                    canMoveTo: [],
                    isClicked: false,
                    movable: true //except for the start and end element
                };
                console.log('cell ' + gameTable.rows[y].cells[x].getAttribute('id') + ' ' + gameTable.rows[y].cells[x].getAttribute('isEmpty'));
                if (x > 0 && gameTable.rows[y].cells[x - 1]) {
                    if (gameTable.rows[y].cells[x - 1].getAttribute('isEmpty') == 'true')
                        cell.canMoveTo.push('left');
                }
                if (x < row.cells.length - 1 && gameTable.rows[y].cells[x + 1].getAttribute('isEmpty') == 'true') {
                    cell.canMoveTo.push('right');
                }
                if (y > 0 && gameTable.rows[y - 1].cells[x]) {
                    if (gameTable.rows[y - 1].cells[x].getAttribute('isEmpty') == 'true')
                        cell.canMoveTo.push('up');
                }
                if (y < gameTable.rows.length - 1 && gameTable.rows[y + 1].cells[x].getAttribute('isEmpty') == 'true') {
                    cell.canMoveTo.push('down');
                }

                copyLevelArray[y][x] = cell;
                row.cells[x].addEventListener('click', evt, false);
            }
        }
        this.levelArray = [].concat(copyLevelArray);
    }
}




/*
     first digit legend - defines block type
        0 - regular element
        1 - start element
        2 - end element
        3 - static element
        e - empty
        ----
        second digit legend - defines block connectors
        0 - up right
        1 - right down
        2 - down left
        3 - left up
        4 - left right
        5 - up down
        6 - from up to mid of square
        7 - from right to mid of square
        8 - from down to mid of square
        9 - from left to mid of square
        a - hole in mid of the square
        e - empty    
    */


Level.levels = [
    {
        width: 4,
        height: 4,
        matrix: ['01', '02', 'ee', '05', '03', '16', '02', '13', '00', '04', '29', '01', 'ee', '03', '04', '02'],
        solution: ['01', '02', 'ee', 'ee', '05', '16', 'ee', 'ee', '00', '04', '29', 'ee', 'ee', 'ee', 'ee', 'ee'],
        time: 60
    },
    {
        width: 4,
        height: 4,
        matrix: ['01', '04', '02', '0a', '03', '16', 'ee', '03', '05', '0a', '29', '01', 'ee', '03', '04', '0a'],
        solution: ['01', '04', '02', '0a', '03', '16', 'ee', '03', '05', '0a', '29', '01', 'ee', '03', '04', '0a'],
        time: 60
    }
];