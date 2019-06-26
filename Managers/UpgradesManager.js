import { FireworkSettings } from "../FireworkSettings.js";
import Exponent from "../Exponent.js";
import { GlobalSettings } from "../GlobalSettings.js";

export const UpgradesManager = {
    hidden:true,
    context:null,
    buttons:[],

    MaxFireworksCost: new Exponent(5.99, 1.67),
    FireworkSpeedCost: new Exponent(11.978, 1.67),
    FireworkColoursCost: new Exponent(17.965, 1.67),
    ExplosionRadiusCost: new Exponent(10, 1.32),
    newSlotCost: new Exponent(8, 4),
    newSlotRowCost: new Exponent(50, 4),

    draw:function(){
        if(!UpgradesManager.hidden){
            this.drawTextandBG();

            for(var i = 0; i < this.buttons.length; i++){
                this.buttons[i].draw(this.context);
            }
        }
    },

    showHide:function(){
        UpgradesManager.hidden = !UpgradesManager.hidden;
    },

    drawTextandBG:function(){
        // Draw window background
        this.context.beginPath();
        this.context.textAlign = "left";
        this.context.fillStyle = "rgba(150, 150, 150, 1)";
        this.context.rect(10, 10, GlobalSettings.canvasWidth - 20, GlobalSettings.canvasHeight - 20)
        this.context.fill();
        this.context.strokeStyle = "black";
        this.context.lineWidth = 1;
        this.context.stroke();

        // Draw Upgrade Panel background
        this.context.beginPath();
        this.context.fillStyle = "rgba(200, 200, 200, 1)";
        this.context.rect(10, 10, 200, GlobalSettings.canvasHeight - 20);
        this.context.fill();
        this.context.strokeStyle = "black";
        this.context.lineWidth = 1;
        this.context.stroke();

        // Draw Text
        this.context.font = "50px Arial";
        this.context.fillStyle = "black";
        this.context.fillText("Upgrades!", 230, 60);

        this.context.font = "30px Arial";

        this.context.beginPath();
        this.context.moveTo(10, 80);
        this.context.lineTo(GlobalSettings.canvasWidth - 10, 80);
        this.context.stroke();
    },

    onClick:function(mousePos){
        for(var i = 0; i < this.buttons.length; i++){
            if(this.isInside(mousePos, this.buttons[i]) && this.hidden == false){
                this.buttons[i].onClick();
            }
        }
    },

    isInside:function(pos, rect){
        return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
    },

    NotImplemented:function(){
        console.log("Method not implemented");
    },

    IncreaseMaxFireworks:function(){        
        FireworkSettings.maxFireworks++;
        UpgradesManager.MaxFireworksCost.IncrementValue();
    },

    IncreaseFireworkSpeed:function(){
        if(UpgradesManager.FireworkSpeedCost.level < 20){
            FireworkSettings.fireWorkSpeed += 0.025;
            return UpgradesManager.FireworkSpeedCost.IncrementValue();
        }
    },

    UpgradeFireworkColours:function(){
        if(FireworkSettings.maxColourIndex < 5){
            FireworkSettings.maxColourIndex++;
            UpgradesManager.FireworkColoursCost.IncrementValue();
        }
    },

    IncreaseExplosionRadius:function(){
        if(FireworkSettings.maxRadius < 200){
            FireworkSettings.maxRadius += 5;
            UpgradesManager.ExplosionRadiusCost.IncrementValue();
        }
    },
}