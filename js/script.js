window.addEventListener('load', function(){

  var gameLive = true;

  // Constants
  var GAME_WIDTH = 640;
  var GAME_HEIGHT = 360;

  //current level
  var level = 1

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
    x: 540, /*x coordinate*/
    y: 140, /*y coordinate*/
    w: 80, /*width*/
    h: 80,/*height*/
  };

  //sprites
  var sprites = {};

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

  var load = function() {
    sprites.player = new Image();
    sprites.player.src = "images/hero.png";

    sprites.background = new Image();
    sprites.background.src = "images/background.jpg";

    sprites.enemy = new Image();
    sprites.enemy.src = "images/enemy.png";

    sprites.goal = new Image();
    sprites.goal.src = "images/goal.png";
  }

  // updating the rectangle position
  var update = function() {

    //  check for goal
    if(checkCollision(player, goal)){
      //stop the game
      // gameLive = false;
      //
      // alert("YOU WON!");
      //
      // //reload the page
      // window.location = "";


      // level uu the game after winning
      level++

      player.x = 10;
      player.y = 160;

      // speed up enemies speed
      enemies.forEach(function (ele, index) {
        if(ele.speedY > 0) {
          ele.speedY++
        } else {
          ele.speedY--
        }
      })
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

  // draw images

    // background
    ctx.drawImage(sprites.background, 0, 0)

    // player
    ctx.drawImage(sprites.player, player.x, player.y)

    // enemy
    enemies.forEach(function (ele, index) {
      ctx.drawImage(sprites.enemy, ele.x, ele.y)
    })

    // goal
    ctx.drawImage(sprites.goal, goal.x, goal.y)

    // //draw player objects
    //
    // ctx.fillStyle = "rgb(100,100,200)";
    // ctx.fillRect(player.x, player.y, player.w, player.h);
    //
    //
    // //draw each enemy
    //
    // ctx.fillStyle = "rgb(200,0,100)";
    //
    // var n = enemies.length;
    //
    // enemies.forEach(function (ele, index) {
    //   ctx.fillRect(ele.x, ele.y, ele.w, ele.h);
    // })
    //
    // // draw goal
    // ctx.fillStyle = "rgb(128, 128, 0)";
    // ctx.fillRect(goal.x, goal.y, goal.w, goal.h);

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
  load();
  step();



});
