const Game = function(topLeft, bottomRight) {
  this.topLeft = topLeft;
  this.bottomRight = bottomRight;
  this.snake = {};
  this.food = {};
  this.score = 0;
}

Game.prototype.addScore = function() {
    this.score += 10;
};

Game.prototype.updateScore = function(head) {
  if (this.snake.head.isSameCoordAs(this.food.getPosition())) {
    this.addScore();
  };
}

Game.prototype.addSnake = function(snake) {
  this.snake = snake;
}

Game.prototype.getSnake = function() {
  return snake;
}

Game.prototype.turnLeft = function() {
  return this.snake.turnLeft();
}

Game.prototype.turnRight = function() {
  return this.snake.turnRight();
}

Game.prototype.grow = function() {
  let growthFactor = this.food.getGrowthFactor();
  // console.log(growthFactor);
  return this.snake.grow(growthFactor);
}

Game.prototype.getFood = function() {
  return this.food;
}

Game.prototype.move = function() {
  let details = {};
  details.oldHead = this.snake.getHead();
  details.oldTail = this.snake.move();
  details.head = this.snake.getHead();
  return details;
}

Game.prototype.hasSnakeEatenFood = function() {
  return this.snake.head.isSameCoordAs(this.food.getPosition());
}

Game.prototype.createFood = function() {
  console.log(this.bottomRight);
  let position = generateRandomPosition(this.bottomRight.x, this.bottomRight.y);

  let random = generateRandomNumberBetween(0, 10);
  let growthFactor = 1;
  let superFood = false;
  if (random > 5) {
    growthFactor = 10;
    superFood = true;
  }
  this.food = new Food(position, growthFactor, superFood);
}


Game.prototype.isSnakeXAxisEdgePosition = function(xPosition) {
  return xPosition == 0 || xPosition == numberOfCols - 1;
};

Game.prototype.isSnakeYAxisEdgePosition = function(yPosition) {
  return yPosition == 0 || yPosition == numberOfRows - 1;
}

Game.prototype.isSnakeAtEdgePosition = function(xPosition, yPosition) {
  return this.isSnakeXAxisEdgePosition(xPosition) || this.isSnakeYAxisEdgePosition(yPosition);
}

Game.prototype.checkSnakePositions = function(xPosition, yPosition) {
  return this.isSnakeAtEdgePosition(xPosition, yPosition) || snake.isSnakeEatingItself();
}

Game.prototype.hasGameOver = function(snakeHead) {
  let xPosition = snakeHead.x;
  let yPosition = snakeHead.y;
  return this.checkSnakePositions(xPosition, yPosition);
}
