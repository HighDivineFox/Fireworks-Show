import { GlobalSettings } from "../GlobalSettings.js";
import { Stars } from "../Star.js";
import { Ground } from "../Ground.js";
import { ResourceTracker } from "./Resources/ResourceTracker.js";
import Button from "../Button.js";
import { UpgradesManager } from "./UpgradesManager.js";
import { ShowManager } from "./ShowManager/ShowManager.js";
import { Images } from "../Images.js";
import { ShopManager } from "./ShopManager/ShopManager.js";

export const BackgroundManager = {
    buttons:[],

    init:function(bgContext){
        // Main Menu Buttons
        BackgroundManager.buttons.push(new Button(2, 2, 194, 60, "Show Manager", ShowManager.showHide, "center"));
        BackgroundManager.buttons.push(new Button(2, 130, 194, 60, "Upgrades", UpgradesManager.showHide, "center"));

        // Upgrade buttons
        // Category buttons

        // Upgrades
        UpgradesManager.buttons.push(new Button(230, 100, 274, 60, "Firework speed", UpgradesManager.IncreaseFireworkSpeed));
        UpgradesManager.buttons.push(new Button(230, 164, 194, 60, "Firework Colour", UpgradesManager.UpgradeFireworkColours));
        UpgradesManager.buttons.push(new Button(230, 228, 304, 60, "Explosion Radius", UpgradesManager.IncreaseExplosionRadius));

        // Show manager Buttons
        ShowManager.buttons.push(new Button(20, 530 , 180, 50, "Begin Show!", ShowManager.BeginShow, "center"));
        ShowManager.buttons.push(new Button(770, 10, 20, 20, "X", ShowManager.showHide));

        // Set the amount of initial stars
        Stars.num = 200;
        Stars.width = GlobalSettings.canvasWidth;
        Stars.height = GlobalSettings.canvasHeight / 1.6;
        Stars.addStars();

        // Set up initial ground
        Ground.spacing = 30;
        Ground.width = GlobalSettings.canvasWidth;
        Ground.height = GlobalSettings.canvasHeight;
        Ground.grndHeight = 60;
        Ground.magnitude = 30; // Smoothness
        Ground.layerDiff = 40;
        Ground.addGround();

        // Draw initial background
        BackgroundManager.drawButtons(bgContext);
        BackgroundManager.drawBackground(bgContext);
    },

    drawButtons:function(bgContext){
        // Draw Buttons on bgCanvas
        for(var i = 0; i < this.buttons.length; i++){
            this.buttons[i].draw(bgContext);
        }
    },

    drawBackground:function(bgContext){
        let gradient = bgContext.createLinearGradient(GlobalSettings.canvasWidth/3, 0,GlobalSettings.canvasWidth/2, GlobalSettings.canvasHeight);
        gradient.addColorStop(0, "rgb(0, 0, 70");
        gradient.addColorStop(1, "rgb(0, 0, 30");

        // Draw initial BG
        bgContext.translate(200, 0);
        bgContext.fillStyle = gradient;
        bgContext.fillRect(0, 0, GlobalSettings.canvasWidth, GlobalSettings.canvasHeight);
        Stars.drawStars(bgContext);
        Ground.drawGround(bgContext);

        bgContext.resetTransform();
    },

    drawGoldValue:function(bgContext){
        // Draw gold Value
        bgContext.fillStyle = "black";
        bgContext.font = "18px Arial";   
        bgContext.textAlign = "left";
        bgContext.fillText("Gold: $" + ResourceTracker.gold.amount, 5, bgCanvas.height - 15);
        // ----------------
    },

    drawFireworkResources:function(bgContext){
        // Basic Firework
        bgContext.beginPath();
        bgContext.putImageData(Images.miniBasicFirework, 5, 205);
        bgContext.fillText("x" + (ResourceTracker.basicFireworkCount.amount - ShowManager.storedBasicsCount(this)), 35, 225);

        // Flare Firework
        bgContext.beginPath();
        bgContext.putImageData(Images.miniFlare, 5, 245);
        bgContext.fillText("x" + (ResourceTracker.flareCount.amount - ShowManager.storedFlareCount()), 35, 265);

        // Mine Firework
        bgContext.beginPath();
        bgContext.putImageData(Images.miniMine, 5, 285);
        bgContext.fillText("x" + (ResourceTracker.mineCount.amount - ShowManager.storedMineCount()), 35, 305);
    },
}