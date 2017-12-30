let snake=undefined;
let food=undefined;
let numberOfRows=60;
let numberOfCols=120;
let animator=undefined;

const stopGame = function (head) {
  let xPosition = head.x;
  let yPosition = head.y;
  checkPositionsAndStopGame(xPosition,yPosition);
}

const isXAxisEdgePosition = function (xPosition) {
  return xPosition == 0 || xPosition == numberOfCols;
};

const isYAxisEdgePosition = function (yPosition) {
  return yPosition == 0 || yPosition == numberOfRows;

}

const isAnyEdgePosition = function(xPosition,yPosition){
  return isXAxisEdgePosition(xPosition) || isYAxisEdgePosition (yPosition);
}

const checkPositionsAndStopGame = function(xPosition,yPosition){
  if(isAnyEdgePosition(xPosition,yPosition)||snake.isSnakeEatingItself()){
    clearInterval(animator);
    document.getElementById("stopGame").innerText ="Game Over";
  }
};
//
const playAgain = function () {
  document.getElementById("stopGame").innerText ="";
  location.reload();
};

const displayScore = function () {
  document.getElementById("scoreUpdate").innerText = game.score;
};

const animateSnake=function() {
  let oldHead=snake.getHead();
  let oldTail=snake.move();
  let head=snake.getHead();
  game.updateScore(head);
  paintBody(oldHead);
  unpaintSnake(oldTail);
  paintHead(head);
  if(head.isSameCoordAs(food)) {
    snake.grow();
    createFood(numberOfRows,numberOfCols);
    drawFood(food);
  }
  displayScore();
  stopGame(head);
}

const changeSnakeDirection=function(event) {
  switch (event.code) {
    case "KeyA":
      snake.turnLeft();
      break;
    case "KeyD":
      snake.turnRight();
      break;
    case "KeyC":
      snake.grow();
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
  game = new Game();
  let tail=new Position(12,10,"east");
  let body=[];
  body.push(tail);
  body.push(tail.next());
  let head=tail.next().next();
  snake=new Snake(head,body);
}

const createFood=function(numberOfRows,numberOfCols) {
  food=generateRandomPosition(numberOfCols,numberOfRows);
};

const startGame=function() {
  createSnake();
  drawGrids(numberOfRows,numberOfCols);
  drawSnake(snake);
  createFood(numberOfRows,numberOfCols);
  drawFood(food);
  addKeyListener();
  animator=setInterval(animateSnake,200);
}

window.onload=startGame;
