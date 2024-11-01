function PlanetTrail(_color, _pathLengthMax, _trailAlphas) {
  this.color = _color;
  this.path = [];
  this.pathLengthMax = _pathLengthMax;
  this.windDown = false;
  this.trailAlphas = _trailAlphas;

  this.draw = function () {
    if (this.windDown) {
      this.path.splice(0, 1);
      if (this.path.length <= 0) {
        return false; // Stop drawing this trail, and remove it
      }
    }

    strokeWeight(1);

    for (var i = 0; i < this.path.length - 1; i++) {
      this.color.setAlpha(this.trailAlphas[i]);
      stroke(this.color);

      line(
        this.path[i].x,
        this.path[i].y,
        this.path[i + 1].x,
        this.path[i + 1].y
      );
    }

    return true; // Continue drawing this trail
  };

  this.addPoint = function (point) {
    this.path.push(point);
    if (this.path.length > this.pathLengthMax) {
      this.path.shift(); // Remove the oldest point if we exceed the max length
    }
  };

  this.beginWindDown = function () {
    this.windDown = true;
  };
}

PlanetTrail.Create = function Create(planetTrailColor, pathLengthMax) {
  var planetTrailColorCopy = color(
    hue(planetTrailColor),
    saturation(planetTrailColor),
    brightness(planetTrailColor),
    alpha(planetTrailColor)
  );

  var trailAlphas = [];
  // Create an array of colors with gradually increasing alpha
  for (var i = 0; i < pathLengthMax; i++) {
    var trailAlpha = map(i, 0, pathLengthMax - 1, 0.1, 1);
    trailAlphas.push(trailAlpha);
  }

  return new PlanetTrail(planetTrailColorCopy, pathLengthMax, trailAlphas);
};
