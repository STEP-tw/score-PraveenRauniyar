let game=undefined;
let numberOfRows=60;
let numberOfCols=120;
let animator=undefined;

const playAgain = function () {
  location.reload();
};

const stopGame = function (head) {
  if(game.hasGameOver(head)){
    clearInterval(animator);
    document.getElementById("game-Over").innerText = "Game Over";
    document.getElementById("restart-Button").innerHTML = `<button id= "restart-Button" onclick=playAgain()>Play Again</button>`
  }
};

const animateSnake=function() {
  let details=game.move();
  game.updateScore(details.head);
  paintBody(details.oldHead);
  unpaintSnake(details.oldTail);
  paintHead(details.head);
  if(game.hasSnakeEatenFood()) {
    game.grow();
    game.createFood();
    drawFood(game.getFood());
    displayScore();
  }
  stopGame(details.head);
}

const changeSnakeDirection=function(event) {
  switch (event.code) {
    case "KeyA":
      game.turnLeft();
      break;
    case "KeyD":
      game.turnRight();
      break;
    case "KeyC":
      game.grow();
      break;
    default:
  }
}

const addKeyListener=function() {
  let grid=document.getElementById("keys");
  grid.onkeyup=changeSnakeDirection;
  grid.focus();
}

const createSnake=function() {
  let tail=new Position(12,10,"east");
  let body=[];
  body.push(tail);
  body.push(tail.next());
  let head=tail.next().next();
  snake=new Snake(head,body);
  game.addSnake(snake);
}

const createFood=function(numberOfRows,numberOfCols) {
  game.food=generateRandomPosition(numberOfCols,numberOfRows);
};

const createGame=function() {
  let topLeft=new Position(0,0,"east");
  let bottomRight=new Position(numberOfCols,numberOfRows,"east");
  game=new Game(topLeft,bottomRight);
}

const startGame=function() {
  game = new Game();
  createGame();
  createSnake();
  drawGrids(numberOfRows,numberOfCols);
  drawSnake(game.getSnake());
  game.createFood();
  drawFood(game.getFood());
  addKeyListener();
  animator=setInterval(animateSnake,100);
}

window.onload=startGame;
