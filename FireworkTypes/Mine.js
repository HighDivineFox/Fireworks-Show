import Particle from "./Particle.js";
import { GlobalSettings } from "../GlobalSettings.js";
import { ExplosionManager } from "../Managers/ExplosionManager.js";
import { FireworkManager } from "../Managers/FireworksManager.js";

export default class Mine extends Particle{
    constructor(x, y){
        super(x, y);
        this.particles = [];
        this.xVel = this.x > GlobalSettings.canvasWidth / 2 ? -(2 + Math.random() * 3) : 2 + Math.random() * 3;
        this.yVel = -10 + (Math.random() - 1) * 5;

        this.newParticleDelay = 0.3;
        this.newParticleIncrement = 0.2;

        this.col = ExplosionManager.getColour(0.5);
    }

    update(){
        this.xAcc * 0.5;
        this.yAcc * 0.5;
        super.update();

        this.newParticleDelay -= GlobalSettings.deltaTime;

        if(this.newParticleDelay <= 0){
            for(var i = 0; i < 5; i++){
                let p = new Particle(this.x, this.y);
                p.xVel = Math.random() * 3 * (Math.cos(Math.random() * Math.PI*2));
                p.yVel = Math.random() * 3 * (Math.sin(Math.random() * Math.PI*2));
                p.col = this.col;
                this.particles.push(p);
            }
            this.newParticleDelay = this.newParticleIncrement;
        }

        this.removeOffscreenParticles();
        
        for(var i = 0; i < this.particles.length; i++){
            this.particles[i].update();
        }

        if((this.x < 0 || this.x > GlobalSettings.canvasWidth || this.y > GlobalSettings.canvasHeight) && this.particles.length == 0){
            FireworkManager.remove(this);
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
}