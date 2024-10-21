function Planet(_mass, _pos, _vel, _color, _orbitingBody, _planetTrail) {
  this.mass = _mass;
  this.pos = _pos;
  this.vel = _vel;
  this.d = this.mass * 2;
  this.color = _color;
  this.orbitingBody = _orbitingBody;
  this.planetTrail = _planetTrail;

  this.draw = function () {
    fill(this.color);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.d, this.d);
  };

  this.move = function () {
    var force = this.orbitingBody.attractForce(this);
    this.applyForce(force);
    this.pos.add(this.vel);

    // Update planet trail
    this.planetTrail.addPoint(this.pos.copy());
  };

  this.applyForce = function (f) {
    this.vel.add(p5.Vector.div(f, this.mass));
  };

  this.attractForce = function (child) {
    var r = p5.Vector.dist(this.pos, child.pos);
    var f = p5.Vector.sub(this.pos, child.pos);
    f.setMag((G * this.mass * child.mass) / (r * r));
    return f;
  };
}

Planet.Create = function Create(
  mass,
  radius,
  planetColor,
  orbitingBody,
  planetTrail
) {
  var angle = random(0, TWO_PI);
  var planetPos = createVector(radius * cos(angle), radius * sin(angle));

  // Find direction of orbit and set velocity
  var planetVel = planetPos.copy();
  planetVel.rotate(random(1) < 0.1 ? -HALF_PI : HALF_PI); // Direction of orbit
  planetVel.normalize();
  planetVel.mult(sqrt((CONSTANTS.gravity * orbitingBody.mass) / radius));
  planetVel.mult(random(1 - CONSTANTS.destabilise, 1 + CONSTANTS.destabilise)); // create elliptical orbit

  return new Planet(
    mass,
    planetPos,
    planetVel,
    planetColor,
    orbitingBody,
    planetTrail
  );
};
