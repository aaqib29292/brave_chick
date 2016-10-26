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
  ];

  // player object
  var player = {
    x: 10, /*x coordinate*/
    y: 160, /*y coordinate*/
    speedX: 2, /*speed in Y*/
    w: 40, /*width*/
    h: 40,/*height*/
    isMoving: false
  };

  // getting canvas n context
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext("2d");

  // updating the rectangle position
  var update = function() {

    //update player
    if(player.isMoving) {
      player.x += player.speedX;
    }

    // update the position of each enemy
    var n = enemies.length;

    enemies.forEach(function (ele, index) {
      ele.y += ele.speedY;

      //checking borders
      if (ele.y <=10) {
        ele.y = 10;
        ele.speedY *= -1;
      } else if (ele.y >= GAME_HEIGHT - 50) {
        ele.y = GAME_HEIGHT - 50;
        ele.speedY *= -1;
      }
    })

  };

  // show it on the screen
  var draw = function(){
    // clearing the canvas
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    //draw player

    ctx.fillStyle = "rgb(100,100,200)";
    ctx.fillRect(player.x, player.y, player.w, player.h);

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
