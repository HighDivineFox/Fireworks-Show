import { FireworkSettings } from "../FireworkSettings.js";

export const ExplosionManager = {
    explosions: [],
    radiusIncrement: 1,

    coloursArray: [
        "rgba(255, 0, 0,)", 
        "rgba(0, 255, 0,)", 
        "rgba(0, 0, 255,)",
        "rgba(0, 255, 255,)",
        "rgba(255, 0, 255,)",
        "rgba(255, 255, 0,)",
    ],

    update: function(){
        for(var i = this.explosions.length-1; i >= 0; i--){
            ExplosionManager.explosions[i].rad += ExplosionManager.radiusIncrement;
        }
    },

    drawExplosions: function(context){

        for(var i = ExplosionManager.explosions.length-1; i >= 0; i--){
            // Draw explosion
            context.beginPath();

            // Get colour and add transparency
            let transText = ExplosionManager.coloursArray[ExplosionManager.explosions[i].col] + "";
            transText = transText.replace(",)", "," + ExplosionManager.explosions[i].transparency + ")");

            // Create Gradient effect
            let grad = context.createRadialGradient(ExplosionManager.explosions[i].x, ExplosionManager.explosions[i].y, 0, ExplosionManager.explosions[i].x, ExplosionManager.explosions[i].y, ExplosionManager.explosions[i].rad);
            grad.addColorStop(0, transText);
            grad.addColorStop(1, "transparent");
            context.fillStyle = grad;

            // Draw explosion to context
            context.arc(ExplosionManager.explosions[i].x, ExplosionManager.explosions[i].y, ExplosionManager.explosions[i].rad, 0, Math.PI*2, false);
            context.fill();
            
            if(ExplosionManager.explosions[i].rad > FireworkSettings.maxRadius - 20 ){
                ExplosionManager.explosions[i].transparency -= 0.05;
                if(ExplosionManager.explosions[i].transparency < 0) ExplosionManager.explosions[i].transparency = 0;
            }

            if(ExplosionManager.explosions[i].rad > FireworkSettings.maxRadius){
                ExplosionManager.remove(ExplosionManager.explosions[i]);
            }
        }
    },

    remove: function(explosion){
        for(var i = ExplosionManager.explosions.length-1; i >= 0; i--){
            if(this.explosions[i] === explosion){
                this.explosions.splice(i, 1);
            }
        }
    },

    newExplosion: function(x, y){
        ExplosionManager.explosions.push(
            {
                x:x,
                y:y,
                rad:0,
                transparency:0.5,
                col:Math.round(Math.random() * FireworkSettings.maxColourIndex)
            });
    },

    getColour:function(transparency){
        // Get colour and add transparency
        let transText = this.coloursArray[Math.floor(Math.random() * FireworkSettings.maxColourIndex)] + "";
        transText = transText.replace(",)", "," + transparency + ")");

        return transText;
    }
}