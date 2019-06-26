import Particle from "./Particle.js";
import { GlobalSettings } from "../GlobalSettings.js";
import { FireworkSettings } from "../FireworkSettings.js";
import { ExplosionManager } from "../Managers/ExplosionManager.js";
import { FireworkManager } from "../Managers/FireworksManager.js";

export default class NewFirework extends Particle{
    constructor(x, y){
        super(
            x,
            y
        );
        this.exploded = false;
        this.yVel = -(10 + Math.random() * 5);

        this.particles = [];
        this.col = ExplosionManager.getColour(0.5);
    }

    offScreen(){
        if(this.exploded && this.particles.length == 0){
            FireworkManager.remove(this);
        }
    }

    update(){
        super.update();
        
        if(this.exploded){
            for(var i = 0; i < this.particles.length; i++){
                this.particles[i].xVel *= 0.93;
                this.particles[i].yVel *= 0.93;
                this.particles[i].yVel += GlobalSettings.gravity;
            }
        }

        this.removeOffscreenParticles();
        
        if(this.exploded && this.particles.length == 0){
            FireworkManager.remove(this);
        }

        if(this.yVel >= 0 && !this.exploded){
            this.explode();
        }

        for(var i = 0; i < this.particles.length; i++){
            this.particles[i].update();
        }
    }

    draw(context){
        super.draw(context);

        for(var i = 0; i < this.particles.length; i++){
            this.particles[i].draw(context);
        }
    }

    removeOffscreenParticles(){        
        for(var i = this.particles.length-1; i >= 0; i--){
            if(this.particles[i].x < 0 || this.particles[i].x > GlobalSettings.canvasWidth || this.particles[i].y > GlobalSettings.canvasHeight){
                this.particles.splice(i, 1);
            }
        }
    }

    explode(){
        for(var i = 0; i < 100; i++){            
            let p = new Particle(this.x, this.y, this.col);
            p.xVel = Math.random() * FireworkSettings.maxRadius/10 * (Math.cos(Math.random() * Math.PI*2));
            p.yVel = Math.random() * FireworkSettings.maxRadius/10 * (Math.sin(Math.random() * Math.PI*2));
            this.particles.push(p);
        }
        this.exploded = true;
        this.hidden = true;
    }
}