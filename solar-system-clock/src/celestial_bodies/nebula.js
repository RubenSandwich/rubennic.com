function Nebula(_pos, _size, _noiseOffset, _nebulaRender) {
  this.pos = _pos;
  this.initialPos = this.pos.copy();
  this.size = _size;
  this.noiseOffset = _noiseOffset;
  this.nebulaRender = _nebulaRender;
  this.frameOffset = random(0, 100);
  this.currentAlpha = 100;

  this.draw = function () {
    // var moveRadius = this.size / 4; // Adjust this value to change movement range
    // var moveSpeed = 0.0009;
    // var moveAngle = noise(frameCount * moveSpeed + this.noiseOffset) * TWO_PI;
    // this.pos.x = this.initialPos.x + cos(moveAngle) * moveRadius;
    // this.pos.y = this.initialPos.y + sin(moveAngle) * moveRadius;

    // Too slow on the ipad :(
    // tint(255, 0.5 + sin((this.frameOffset + frameCount) * 0.01) * 0.2);

    image(
      this.nebulaRender,
      this.pos.x - this.size / 2,
      this.pos.y - this.size / 2
    );
  };

  this.changeAlpha = function (newAlpha) {
    var ctx = this.nebulaRender.drawingContext;
    var ctxImage = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

    var imageData = ctxImage.data;
    // set every fourth, alpha, value
    for (var i = 3; i < imageData.length; i += 4) {
      imageData[i] = newAlpha;
    }

    ctxImage.data = imageData;
    ctx.putImageData(ctxImage, 0, 0);
    this.currentAlpha = newAlpha;
  };

  this.destroy = function () {
    this.nebulaRender.remove();
    this.nebulaRender = null;
  };
}

Nebula.Create = function Create() {
  var nebulaPos = createVector(
    random(-width / 2, width / 2),
    random(-height / 2, height / 2)
  );
  var size = random(100, 250);
  var noiseOffset = random(1000);

  var nebulaRender = createGraphics(size, size);
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

  // nebulaRender.colorMode(HSB, 360, 100, 100, 1);
  // nebulaRender.fill(random(360), 80, 100, 0.05);

  radialGradient(
    nebulaRender.drawingContext,
    nebulaRender.width / 2,
    nebulaRender.height / 2,
    nebulaRender.width / 2,
    [
      {
        offset: 0,
        color: "hsla(" + String(random(0, 360)) + ", 80%, 50%, 0.05)",
      },
      {
        offset: 1,
        color: "hsla(" + String(random(0, 360)) + ", 80%, 50%, 0.05)",
      },
    ]
  );

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
