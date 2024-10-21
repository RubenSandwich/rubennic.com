function Sun() {
  this.mass = random(20, 40);
  this.pos = createVector(0, 0);
  this.vel = createVector(0, 0);
  this.lastGrowthTime = 0;
  this.growthInterval = random(2000, 5000); // 5 seconds in milliseconds
  this.growthAmount = random(1, 5); // Amount to increase the sun's mass by
  this.d = this.mass * 2;
  this.colorsByMass = {
    30: color(0, random(80, 100), random(30, 65)), // Red
    40: color(random(20, 40), random(80, 100), random(80, 100)), // Orange
    50: color(60, random(80, 100), random(80, 100)), // Yellow
    60: color(60, random(20, 40), random(90, 100)), // Light Yellow
    70: color(random(180, 220), random(20, 40), random(80, 100)), // Light Blue
    80: color(0, 0, random(90, 100)), // White
  };
  this.massIntervals = Object.keys(this.colorsByMass);
  this.lowestMass = parseInt(this.massIntervals[0], 10);
  this.highestMass = parseInt(
    this.massIntervals[this.massIntervals.length - 1],
    10
  );

  this.currentColor =
    this.colorsByMass[
      Math.min(Math.max(Math.floor(this.mass / 10) * 10, this.lowestMass), 80)
    ];

  this.stage = "sun"; // "sun", "big bang", or "black hole"
  this.particles = [];
  this.numParticles = 400;

  this.draw = function () {
    if (this.stage === "big bang") {
      this.drawBigBang();
      return;
    } else if (this.stage === "black hole") {
      this.drawBlackHole();
      return;
    }

    // Check if it's time to increase the sun's mass
    if (millis() - this.lastGrowthTime > this.growthInterval) {
      this.mass += this.growthAmount;
      this.d = this.mass * 2; // Update sun's diameter
      this.lastGrowthTime = millis();

      var massIndex = Math.min(
        Math.max(Math.floor(this.mass / 10) * 10, this.lowestMass),
        80
      );

      this.currentColor = this.colorsByMass[massIndex];
    }

    this.drawSun();
  };

  this.applyForce = function (f) {
    this.vel.add(p5.Vector.div(f, this.mass));
  };

  this.attractForce = function (child) {
    var r = p5.Vector.dist(this.pos, child.pos);
    var f = p5.Vector.sub(this.pos, child.pos);
    f.setMag((CONSTANTS.gravity * this.mass * child.mass) / (r * r));
    return f;
  };

  this.beginSun = function () {
    this.stage = "sun";
    this.particles = [];
  };

  this.drawSun = function () {
    fill(this.currentColor);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.d, this.d);
  };

  this.beginBigBang = function () {
    this.stage = "big bang";

    // update any existing particles so that they are never static
    for (var i = 0; i < this.particles.length; i++) {
      var particle = this.particles[i];
      particle.vel = p5.Vector.random2D().mult(random(1, 5));
    }

    for (var i = 0; i < this.numParticles; i++) {
      this.particles.push({
        pos: createVector(0, 0),
        vel: p5.Vector.random2D().mult(random(1, 5)),
        size: random(2, 6),
        color: color(random(360), random(80, 100), random(80, 100)),
      });
    }

    this.mass = random(5, 10);
    this.pos = createVector(0, 0);
    this.vel = createVector(0, 0);
    this.lastGrowthTime = 0;
    this.growthInterval = random(2000, 5000); // 5 seconds in milliseconds
    this.growthAmount = random(1, 5); // Amount to increase the sun's mass by
    this.d = this.mass * 2;
  };

  this.drawBigBang = function () {
    for (var i = this.particles.length - 1; i >= 0; i--) {
      var particle = this.particles[i];
      particle.pos.add(particle.vel);
      particle.size *= 0.9999999999; // Slowly shrink particles

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

    this.drawSun();

    if (this.particles.length === 0) {
      setup();
    }
  };

  this.beginBlackHole = function () {
    this.stage = "black hole";
  };

  this.drawBlackHole = function () {
    push();
    translate(this.pos.x, this.pos.y);

    // Draw the black center (event horizon)
    fill(0);
    noStroke();
    ellipse(0, 0, this.d, this.d);

    // Draw the pulsing white ring
    var pulseSpeed = 0.025;
    var pulseAmplitude = 5;
    var ringThickness = Math.abs(sin(frameCount * pulseSpeed)) * pulseAmplitude;

    noFill();
    stroke(255);
    strokeWeight(ringThickness);
    ellipse(0, 0, this.d + ringThickness, this.d + ringThickness);

    // Draw the pulsing disk across the middle
    var diskPulseAmplitude = 1.5;
    var diskWidth = this.d * 2.25;
    var diskThickness =
      Math.abs(sin(frameCount * pulseSpeed)) * diskPulseAmplitude;

    noStroke();
    fill(255);
    rectMode(CENTER);
    ellipse(0, 0, diskWidth, diskThickness);

    // Introduce new particles over time
    if (frameCount % 50 === 0) {
      // Adjust the modulus value to control the rate of particle introduction
      for (var i = 0; i < random(1, 5); i++) {
        // Adjust the number of particles introduced each time
        this.particles.push({
          pos: createVector(
            random(-width / 2, width / 2),
            random(-height / 2, height / 2)
          ),
          vel: createVector(0, 0),
          size: random(1, 3), // Smaller particle size
          color: color(random(360), random(80, 100), random(80, 100)),
        });
      }
    }

    // Draw particles being sucked into the black hole in a spiral pattern
    for (var i = this.particles.length - 1; i >= 0; i--) {
      var particle = this.particles[i];
      var dx = this.pos.x - particle.pos.x;
      var dy = this.pos.y - particle.pos.y;
      var distance = sqrt(dx * dx + dy * dy);
      var angle = atan2(dy, dx);
      var force = this.d / 8 / distance;
      var spiralForce = createVector(
        cos(angle + force),
        sin(angle + force)
      ).mult(force * 0.1); // Move slowly
      particle.vel.add(spiralForce);
      particle.pos.add(particle.vel);

      // Remove particle if it hits the center of the black hole
      if (distance < this.d / 2) {
        this.particles.splice(i, 1);
        continue;
      }

      fill(particle.color);
      noStroke();
      ellipse(particle.pos.x, particle.pos.y, particle.size);
    }

    pop();
  };
}

Sun.Create = function Create() {
  var sun = new Sun();
  // Initialize an empty array for particles
  sun.particles = [];
  return sun;
};
