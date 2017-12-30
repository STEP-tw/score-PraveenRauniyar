const Food=function(position,growthFactor,superFood) {
  this.position=position;
  this.growthFactor=growthFactor;
  this.superFood=superFood;
}

Food.prototype.getPosition=function() {
  return this.position;
}

Food.prototype.getGrowthFactor=function() {
  return this.growthFactor;
}

Food.prototype.isSuperFood=function() {
  return this.superFood;
}
