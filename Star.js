export const Stars = {
    num:0,
    width:0,
    height:0,

    stars:[],

    addStars: function(){
        for(var i = 0; i < this.num; i++){
            this.stars.push({
                x:Math.random() * this.width,
                y:Math.random() * this.height
            });
        }
    },

    drawStars: function(context){

        for(var i = 0; i < this.stars.length; i++){
            context.beginPath();
            context.fillStyle = "white";
            let randRadius = 1 + Math.random();
            context.arc(this.stars[i].x, this.stars[i].y, randRadius, 0, Math.PI*2, false);
            context.fill();
        }
    },
}