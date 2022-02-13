import { useRef, useEffect } from 'react';
import "./canvas.css";

const CanvasMenu = () => {
  let ref = useRef();

  useEffect(() => {
    let canvas = ref.current;
    let context = canvas.getContext('2d');

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
        constructor(x,y,d,m) {
            this.x = -1 *(d / (Math.sqrt(1+(m * m)))) + x;
            this.y = -1 * ((d * m) / (Math.sqrt(1+(m * m)))) + y;
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
        constructor(x, y, length, slope, loop) {
            this.width = getRndInteger(2,10);
            this.length = length;
            this.margin = 10;
            this.emptyLot = getRndInteger(0,5);
    
            this.pointRP = new Depth(x,y,loop,slope);
            this.pointRP.x += this.margin;
    
            this.pointRPTF = new Vector(this.pointRP.x - this.length, this.pointRP.y);
            this.pointRPBC = new Depth(this.pointRP.x, this.pointRP.y, this.width, slope);
            this.pointRPBF = new Vector(this.pointRPBC.x - this.length, this.pointRPBC.y);
        }
        get gap() {
            return this.width + this.emptyLot;
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
            this.emptyLot = getRndInteger(0,5);
            this.color = 'white';
            this.colorStroke = 'black';
    
            this.start = new Depth(x,y,loop,slope);
            this.startBuilding = new Vector(this.start.x - this.startMargin, this.start.y);
    
            this.pointBC = new Depth(this.startBuilding.x, this.startBuilding.y, this.depth, slope);
            this.pointTC = new Vector(this.pointBC.x, this.pointBC.y - this.height);
            this.pointTF = new Vector(this.pointBC.x - this.width, this.pointTC.y);
    
            this.topPointClose = new VPY(this.pointTC.x, this.pointTC.y, slope, this.startBuilding.x);
            this.topPointFar = new VPX(this.pointTF.x, this.pointTF.y, slope, this.topPointClose.y);
    
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
        get gap() {
            return this.depth + this.emptyLot;
        }
        get returnWidth() {
            return this.width;
        }
        get returnStart() {
            return this.startBuilding.x;
        }
        draw(context) {
            context.fillStyle = this.color;
            context.strokeStyle = this.colorStroke;
            if (getRndInteger(1,1000) > 998) {context.fillStyle = 'orange'}
    
    
            context.beginPath();
            context.rect(this.pointTF.x, this.pointTF.y, this.width, this.height);
            context.fill();
            context.stroke();
    
            context.beginPath();
            context.moveTo(this.pointBC.x, this.pointBC.y);
            context.lineTo(this.startBuilding.x,this.startBuilding.y);
            context.lineTo(this.topPointClose.x, this.topPointClose.y);
            context.lineTo(this.pointTC.x, this.pointTC.y);
            context.lineTo(this.pointTF.x, this.pointTF.y);
            context.lineTo(this.topPointFar.x, this.topPointFar.y);
            context.lineTo(this.topPointClose.x, this.topPointClose.y);
            context.lineTo(this.pointTC.x, this.pointTC.y);
            context.lineTo(this.pointBC.x, this.pointBC.y);
            context.lineTo(this.startBuilding.x, this.startBuilding.y);
            context.fill();
            context.stroke();
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
        }
        }
    
    
    
        main();
        function main() {
        //const vPoint = {x:canvas.width, y:0};
        //const origin = {x:0, y:canvas.height};
        const slope = -1;//(origin.y - vPoint.y) / (origin.x - vPoint.x);
    
        let rowLength = getRndInteger(100,300); //190;
        let prev = 'none';
        for (let j = 0; j < canvas.width*2 + rowLength; j += rowLength ){
            let row = {x: 100 + j, y: 0};
    
            for (let i = 0; i < Math.hypot(canvas.width, canvas.height)+100; i += 5){
                let type = getRndInteger(1,100);
    
                if (type > 80 && prev !== 'road') {
                    const roadPerpendicular1 = new RoadPerpendicular(row.x, row.y, rowLength, slope, i);
                    roadPerpendicular1.draw(context);
                    i += roadPerpendicular1.gap;
                    prev = 'road';
                }
                else {
                    let quantity = getRndInteger(1,5);
                    let rowLengthAndRoad = rowLength -20; //because 10 each for margin on both sides
                    let width = rowLengthAndRoad / quantity;
                    let gapList = [];
                    let returnedWidth = [];
                
                    for (let k = quantity - 1; k >= 0; k--) {
                        let startx = row.x - (width * k);
                        let margin = 10;
                        let buildingWidth = getRndInteger(margin + 5, width) - margin;
                        let height = getRndInteger(10, 50);
                        if (getRndInteger(1,11) > 9){height = getRndInteger(100,200)} //towers
                        let depth = getRndInteger(5,30);
                        
                        let startMargin = getRndInteger(margin, width - buildingWidth);
                        const building1 = new Building(startx,row.y,slope, i, buildingWidth, height, depth, startMargin);
                        building1.draw(context);
                        if (startMargin > 40) {building1.drawGrass(context)}
                        gapList.push(building1.gap);
                        returnedWidth.push(building1.returnWidth);
                        
                        if(returnedWidth > 40 && depth > 20) {
                        //levels
                        let levelMargin = 2;
                        let levelWidth = getRndInteger(10, returnedWidth - (levelMargin * 2)) ;
                        let posLevel= {x: startx - 2, y: row.y + 2 - height};
                        let posHeight = getRndInteger(1, 20);
                        let posDepth = getRndInteger(3, depth - 5)
                        let levelStartMargin = getRndInteger(startMargin, returnedWidth - levelWidth);
                        const level = new Building(posLevel.x, posLevel.y, slope, i, levelWidth, posHeight, posDepth, levelStartMargin);
                        level.draw(context);
                        }
                    }
                    i += Math.max(...gapList);
                    //building1.drawWindow(context);
                    prev='building';
                    }
                    
            }
            const road1 = new Road(row.x, row.y, 10, slope);
            road1.draw(context);
            rowLength = getRndInteger(100,300);
        }
    
    
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
  });

  return (
    <div className="canvas-container">
      <canvas ref={ref}></canvas>
    </div>
  );
};

export default CanvasMenu;
