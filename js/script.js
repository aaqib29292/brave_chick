window.addEventListener('load', function(){

  // intial position
  var x = 10;
  var y = 10;

  // rectangular dimensions
  var w = 20;
  var h = 30;

  // speed at wch it moves
  var speed = 2;

  // getting canvas n context
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext("2d");

  // updating the rectangle position
  var update = function() {

    x = x + speed;

  };

  // show it on the screen
  var draw = function(){
    ctx.clearRect(0, 0, 500, 300);
    ctx.fillStyle = "rgb(200,0,100)";
    ctx.fillRect(x, y, w, h);
  }

  // to repeat step fn multiple time per sec
  var step = function() {

    update();
    draw();

    window.requestAnimationFrame(step) /*repeats step function while animation*/
  }

  // starting
  step()



});
