class Element {

    constructor() {

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

    SvgToString(el) {
        var container = document.createElement('div');
        container.appendChild(el);
        var svgSource = 'data:image/svg+xml,' + container.innerHTML;
        var url = "url('" + svgSource + "')";
        return url;
    }
    
    move(){
        
    }

    //Creates empty object
    createEmpty() {
        var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
        var svgns = svg.namespaceURI;
        var g = document.createElementNS(svgns, 'g');

        svg.setAttribute('xmlns', svgns);
        svg.setAttributeNS(null, 'width', '100%');
        svg.setAttributeNS(null, "height", '100%');
        svg.setAttributeNS(null, "viewBox", "0 0 50 50");

        svg.appendChild(g);

        return svg;
    }

    //Creates curved (up-right) SVG element
    //rotation should has values 90, 180 or 270
    createCE(rotation) {

        var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
        var svgns = svg.namespaceURI;
        var g = document.createElementNS(svgns, 'g');
        var rect = document.createElementNS(svgns, 'rect');
        var path = document.createElementNS(svgns, 'path');

        svg.setAttribute('xmlns', svgns);
        svg.setAttributeNS(null, 'width', '100%');
        svg.setAttributeNS(null, "height", '100%');
        svg.setAttributeNS(null, "viewBox", "0 0 50 50");

        if (rotation == 90 || rotation == 180 || rotation == 270) {
            g.setAttribute('transform', 'rotate(' + rotation + ' 25 25)');
        }

        rect.style.fill = '#deaa87';
        rect.setAttribute('width', '100%');
        rect.setAttribute('height', '100%');

        path.setAttribute('fill', 'white');
        path.setAttribute('d', 'M20,0 h10 v2 v16 a2,2 0 0 0 2,2 h28 v10 h-38 a2,2 0 0 1 -2,-2 v-28 z');

        g.appendChild(rect);
        g.appendChild(path);
        svg.appendChild(g);

        return svg;
    }

    createLine(rotation) {
        var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
        var svgns = svg.namespaceURI;
        var g = document.createElementNS(svgns, 'g');
        var rect = document.createElementNS(svgns, 'rect');
        var path = document.createElementNS(svgns, 'path');

        svg.setAttribute('xmlns', svgns);
        svg.setAttributeNS(null, 'width', '100%');
        svg.setAttributeNS(null, "height", '100%');
        svg.setAttributeNS(null, "viewBox", "0 0 50 50");

        if (rotation == 90) {
            g.setAttribute('transform', 'rotate(' + rotation + ' 25 25)');
        }

        rect.style.fill = '#deaa87';
        rect.setAttribute('width', '100%');
        rect.setAttribute('height', '100%');

        path.setAttribute('fill', 'white');
        path.setAttribute('d', 'M20,0 v50 H30 v-50 z');

        g.appendChild(rect);
        g.appendChild(path);
        svg.appendChild(g);

        return svg;
    }

    createStartEnd(rotation) {
        var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
        var svgns = svg.namespaceURI;
        var g = document.createElementNS(svgns, 'g');
        var rect = document.createElementNS(svgns, 'rect');
        var path = document.createElementNS(svgns, 'path');

        svg.setAttribute('xmlns', svgns);
        svg.setAttributeNS(null, 'width', '100%');
        svg.setAttributeNS(null, "height", '100%');
        svg.setAttributeNS(null, "viewBox", "0 0 50 50");

        if (rotation == 90 || rotation == 180 || rotation == 270) {
            g.setAttribute('transform', 'rotate(' + rotation + ' 25 25)');
        }

        rect.style.fill = '#7b9095';
        rect.setAttribute('width', '100%');
        rect.setAttribute('height', '100%');

        path.setAttribute('fill', 'white');
        path.setAttribute('d', 'M22,0 h6 h2 v2 v26 a2,2 0 0 1 -2,2 h-6 a2,2 0 0 1 -2,-2 v-26 v-2 h2 z');

        g.appendChild(rect);
        g.appendChild(path);
        svg.appendChild(g);

        return svg;
    }

    //Creates block with white dot in the center
    createDot() {
        var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
        var svgns = svg.namespaceURI;
        var g = document.createElementNS(svgns, 'g');
        var rect = document.createElementNS(svgns, 'rect');
        var circle = document.createElementNS(svgns, 'circle');

        svg.setAttribute('xmlns', svgns);
        svg.setAttributeNS(null, 'width', '100%');
        svg.setAttributeNS(null, "height", '100%');
        svg.setAttributeNS(null, "viewBox", "0 0 50 50");

        rect.style.fill = '#7b9095';
        rect.setAttribute('width', '100%');
        rect.setAttribute('height', '100%');

        circle.setAttribute('cx', '50%');
        circle.setAttribute('cy', '50%');
        circle.setAttribute('r', '6%');
        circle.setAttribute('fill', 'white');

        g.appendChild(rect);
        g.appendChild(circle);
        svg.appendChild(g);

        return svg;
    }
};

