function Moon(
  _mass,
  _pos,
  _color,
  _orbitRadius,
  _orbitAngle,
  _orbitingBody,
  _planetTrail
) {
  this.mass = _mass;
  this.d = this.mass * 2;
  this.pos = _pos;
  this.color = _color;
  this.orbitingBody = _orbitingBody;
  this.orbitRadius = _orbitRadius;
  this.orbitAngle = _orbitAngle;

  this.planetTrail = _planetTrail;

  this.draw = function () {
    fill(this.color);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.d, this.d);
  };

  this.move = function () {
    // Update the moon's orbit angle
    // 0.02 - 0.09 are good values
    this.orbitAngle += 0.07;

    // Calculate new position relative to the planet
    var relativePos = createVector(
      this.orbitRadius * cos(this.orbitAngle),
      this.orbitRadius * sin(this.orbitAngle)
    );

    // Update moon's position relative to the planet
    this.pos = p5.Vector.add(this.orbitingBody.pos, relativePos);

    // Update planet trail
    this.planetTrail.addPoint(this.pos.copy());
  };
}

Moon.Create = function Create(mass, color, orbitingBody, planetTrail) {
  var orbitRadius = random(orbitingBody.d * 1.2, orbitingBody.d * 2);
  var orbitAngle = random(0.05, 0.12);

  var pos = p5.Vector.add(
    orbitingBody.pos,
    createVector(orbitRadius * cos(orbitAngle), orbitRadius * sin(orbitAngle))
  );

  return new Moon(
    mass,
    pos,
    color,
    orbitRadius,
    orbitAngle,
    orbitingBody,
    planetTrail
  );
};
