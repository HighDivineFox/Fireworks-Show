import { GlobalSettings } from "../../GlobalSettings.js";

export default class Resource{
    constructor(startAmount){
        this.amount = startAmount;
    }

    add(num){
        this.amount += num;
        GlobalSettings.requestBGRedraw = true;
    }

    subtract(num){
        this.amount -= num;
        GlobalSettings.requestBGRedraw = true;
    }
} 