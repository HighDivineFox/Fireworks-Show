import { FireworkManager } from "../Managers/FireworksManager.js";
import { FireworkSettings } from "../FireworkSettings.js";
import { ExplosionManager } from "../Managers/ExplosionManager.js";

export default class FireWork{
    constructor(x, y, destX, destY){
        this.x = x;
        this.y = y;
        this.drawX = x;
        this.drawY = y;
        this.destinationX = destX;
        this.destinationY = destY;
        this.speed = 0.01;
        this.speedIncrement = 0.004;

        this.explode = false;
        this.explodeRadius = 0;
        this.radiusIncrement = 1;
        this.exploded = false;

        this.coloursArray = [
            "rgba(255, 0, 0,)", 
            "rgba(0, 255, 0,)", 
            "rgba(0, 0, 255,)",
            "rgba(0, 255, 255,)",
            "rgba(255, 0, 255,)",
            "rgba(255, 255, 0,)",
        ];
        this.colourIndex = Math.floor(Math.random() * FireworkSettings.maxColourIndex);
        this.transparency = 0.5;
    }

    update(){
        this.drawX = lerp(this.x, this.destinationX, this.speed);
        this.drawY = lerp(this.y, this.destinationY, this.speed);

        this.speedIncrement = FireworkSettings.fireWorkSpeed;
        this.speed += this.speedIncrement;

        if(this.speed > 1){
            this.speed = 1;
        }

        if(this.atDestination() && !this.explode){
            this.explode = true;
            ExplosionManager.newExplosion(this.drawX, this.drawY);
            FireworkManager.remove(this);
        }
    }

    draw(context){
        if(!this.explode){
            // Draw Rocket
            context.beginPath();
            context.arc(this.drawX, this.drawY, 1, 0, Math.PI*2, false);
            context.fillStyle = "yellow";
            context.fill(); 
        }
    }

    atDestination(){
        let a = this.drawX - this.destinationX;
        let b = this.drawY- this.destinationY;

        return Math.sqrt(a*a + b*b) == 0;
    }
}

function lerp (start, end, amt){
    return (1-amt)*start+amt*end
  }