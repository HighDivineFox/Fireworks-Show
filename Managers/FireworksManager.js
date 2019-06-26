import { GlobalSettings } from "../GlobalSettings.js";
import { ResourceTracker } from "./Resources/ResourceTracker.js";
import NewFirework from "../FireworkTypes/NewFirework.js";
import NewFlare from "../FireworkTypes/NewFlare.js";
import Mine from "../FireworkTypes/Mine.js";

export const FireworkManager = {
    fireworks:[],
    fireworkQueue:[],
    fireDelay:0,

    addFireWorkToQueue:function(type, delay){
        switch (type) {
            case 1:
                let f = new NewFirework(
                    getRandomXPos(),
                    GlobalSettings.canvasHeight
                );
                f.xVel = f.x > GlobalSettings.canvasWidth / 2 ? -(Math.random() * 2) : Math.random() * 2;
                this.fireworkQueue.push({firework:f, delay:delay});               
                break;
            case 2:
                this.fireworkQueue.push({firework: new NewFlare(
                    getRandomXPos(),
                    GlobalSettings.canvasHeight
                ), delay:delay});
                break;
            case 3:
            this.fireworkQueue.push({firework: new Mine(
                getRandomXPos(),
                GlobalSettings.canvasHeight
            ), delay:delay});
            break;
        }
        
    },

    drawFireworks:function(context){        
        for(var i = 0; i < this.fireworks.length; i++){
            this.fireworks[i].draw(context);
        }
    },

    update:function(){
                    
        this.fireDelay -= GlobalSettings.deltaTime;

        if(this.fireDelay < 0 && this.fireworkQueue.length > 0){
            this.fireworks.push(this.fireworkQueue[0].firework);
            this.fireDelay = this.fireworkQueue[0].delay;
            this.fireworkQueue.shift();
        }

        for(var i = 0; i < this.fireworks.length; i++){
            this.fireworks[i].update();
        }
    },

    remove:function(firework){
        for(var i = this.fireworks.length; i >= 0 ; i--){
            if(this.fireworks[i] === firework){
                this.fireworks.splice(i, 1);
                ResourceTracker.gold.add(10);
            }
        }
    }
}

function getRandomXPos(){
    return Math.random() * GlobalSettings.canvasWidth;
}

function getRandomXDestination(){    
    return 150 + (Math.random() * GlobalSettings.canvasWidth / 1.65);
}

function getRandomYDestination(){
    return Math.random() * GlobalSettings.canvasHeight / 2;
}