import { useRef, useEffect } from 'react';
import "./canvas.css";

const CanvasMenu = () => {
  let ref = useRef();

  useEffect(() => {
    let canvas = ref.current;
    let context = canvas.getContext('2d');

        let mouseX = 0;
        let mouseY = 0;
    canvas.addEventListener('mousemove', (event) => {
        mouseX = event.offsetX;
        mouseY = event.offsetY;
    });
    canvas.addEventListener('click', (event) => {
        requestAnimationFrame(main);
    });

    window.addEventListener('resize', () => {
        fitToContainer();
        main();
    });

    fitToContainer(canvas);

    class Vector {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        }
        class Depth {
        constructor(x,y,d,slope) {
            this.x = -1 *(d / (Math.sqrt(1+(slope * slope)))) + x;
            this.y = -1 * ((d * slope) / (Math.sqrt(1+(slope * slope)))) + y;
        }
        }
        class VPX {
        constructor(x, y, slope, y1) {
            const b = (y - (slope * x));
            this.x = (y1 - b) / slope;
            this.y = y1;
        }
        }
        class VPY {
        constructor(x, y, slope, x1) {
            const b = (y - (slope * x));
            this.x = x1;
            this.y = (slope * x1) + b;
        }
        }
        class Road {
        constructor(x,y,width,slope) {
            this.point1 = new Vector(x,y);
            this.width = width;
            this.point2 = new VPX(this.point1.x, this.point1.y, slope, canvas.height);
        }
        draw(context) {
            context.fillStyle='black';
            context.beginPath();
            context.moveTo(this.point1.x, this.point1.y);
            context.lineTo(this.point1.x + this.width, this.point1.y);
            context.lineTo(this.point2.x + this.width, this.point2.y);
            context.lineTo(this.point2.x, this.point2.y);
            context.fill();
        }
        }
        class RoadPerpendicular {
        constructor(start, width, length, slope, loop) {
            this.width = width;
            this.length = length;
            this.margin = 10;
    
            this.pointRP = new Depth(start.x, start.y,loop,slope);
            this.pointRP.x += this.margin;
    
            this.pointRPTF = new Vector(this.pointRP.x - this.length, this.pointRP.y);
            this.pointRPBC = new Depth(this.pointRP.x, this.pointRP.y, this.width, slope);
            this.pointRPBF = new Vector(this.pointRPBC.x - this.length, this.pointRPBC.y);
        }
        draw(context){
            context.beginPath();
            context.moveTo(this.pointRP.x, this.pointRP.y);
            context.lineTo(this.pointRPTF.x, this.pointRPTF.y);
            context.lineTo(this.pointRPBF.x, this.pointRPBF.y);
            context.lineTo(this.pointRPBC.x, this.pointRPBC.y);
            context.fillStyle='black';
            context.fill();
        }
        }
    
        class Building {
        constructor(x,y, slope, loop, width, height, depth, startMargin) {
            this.width = width;
            this.startMargin = startMargin;
            this.height = height;
            this.depth = depth;
            this.color = 'white';
            this.colorStroke = 'black';
    
            this.start = new Depth(x,y,loop,slope);
            this.pointG = new Vector(this.start.x - this.startMargin, this.start.y);
    
            this.pointD = new Depth(this.pointG.x, this.pointG.y, this.depth, slope);
            this.pointB = new Vector(this.pointD.x, this.pointD.y - this.height);
            this.pointA = new Vector(this.pointD.x - this.width, this.pointB.y);
    
            this.pointF = new VPY(this.pointB.x, this.pointB.y, slope, this.pointG.x);
            this.pointE = new VPX(this.pointA.x, this.pointA.y, slope, this.pointF.y);
            this.path = 'path';

            //Level
            this.levelMargin = 2;
            this.levelWidth = getRndInteger(10, this.width - (this.levelMargin * 2));
            this.levelDepth = getRndInteger(3, this.depth - (this.levelMargin * 2));
            this.levelHeight = getRndInteger(1, 20);
            this.levelStartMargin = new Vector(getRndInteger(this.levelMargin, this.width - this.levelWidth), getRndInteger(this.levelMargin, this.depth - this.levelDepth));
            this.levelPointG = new Depth(this.pointF.x - this.levelStartMargin.x, this.pointF.y, this.levelStartMargin.y, slope);
            this.levelPointD = new Depth(this.levelPointG.x, this.levelPointG.y, this.levelDepth, slope)
            this.levelPointB = new Vector(this.levelPointD.x, this.levelPointD.y - this.levelHeight);
            this.levelPointA = new Vector(this.levelPointD.x - this.levelWidth, this.levelPointB.y);
            this.levelPointF = new VPY(this.levelPointB.x, this.levelPointB.y, slope, this.levelPointG.x);
            this.levelPointE = new VPX(this.levelPointA.x, this.levelPointA.y, slope, this.levelPointF.y);
    
            //Grass
            this.grass = new Vector(this.start.x - 10,this.start.y);
            this.grassBC = new Depth(this.grass.x, this.grass.y, 20, slope); //That random number is max depth
            this.grassLength = this.startMargin - (10 * 2);
    
            //window
            this.window = 10;
            this.windowClearance = 5;
            this.numWindows = (this.width - (this.windowClearance * 2)) / (this.window + this.windowClearance);
            this.centerQuantity = (this.width - (this.numWindows * 15)+5) / 2;
            
        }
        get returnStart() {
            return this.pointG.x;
        }
        
        draw(context) {
            context.strokeStyle = this.colorStroke;
            //if (getRndInteger(1,1000) > 998) {context.fillStyle = 'orange'}
            drawCube(context, this.pointA, this.width, this.height, this.pointB, this.pointD, this.pointE, this.pointF, this.pointG);
        }
        update(mouseX, mouseY, go) {
            if ((this.pointA.x < mouseX && mouseX < this.pointF.x) && (this.pointE.y < mouseY && mouseY < this.pointD.y) && go) {
                return false;
            }
            else if (go) {
                return true;
            }
            else {
            }
        }
        style(context) {
            context.fillStyle = this.color;
        }
        changeColor(context) {
            context.fillStyle = 'red';
        }
        drawLevel(context) {
            context.strokeStyle = this.colorStroke;
            drawCube(context, this.levelPointA, this.levelWidth, this.levelHeight, this.levelPointB, this.levelPointD, this.levelPointE, this.levelPointF, this.levelPointG);
        }
        drawWindow(context) {
            for(let j = this.pointTF.y + this.windowClearance; j < this.pointBC.y - this.window; j += this.window + this.windowClearance) {
    
                for(let i = this.pointTF.x + this.centerQuantity; i < this.pointTC.x - this.window; i += this.window + this.windowClearance) {
                    context.beginPath();
                    context.rect(i, j, this.window, this.window);
                    context.stroke();
                    context.fill();
                }
            }
        }
        drawGrass(context) {
            context.beginPath();
                context.moveTo(this.grass.x, this.grass.y);
                context.lineTo(this.grass.x - this.grassLength, this.grass.y);
                context.lineTo(this.grassBC.x - this.grassLength, this.grassBC.y);
                context.lineTo(this.grassBC.x, this.grassBC.y);
                context.lineTo(this.grass.x, this.grass.y);
                context.fillStyle = 'green';
                context.fill();
                context.fillStyle = this.color
        }
        }
    
        const buildings = [];
        const roadsVertical = [];
        const roadsHorizontal = [];
    
        
        //const vPoint = {x:canvas.width, y:0};
        //const origin = {x:0, y:canvas.height};
        const slope = -1;//(origin.y - vPoint.y) / (origin.x - vPoint.x);
    
        let rowLength = getRndInteger(100,300); //190;
        let prev = 'none'; //this ensures there isn't two horizontal roads in a row
        for (let j = 0; j < canvas.width*2 + rowLength; j += rowLength ){ //loop for each horizontal row
            let row = {x: 100 + j, y: 0};
    
            for (let i = 0; i < Math.hypot(canvas.width, canvas.height)+100; i += 5){ //loop for each vertical row
                let type = getRndInteger(1,100);
    
                if (type > 80 && prev !== 'road') { //road
                    let width = getRndInteger(2,10);
                    let emptyLot = getRndInteger(0,5);
                    roadsHorizontal.push(new RoadPerpendicular(row, width, rowLength, slope, i));
                    i += width + emptyLot;
                    prev = 'road';
                }
                else { //building
                    let quantity = getRndInteger(1,5);
                    let rowLengthAndRoad = rowLength -20; //because 10 each for margin on both sides
                    let width = rowLengthAndRoad / quantity;
                    let gapList = [];
                
                    for (let k = quantity - 1; k >= 0; k--) { //buildings in horizontal row
                        let startx = row.x - (width * k);
                        let margin = 10;
                        let buildingWidth = getRndInteger(margin + 5, width) - margin;
                        let height = getRndInteger(10, 50);
                        if (getRndInteger(1,11) > 9){height = getRndInteger(100,200)} //towers
                        let depth = getRndInteger(5,30);
                        let emptyLot = getRndInteger(0, 5);
                        
                        let startMargin = getRndInteger(margin, width - buildingWidth);
                        buildings.push(new Building(startx,row.y,slope, i, buildingWidth, height, depth, startMargin));
                        
                        gapList.push(depth + emptyLot);
                    }
                    i += Math.max(...gapList);
                    //building1.drawWindow(context);
                    prev='building';
                    }
                    
            }
            roadsVertical.push(new Road(row.x, row.y, 10, slope)); //vertical road
            rowLength = getRndInteger(100,300);
        }
        main();

        function main() {

            roadsHorizontal.forEach((roadPerpendicular) => {
                roadPerpendicular.draw(context);
            });
            roadsVertical.forEach((road) => {
                road.draw(context);
            });
            let go = true;
            let counter = 0;
            let moment = null;
            buildings.forEach((building) => {
                counter++;
                go = (building.update(mouseX, mouseY, context, go));
                if (go === false) {
                    moment = counter;
                }
            });
            counter = 0;
            buildings.forEach((building) => {
                counter++;
                building.style(context);
                if (counter === moment) {
                    building.changeColor(context);
                }
                building.draw(context, mouseX, mouseY);
                if (building.startMargin > 40) {
                    building.drawGrass(context);
                }
                if (building.width > 40 && building.depth > 20) {
                    building.drawLevel(context);
                }
            });
        }

    //makese screen size dynamic
    function fitToContainer() {
      canvas.style.width = '100%';
      canvas.width = canvas.offsetWidth;
      canvas.style.height = '100%';
      canvas.height = window.innerHeight;
    }
    function getRndItem(arr) { // program to get a random item from an array
        // get random index value
        const randomIndex = Math.floor(Math.random() * arr.length);
        // get random item
        const item = arr[randomIndex];
        return item;
        }
    function getRndInteger(min, max) {
        if (min > max){return min}
        else {return Math.floor(Math.random() * (max - min) ) + min;}
        }
    function drawCube(context, A, width, height, B, D, E, F, G) {
        context.beginPath();
        context.rect(A.x, A.y, width, height);

        context.moveTo(D.x, D.y);
        context.lineTo(G.x,G.y);
        context.lineTo(F.x, F.y);
        context.lineTo(B.x, B.y);
        context.lineTo(A.x, A.y);
        context.lineTo(E.x, E.y);
        context.lineTo(F.x, F.y);
        context.lineTo(B.x, B.y);
        context.lineTo(D.x, D.y);
        context.lineTo(G.x, G.y);
        context.fill();
        context.stroke();
    }
  });

  return (
    <div className="canvas-container">
      <canvas ref={ref}></canvas>
    </div>
  );
};

export default CanvasMenu;
