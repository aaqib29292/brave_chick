window.addEventListener('load', function(){

  var gameLive = true;

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

  // goal object
  var goal = {
    x: 580, /*x coordinate*/
    y: 160, /*y coordinate*/
    w: 40, /*width*/
    h: 40,/*height*/
  };


  // getting canvas n context
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext("2d");

  // player status
  var movePlayer = function () {
    player.isMoving = true;
  };

  var stopPlayer = function () {
    player.isMoving = false;
  }


  // events spacebar, mouseClick, and touch
  document.onkeydown = function (event) {
    if(event.keyCode == 32 ) {
      movePlayer();
    }
  };

  document.onkeyup = function (event) {
    if(event.keyCode == 32 ) {
      stopPlayer();
    }
  };

  // event listeners to move player
  canvas.addEventListener('mousedown', movePlayer);
  canvas.addEventListener('mouseup', stopPlayer);
  canvas.addEventListener('touchstart', movePlayer);
  canvas.addEventListener('touchdown', stopPlayer);


  // updating the rectangle position
  var update = function() {

    //  check for goal
    if(checkCollision(player, goal)){
      //stop the game
      gameLive = false;

      alert("YOU WON!");

      //reload the page
      window.location = "";
    }

    //update player
    if(player.isMoving) {
      player.x += player.speedX;
    }

    // update the position of each enemy
    var n = enemies.length;

    enemies.forEach(function (ele, index) {
      // collision of player with the enemies
      if(checkCollision(player, ele)) {
        //stop the game
        gameLive = false;

        alert("GAME OVER!");

        //reload the page
        window.location = "";
      }

      // move enemies
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


    //draw each enemy

    ctx.fillStyle = "rgb(200,0,100)";

    var n = enemies.length;

    enemies.forEach(function (ele, index) {
      ctx.fillRect(ele.x, ele.y, ele.w, ele.h);
    })

    // draw goal
    ctx.fillStyle = "rgb(128, 128, 0)";
    ctx.fillRect(goal.x, goal.y, goal.w, goal.h);

  }

  // to repeat step fn multiple time per sec
  var step = function() {

    update();
    draw();
    if(gameLive) {
      window.requestAnimationFrame(step) /*repeats step function while animation*/
    }

  }

  var checkCollision = function (rect1, rect2) {
    var closeOnWidth = Math.abs(rect1.x -rect2.x) <= Math.max(rect1.w, rect2.w)
    var closeOnHeight = Math.abs(rect1.y -rect2.y) <= Math.max(rect1.h, rect2.h)

    return closeOnWidth && closeOnHeight;
  }

  // starting
  step()



});
