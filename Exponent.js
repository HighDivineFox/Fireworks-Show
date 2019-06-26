export default class Exponent{
    constructor(startCost, multiplier){
        this.startCost = startCost;
        this.multiplier = multiplier;
        this.level = 1;
        this.value = this.GetValue();
    }

    IncrementValue(){
        this.level++;
        this.value = this.GetValue();
    }

    GetValue(){
        return Number(this.startCost * Math.pow(this.multiplier, this.level)).toFixed(2);
    }
}