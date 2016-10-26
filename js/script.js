window.addEventListener('load', function(){


  // Constants
  var GAME_WIDTH = 640;
  var GAME_HEIGHT = 360;


  var enemies = [
    {
      x: 100, /*x coordinate*/
      y: 100, /*y coordinate*/
      speedY: 2, /*speed in Y*/
      w: 40, /*width*/
      h: 40 /*height*/
    },
    {
      x: 200, /*x coordinate*/
      y: 0, /*y coordinate*/
      speedY: 2, /*speed in Y*/
      w: 40, /*width*/
      h: 40 /*height*/
    },
    {
      x: 330, /*x coordinate*/
      y: 100, /*y coordinate*/
      speedY: 3, /*speed in Y*/
      w: 40, /*width*/
      h: 40 /*height*/
    },
    {
      x: 450, /*x coordinate*/
      y: 100, /*y coordinate*/
      speedY: 5, /*speed in Y*/
      w: 40, /*width*/
      h: 40 /*height*/
    },
  ]

  // getting canvas n context
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext("2d");

  // updating the rectangle position
  var update = function() {

    // update the position of each enemy
    var n = enemies.length;

    enemies.forEach(function (ele, index) {
      ele.y += ele.speedY;
    })

  };

  // show it on the screen
  var draw = function(){
    // clearing the canvas
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.fillStyle = "rgb(200,0,100)";

    //draw each enemy

    var n = enemies.length;

    enemies.forEach(function (ele, index) {
      ctx.fillRect(ele.x, ele.y, ele.w, ele.h);
    })

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
