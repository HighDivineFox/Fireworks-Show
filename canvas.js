import { FireworkManager } from "./Managers/FireworksManager.js";
import { GlobalSettings } from "./GlobalSettings.js";
import { ExplosionManager } from "./Managers/ExplosionManager.js";
import { BackgroundManager } from "./Managers/BackgroundManager.js";
import { ShowManager } from "./Managers/ShowManager/ShowManager.js";
import { ShopManager } from "./Managers/ShopManager/ShopManager.js";
import { UpgradesManager } from "./Managers/UpgradesManager.js";

var bgCanvas = document.getElementById('bgCanvas');
var canvas = document.getElementById('mainCanvas');

bgCanvas.height = 600;
bgCanvas.width = 1000;
//bgCanvas.style = "background: #DDD;";

canvas.height = bgCanvas.height;
canvas.width = bgCanvas.width - 200;

GlobalSettings.canvasWidth = canvas.width;
GlobalSettings.canvasHeight = canvas.height;

var bgContext = bgCanvas.getContext('2d');
var context = canvas.getContext('2d');

//Binding the click event on the canvas
bgCanvas.addEventListener('click', function(evt) {
  var mousePos = getMousePos(bgCanvas, evt);

  for(var i = 0; i < BackgroundManager.buttons.length; i++){
    if (isInside(mousePos, BackgroundManager.buttons[i])) {
      BackgroundManager.buttons[i].onClick(); 
    }
  }
   
}, false);

//Binding the click event on the canvas
canvas.addEventListener('click', function(evt) {
  var mousePos = getMousePos(canvas, evt);
  ShowManager.onClick(mousePos);
  ShopManager.onClick(mousePos);
  UpgradesManager.onClick(mousePos);
   
}, false);


//Function to check whether a point is inside a rectangle
function isInside(pos, rect){
  return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
}

//Function to get the mouse position
function getMousePos(canvas, event) {
  var rect = canvas.getBoundingClientRect();
  return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
  };
}

{var animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) { window.setTimeout(callback, 1000/30) };
}

BackgroundManager.init(bgContext);
GlobalSettings.lastUpdate = Date.now();

ShowManager.context = context;
ShopManager.context = context;
UpgradesManager.context = context;

animate(step);
function step(){
  let now = Date.now();
  GlobalSettings.deltaTime = (now - GlobalSettings.lastUpdate) / 1000;
  GlobalSettings.lastUpdate = now;
  
  context.clearRect(0, 0, canvas.width, canvas.height);

  if(GlobalSettings.requestBGRedraw){
    bgContext.clearRect(0 ,0 , 200, bgCanvas.height);
    
    BackgroundManager.drawButtons(bgContext);    

    // Stop redrawing BG
    GlobalSettings.requestBGRedraw = false;
  }

  // Update Fireworks
  FireworkManager.update();
  ExplosionManager.update();

  // Draw Fireworks
  FireworkManager.drawFireworks(context);
  ExplosionManager.drawExplosions(context);

  // Draw Managers
  ShowManager.draw();
  ShopManager.draw();
  UpgradesManager.draw();
  

  // TEST AREA
  if(FireworkManager.fireworks.length == 0){
    //FireworkManager.addFireWorkToQueue(3, 0);
  }
  

  animate(step);
}