import { GlobalSettings } from "../GlobalSettings.js";
import { FireworkSettings } from "../FireworkSettings.js";

export default class Particle{
    constructor(x, y, col){
        this.x = x;
        this.y = y;
        this.xVel = 0;
        this.yVel = 0;
        this.xAcc = 0;
        this.yAcc = 0;
        this.hidden = false;
        this.col = col || "white";
    }

    update(){
        // Apply gravity
        this.yAcc += GlobalSettings.gravity * FireworkSettings.fireWorkSpeed;

        this.xVel += this.xAcc;
        this.yVel += this.yAcc;

        this.x += this.xVel * FireworkSettings.fireWorkSpeed;
        this.y += this.yVel * FireworkSettings.fireWorkSpeed;

        this.xAcc = 0;
        this.yAcc = 0;
    }

    draw(context){
        if(!this.hidden){
            context.beginPath();
            context.arc(this.x, this.y, 3, 0, Math.PI*2, false);
            context.fillStyle = this.col;
            context.fill();
        }
    }
}