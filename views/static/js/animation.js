var   canvas = document.querySelector('canvas'),
         ctx = canvas.getContext('2d'),
   particles = [],
patriclesNum = 20,
           w = 700,
           h = 700,
      colors = ['#f35d4f']//,'#f36849','#c0d988','#6ddaf1','#f1e85b'];

canvas.width = w;
canvas.height = h;
canvas.style.left = (window.innerWidth - 500)/2+'px';

if(window.innerHeight>500)
var curX = 10;
var curY = 10;
function Factory(){
  this.x = curX;
  this.y = curY;
  this.rad = 1;
  this.rgba = colors[ Math.round( Math.random() * 3) ];
  this.vx = Math.round( Math.random() * 3) - 1.5;
  this.vy = Math.round( Math.random() * 3) - 1.5;
  curX += 0;
  curY += 50;
}

function draw(){
  ctx.clearRect(0, 0, w, h);
  ctx.globalCompositeOperation = 'lighter';
  var temp = particles[0];
  var factor = 1;
  ctx.arc(w / 2, h / 2, temp.rad*30, 0, Math.PI*2, true);
  ctx.fill();
  for(var j = 1; j<patriclesNum; j++){
      ctx.beginPath();
      var temp2 = particles[j];
      ctx.arc(temp2.x, temp2.y, temp2.rad*20, 0, Math.PI*2, true);
      ctx.fillStyle = temp2.rgba;
      ctx.fill();
      ctx.closePath();
  }
  for (var j = 1; j<patriclesNum; j++){
  var temp2 = particles[j];
      ctx.beginPath();
      ctx.strokeStyle = '#ccc';
      ctx.linewidth = 0.1;
      ctx.moveTo(w / 2, h / 2);
      ctx.lineTo(temp2.x, temp2.y);
      ctx.stroke();
      ctx.closePath();
  }
    /**
    temp.x += temp.vx;
    temp.y += temp.vy;

    if(temp.x > w)temp.x = 0;
    if(temp.x < 0)temp.x = w;
    if(temp.y > h)temp.y = 0;
    if(temp.y < 0)temp.y = h;
    **/

}

function findDistance(p1,p2){
  return Math.sqrt( Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2) );
}

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

(function init(){
  for(var i = 0; i < patriclesNum; i++){
    particles.push(new Factory);
  }
})();

(function loop(){
  draw();
  requestAnimFrame(loop);
})();
