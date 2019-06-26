export const Ground = {
    spacing:0,
    width:0,
    height:0,
    grndHeight:0,
    magnitude:0,
    layerDiff:0,

    groundPoints:[],
    groundPoints2:[],

    addGround:function(){
        for(var i = 0; i < this.width/this.spacing + 1; i++){
            this.groundPoints.push(this.height - this.grndHeight - (Math.random() * this.magnitude));
            this.groundPoints2.push(this.height - this.grndHeight - this.layerDiff - (Math.random() * this.magnitude));
        }
    },

    drawGround:function(context){
        Ground.drawBackLayer(context);
        Ground.drawTopLayer(context);
    },

    drawBackLayer:function(context){
        // Draw back layer first
        context.beginPath();
        context.moveTo(0, this.height - this.grndHeight - this.layerDiff);
        for(var i = 0; i < this.groundPoints2.length; i++){
            
            context.quadraticCurveTo(i*this.spacing, this.groundPoints2[i] + ((Math.random()-0.5) * this.spacing),
                i*this.spacing, this.groundPoints2[i]);

            //context.lineTo(i * this.spacing, this.groundPoints2[i]);
        }
        context.lineTo(this.width, this.height);
        context.lineTo(0, this.height);
        context.fillStyle = "rgb(50, 50, 25)";
        context.fill();
        // - - - - - - - - - - -
    },

    drawTopLayer:function(context){
        // Draw front layer
        context.beginPath();
        context.moveTo(0, this.height - this.grndHeight);
        for(var i = 0; i < this.groundPoints.length; i++){

            context.quadraticCurveTo(i*this.spacing, this.groundPoints[i] + (Math.random()-0.5) * this.spacing,
                i*this.spacing, this.groundPoints[i]);

            //context.lineTo(i * 30, this.groundPoints[i]);
        }
        context.lineTo(this.width, this.height);
        context.lineTo(0, this.height);
        context.fillStyle = "rgb(125, 125, 50)";
        context.fill();
        // - - - - - - - - - - -
    }
}