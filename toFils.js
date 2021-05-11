Number.prototype.toFils = function () {
  return Math.round((this.valueOf() + Number.EPSILON) * 1000) / 1000;
};
