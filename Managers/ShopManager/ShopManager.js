import { GlobalSettings } from "../../GlobalSettings.js";

export const ShopManager = {
    hidden:true,
    context:null,
    buttons:[],

    draw:function(){
        if(!ShopManager.hidden){
            this.drawTextandBG();
            for(var i = 0; i < this.buttons.length; i++){
                this.buttons[i].draw(this.context);
            }
        }
    },

    showHide:function(){
        ShopManager.hidden = !ShopManager.hidden;
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
        this.context.fillText("Purchase new fireworks!", 230, 60);

        this.context.font = "30px Arial";
        this.context.fillText("Misc", 45, 60);

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
}