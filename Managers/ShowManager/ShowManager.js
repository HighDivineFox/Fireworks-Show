import { GlobalSettings } from "../../GlobalSettings.js";
import SlotRow from "./SlotRow.js";
import { UpgradesManager } from "../UpgradesManager.js";
import { FireworkManager } from "../FireworksManager.js";

export const ShowManager = {
    hidden:true,
    context:null,
    buttons:[],
    slotRows:[
        new SlotRow(100),
        new SlotRow(300),
    ],

    BuyNewSlot:function(){
        UpgradesManager.newSlotCost.IncrementValue();

        loop1:
        for(var i = 0; i < ShowManager.slotRows.length; i++){
            for(var n = 0; n < ShowManager.slotRows[i].slots.length; n++){
                if(ShowManager.slotRows[i].slots[n].locked == true){
                    ShowManager.slotRows[i].slots[n].locked = false;
                    break loop1;
                }
            }
        }

        // TODO: Check if there are any locked slots left. If not, don't allow any more slots to be bought
    },

    BuyNewSlotRow:function(){
        UpgradesManager.newSlotRowCost.IncrementValue();
        ShowManager.slotRows.push(new SlotRow(100 + (ShowManager.slotRows.length * 200)));
    },

    BeginShow:function(){
        // TODO: Make sure a show can't be started while another is in progress

        for(var i = 0; i < ShowManager.slotRows.length; i++){
            for(var n = 0; n < ShowManager.slotRows[i].slots.length; n++){
                if(!ShowManager.slotRows[i].slots[n].locked){
                    for(var j = 0; j < ShowManager.slotRows[i].slots[n].amountInput.value; j++){
                        FireworkManager.addFireWorkToQueue(ShowManager.slotRows[i].slots[n].fireworkType, ShowManager.slotRows[i].slots[n].delayInput.value);
                    }
                }
            }
        }
        
        ShowManager.showHide();
    },

    showHide:function(){
        ShowManager.hidden = !ShowManager.hidden;
        
        for(var i = 0; i < ShowManager.slotRows.length; i++){
            ShowManager.slotRows[i].showHide(ShowManager.hidden);
        }

        for(var i = 0; i < ShowManager.slotRows.length; i++){
            for(var n = 0; n < ShowManager.slotRows[i].slots.length; n++){
                if(ShowManager.slotRows[i].slots[n].inputReady){
                    ShowManager.slotRows[i].slots[n].amountInput.value = 0;
                }
            }
        }
    },

    draw:function(){
        if(!ShowManager.hidden){
            this.drawTextandBG();
            this.drawSlotRows(this.context);   
            for(var i = 0; i < this.buttons.length; i++){
                this.buttons[i].draw(this.context);
            }
        }
    },

    drawSlotRows:function(context){
        for(var i = 0; i < this.slotRows.length; i++){
            this.slotRows[i].draw(context);
        }
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
        this.context.fillText("Design Your Show!", 300, 60);

        this.context.font = "30px Arial";
        this.context.fillText("", 45, 60);

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

        for(var i = 0; i < ShowManager.slotRows.length; i++){
            for(var n = 0; n < ShowManager.slotRows[i].slots.length; n++){
                if(this.isInside(mousePos, this.slotRows[i].slots[n]) && this.hidden == false){
                    this.slotRows[i].slots[n].changeType();
                }
            }
        }
    },

    isInside:function(pos, rect){
        return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
    },

    storedBasicsCount:function(obj){
        let count = 0;
        let num = 0;

        //console.log(obj);
        
        for(var i = 0; i < ShowManager.slotRows.length; i++){
            for(var n = 0; n < ShowManager.slotRows[i].slots.length; n++){
                num = 0;
                if(!this.slotRows[i].slots[n].locked){                    
                    if(this.slotRows[i].slots[n].fireworkType == 1 && this.slotRows[i].slots[n].amountInput){
                        num = this.slotRows[i].slots[n].amountInput.value;
                    }
                }
                count += parseInt(num);
                num = 0;
            }
        }

        return count;
    },

    storedFlareCount:function(){
        let count = 0;
        let num = 0;

        for(var i = 0; i < ShowManager.slotRows.length; i++){
            for(var n = 0; n < ShowManager.slotRows[i].slots.length; n++){
                num = 0;
                if(!this.slotRows[i].slots[n].locked){                    
                    if(this.slotRows[i].slots[n].fireworkType == 2 && this.slotRows[i].slots[n].amountInput){
                        num = this.slotRows[i].slots[n].amountInput.value;
                    }
                }
                count += parseInt(num);
                num = 0;
            }
        }

        return count;
    },

    storedMineCount:function(){
        let count = 0;
        let num = 0;

        for(var i = 0; i < ShowManager.slotRows.length; i++){
            for(var n = 0; n < ShowManager.slotRows[i].slots.length; n++){
                num = 0;
                if(!this.slotRows[i].slots[n].locked){                    
                    if(this.slotRows[i].slots[n].fireworkType == 3 && this.slotRows[i].slots[n].amountInput){
                        num = this.slotRows[i].slots[n].amountInput.value;
                    }
                }
                count += parseInt(num);
                num = 0;
            }
        }

        return count;
    },
}