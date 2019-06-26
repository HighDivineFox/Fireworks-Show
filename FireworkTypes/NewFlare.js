import Particle from "./Particle.js";
import { FireworkManager } from "../Managers/FireworksManager.js";
import { GlobalSettings } from "../GlobalSettings.js";
import { ExplosionManager } from "../Managers/ExplosionManager.js";

export default class NewFlare extends Particle{
    constructor(x, y){
        super(x, y);
        this.xVel = this.x > GlobalSettings.canvasWidth / 2 ? -(2 + Math.random() * 3) : 2 + Math.random() * 3;
        this.yVel = -10 + (Math.random() - 1) * 5;

        this.lifeTimer = 5;
        this.prevPos = [];
        this.maxPrevPositions = 20;
        this.lineWidth = 0.01;

        this.col = ExplosionManager.getColour(0.5);
    }

    update(){
        super.update();

        // Push current pos to previous positions array
        if(this.prevPos.length < this.maxPrevPositions && this.lifeTimer > 0){
            this.prevPos.push({
                x:this.x,
                y:this.y
            })
        }else if(this.lifeTimer > 0){
            this.prevPos.shift();            
        }

        this.lifeTimer -= 0.02;

        if(this.lifeTimer <= 0){
            this.prevPos.shift();
            if(this.prevPos.length <= 0){
                FireworkManager.remove(this);
            }
        }else if(this.x > GlobalSettings.canvasWidth + 50 || this.x < -50 || this.y > GlobalSettings.canvasHeight + 50){
            FireworkManager.remove(this);
        }

        if(this.lifeTimer < 0){
            this.hidden = true;
        }
    }

    draw(context){
        super.draw(context);

        // Draw Trail
        // Loop through the rest of the array and increase the line width as you go
        this.lineWidth = 0.01;
        for(var i = 1; i < this.prevPos.length; i++){
            context.beginPath();
            context.lineWidth = this.lineWidth;
            context.moveTo(this.prevPos[i-1].x, this.prevPos[i-1].y);
            context.lineTo(this.prevPos[i].x, this.prevPos[i].y);
            context.strokeStyle = this.col;
            context.stroke();

            this.lineWidth += 1;
        }
    }
}