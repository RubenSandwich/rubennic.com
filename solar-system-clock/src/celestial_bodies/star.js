function Star() {
  this.pos = createVector(
    random(-width / 2, width / 2),
    random(-height / 2, height / 2)
  );
  this.size = random(1, 3);
  this.offset = random(TWO_PI);
  this.twinkleSpeed = random(0.005, 0.015);
  this.removeFunction = null;

  this.particles = [];
  this.numParticles = 5;
  this.stage = "twinkle"; // "twinkle" or "exploading"

  this.draw = function () {
    if (this.stage === "twinkle") {
      noStroke();

      var brightness = map(
        sin(frameCount * this.twinkleSpeed + this.offset),
        -1,
        1,
        100,
        255
      );
      fill(brightness);
      ellipse(this.pos.x, this.pos.y, this.size);
    } else if (this.stage === "exploading") {
      for (var i = this.particles.length - 1; i >= 0; i--) {
        var particle = this.particles[i];
        particle.pos.add(p5.Vector.mult(particle.vel, 0.5));
        particle.size *= 0.9; // Slowly shrink particles

        fill(particle.color);
        noStroke();
        ellipse(particle.pos.x, particle.pos.y, particle.size);

        // Remove particles that are too small or off-screen
        if (
          particle.size < 0.4 ||
          particle.pos.x < -width / 2 ||
          particle.pos.x > width / 2 ||
          particle.pos.y < -height / 2 ||
          particle.pos.y > height / 2
        ) {
          this.particles.splice(i, 1);
        }
      }

      if (this.particles.length === 0) {
        this.removeFunction();
      }
    }
  };

  this.beginExploading = function (removeFunction) {
    this.stage = "exploading";
    this.removeFunction = removeFunction;

    for (var i = 0; i < this.numParticles; i++) {
      this.particles.push({
        pos: this.pos.copy(),
        vel: p5.Vector.random2D(),
        size: this.size, // Smaller particle size
        color: color(random(360), random(80, 100), random(80, 100)),
      });
    }
  };
}

Star.Create = function Create() {
  return new Star();
};
