function Nebula(_pos, _size, _noiseOffset, _renderedImage) {
  this.pos = _pos;
  this.initialPos = this.pos.copy();
  this.size = _size;
  this.noiseOffset = _noiseOffset;
  this.renderedImage = _renderedImage;

  this.draw = function () {
    // var moveRadius = this.size / 4; // Adjust this value to change movement range
    // var moveSpeed = 0.0009;
    // var moveAngle = noise(frameCount * moveSpeed + this.noiseOffset) * TWO_PI;
    // this.pos.x = this.initialPos.x + cos(moveAngle) * moveRadius;
    // this.pos.y = this.initialPos.y + sin(moveAngle) * moveRadius;

    image(
      this.renderedImage,
      this.pos.x - this.size / 2,
      this.pos.y - this.size / 2
    );
  };
}

Nebula.Create = function Create() {
  var nebulaPos = createVector(
    random(-width / 2, width / 2),
    random(-height / 2, height / 2)
  );
  var size = random(100, 250);
  var hue = random(360);
  var noiseOffset = random(1000);

  var nebulaRender = createGraphics(size, size);
  nebulaRender.colorMode(HSB, 360, 100, 100, 1);
  nebulaRender.noStroke();

  // Generate blob shape
  var points = [];
  var numPoints = 15; // Fewer points for more polygon-like shape
  for (var j = 0; j < numPoints; j++) {
    var angle = map(j, 0, numPoints, 0, TWO_PI);
    var noiseValue = noise(cos(angle) + noiseOffset, sin(angle) + noiseOffset);
    var radius = map(noiseValue, 0, 1, size / 8, size / 2);
    var x = radius * cos(angle);
    var y = radius * sin(angle);
    points.push(createVector(x, y));
  }

  // Draw blob
  nebulaRender.fill(hue, 80, 100, 0.05);
  for (var j = 0; j < 5; j++) {
    // Draw multiple layers for a glowing effect
    nebulaRender.beginShape();
    for (var k = 0; k < points.length; k++) {
      var p = points[k];
      nebulaRender.curveVertex(p.x + size / 2, p.y + size / 2);
    }
    // Add the first two points again to close the shape smoothly
    nebulaRender.curveVertex(points[0].x + size / 2, points[0].y + size / 2);
    nebulaRender.curveVertex(points[1].x + size / 2, points[1].y + size / 2);
    nebulaRender.endShape(CLOSE);
  }

  return new Nebula(nebulaPos, size, noiseOffset, nebulaRender);
};
