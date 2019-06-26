import { Images } from "../../Images.js";
import { GlobalSettings } from "../../GlobalSettings.js";
import { ResourceTracker } from "../Resources/ResourceTracker.js";
import { ShowManager } from "./ShowManager.js";

var count = 0;

export default class Slot{
    constructor(locked, x, y){
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
        this.hidden = true;
        this.locked = locked; // boolean
        this.inputReady = false;
        this.amountInput = null;
        this.amountLabel = null;
        this.delayInput = null;
        this.delayLabel = null;
        this.fireworkType = 3;
    }

    changeType(){
        this.fireworkType++;

        if(this.fireworkType > 3){
            this.fireworkType = 1;
        }

        while(this.amountInputChanged()){
            this.amountInputChanged();
        }
        GlobalSettings.requestBGRedraw = true;
    }

    draw(context){
        switch (this.fireworkType) {
            case 1:
                context.putImageData(Images.basicFirework, this.x, this.y);
                break;
            case 2:
                context.putImageData(Images.flare, this.x, this.y);
                break;
            case 3:
                context.putImageData(Images.mine, this.x, this.y);
                break;
        }

        if(this.locked){
            context.putImageData(Images.padlock, this.x + 25, this.y + 25);
        }

        if(!this.inputReady){

            // Create Amount input
            this.amountInput = document.createElement("input");
            this.amountInput.type = "number";
            this.amountInput.setAttribute("class", "slotInput");
            this.amountInput.min = "0";
            this.amountInput.max = "20";
            this.amountInput.value = "0";
            this.amountInput.style.width = "40px";
            this.amountInput.style.left = 210 + this.x + "px";
            this.amountInput.style.top = 125 + this.y +"px";

            this.amountInput.name = count;
            count++;

            this.amountInput.addEventListener("change", (e) => {
                this.amountInputChanged();
            })

            // Create amount label
            this.amountLabel = document.createElement("label");
            this.amountLabel.setAttribute("class", "slotInput");
            this.amountLabel.innerHTML = "Amount";
            this.amountLabel.style.left = 260 + this.x + "px";
            this.amountLabel.style.top = 127 + this.y +"px";

            // Create Delay input
            this.delayInput = document.createElement("input");
            this.delayInput.type = "number";
            this.delayInput.setAttribute("class", "slotInput");
            this.delayInput.min = "0";
            this.delayInput.max = "5";
            this.delayInput.step = "0.1";
            this.delayInput.value = "0.1";
            this.delayInput.style.width = "40px";
            this.delayInput.style.left = 210 + this.x + "px";
            this.delayInput.style.top = 155 + this.y +"px";

            // Create amount label
            this.delayLabel = document.createElement("label");
            this.delayLabel.setAttribute("class", "slotInput");
            this.delayLabel.innerHTML = "Delay";
            this.delayLabel.style.left = 260 + this.x + "px";
            this.delayLabel.style.top = 157 + this.y +"px";

            document.getElementById("doubleCanvas").appendChild(this.amountInput);
            document.getElementById("doubleCanvas").appendChild(this.amountLabel);
            document.getElementById("doubleCanvas").appendChild(this.delayInput);
            document.getElementById("doubleCanvas").appendChild(this.delayLabel);

            this.inputReady = true;
        }

    };

    amountInputChanged(){
        let changeNeeded = false;

        if(ShowManager.storedBasicsCount() > ResourceTracker.basicFireworkCount.amount){
            this.amountInput.value--;
            changeNeeded = true;
        }

        if(ShowManager.storedFlareCount() > ResourceTracker.flareCount.amount){
            this.amountInput.value--;
            changeNeeded = true;
        }

        if(ShowManager.storedMineCount() > ResourceTracker.mineCount.amount){
            this.amountInput.value--;
            changeNeeded = true;
        }

        GlobalSettings.requestBGRedraw = true;
        return changeNeeded;
    };

    showHide(val){
        this.hidden = val;
        
        if(this.hidden && this.inputReady){
            this.amountInput.style.visibility = "hidden";
            this.amountLabel.style.visibility = "hidden";
            this.delayInput.style.visibility = "hidden";
            this.delayLabel.style.visibility = "hidden";
        }else if(this.inputReady){
            this.amountInput.style.visibility = "visible";
            this.amountLabel.style.visibility = "visible";
            this.delayInput.style.visibility = "visible";
            this.delayLabel.style.visibility = "visible";
        }
    };
}