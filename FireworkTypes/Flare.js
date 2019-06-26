import { FireworkManager } from "../Managers/FireworksManager.js";
import { FireworkSettings } from "../FireworkSettings.js";
import { GlobalSettings } from "../GlobalSettings.js";

export default class Flare{
    constructor(x, y){
        this.x = x;
        this.y = y - 30;
        this.xVel = this.x > GlobalSettings.canvasWidth / 2 ? -2 : 2;
        this.yVel = -2 + (Math.random() - 1) * 3;
        this.gravity = 1;
        this.lifeTimer = 5;
        this.prevPos = [];
        this.maxPrevPositions = 50;
        this.lineWidth = 0.01;

        this.coloursArray = [
            "rgba(0, 0, 255, 0.3)",
			"rgba(255, 0, 255, 0.3)",
			"rgba(0, 255, 0, 0.3)",
			"rgba(255, 0, 0, 0.3)",
			"rgba(255, 255, 0, 0.3)",
			"rgba(0, 255, 255, 0.3)",
        ];
        this.colourIndex = Math.round(Math.random() * FireworkSettings.maxColourIndex);
        this.transparency = 0.5;
        
    }

    update(){

        // Update position
        this.x += this.xVel;
        this.y += this.yVel - this.gravity;

        // Push current pos to previous positions array
        if(this.prevPos.length < this.maxPrevPositions && this.lifeTimer > 0){
            this.prevPos.push({
                x:this.x,
                y:this.y
            })
        }else if(this.lifeTimer > 0){
            this.prevPos.shift();
        }

        // Make gravities effect stronger
        this.gravity -= 0.035;

        this.lifeTimer -= 0.02;

        if(this.lifeTimer <= 0){
            this.prevPos.shift();
            if(this.prevPos.length <= 0){
                FireworkManager.remove(this);
            }
        }else if(this.x > GlobalSettings.canvasWidth + 50 || this.x < -50 || this.y > GlobalSettings.canvasHeight + 50){
            FireworkManager.remove(this);
        }
    }

    draw(context){
        // Draw Rocket
        if(this.lifeTimer > 0){
            context.beginPath();
            context.arc(this.x, this.y, 2, 0, Math.PI*2, false);
            context.fillStyle = "lightblue";
            context.fill();
        }
        
        // Draw Trail
        // Loop through the rest of the array and increase the line width as you go
        this.lineWidth = 0.01;
        for(var i = 1; i < this.prevPos.length; i++){
            context.beginPath();
            context.lineWidth = this.lineWidth;
            context.moveTo(this.prevPos[i-1].x, this.prevPos[i-1].y);
            context.lineTo(this.prevPos[i].x, this.prevPos[i].y);
            context.strokeStyle = this.coloursArray[this.colourIndex];
            context.stroke();

            this.lineWidth += 0.3;
            //this.colourIndex = Math.floor(Math.random() * FireworkSettings.maxColourIndex);
        }
    }
}