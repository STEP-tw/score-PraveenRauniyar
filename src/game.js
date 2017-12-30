let Game = function () {
  this.score = 0;
};

Game.prototype.addScore = function(){
  this.score += 10;
}

Game.prototype.updateScore = function (head) {
    if(food.x == head.x && food.y == head.y){
      this.addScore();
    };
}
