import Slot from "./Slot.js";

export default class SlotRow{
    constructor(y){
        this.y = y;
        this.locked = true;
        this.slots = [
            new Slot(false, 250, this.y),
            new Slot(false, 370, this.y),
            new Slot(false, 490, this.y),
            new Slot(false, 610, this.y)
        ];
    }

    draw(context){
        for(var i = 0; i < this.slots.length; i++){
            this.slots[i].draw(context);

            // Draw arrows
            context.beginPath();
            context.moveTo(230 + (i * 120), this.y + 50);
            context.lineTo(250 + (i * 120), this.y + 50);
            context.lineTo(240 + (i * 120), this.y + 40);
            context.lineTo(250 + (i * 120), this.y + 50);
            context.lineTo(240 + (i * 120), this.y + 60);
            context.stroke();
        }

    };

    showHide(val){
        for(var i = 0; i < this.slots.length; i++){
            this.slots[i].showHide(val);
        }
    };
}