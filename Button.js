import { FireworkSettings } from "./FireworkSettings.js";
import { UpgradesManager } from "./Managers/UpgradesManager.js";
import { GlobalSettings } from "./GlobalSettings.js";

export default class Button{
    constructor(x, y, width, height, titleText, onClickEvent, textAlign){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.titleText = titleText;
        this.costText = "";
        this.onClickEvent = onClickEvent;
        this.textAlign = textAlign || "left";

        this.getCostText();
    }

    onClick(){
        this.onClickEvent();
        this.getCostText();
        GlobalSettings.requestBGRedraw = true;
    }

    draw(context){
        let textXPos = this.textAlign == "left" ? this.x + 5 : this.x + this.width/2;
        let textYPos = this.textAlign == "left" ? this.y + 18 : this.y + this.height/1.5;

        let gradient = context.createLinearGradient(this.x + this.width/2, this.y, this.x + this.width/2, this.y + this.height);
        gradient.addColorStop(0, "rgb(220, 220, 180)");
        gradient.addColorStop(1, "rgb(160, 160, 120)");

        context.beginPath();
        context.textAlign = this.textAlign;
        context.fillStyle = gradient;
        context.rect(this.x, this.y, this.width, this.height);
        context.fill();
        context.stroke();
        context.fillStyle = "black";
        context.font = "18px Arial";
        context.font = this.textAlign == "left" ? "18px Arial" : "28px Arial";
        context.fillText(this.titleText, textXPos, textYPos);
        context.fillText(this.costText, textXPos, textYPos + 27);
        
    }

    getCostText(){
        switch (this.titleText) {
            case "Maximum Fireworks":
                this.costText = "$" + UpgradesManager.MaxFireworksCost.value;
                break;
            case "Firework speed":
                this.costText = "Increase Fireworks base speed";
                break;
            case "Firework Colour":
                if(FireworkSettings.maxColourIndex >= 5){
                    this.costText = "Sold out!";
                }else{
                    this.costText = "More Colourful shows";
                }
                break;
            case "Explosion Radius":
                if(FireworkSettings.maxRadius >= 200){
                    this.costText = "Sold out!";
                }else{
                    this.costText = "Increase Fireworks explosion radius";
                }
                break;
            default:
                break;
        }
    }
}