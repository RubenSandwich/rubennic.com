var errorDiv;

var universeState;

function displayError(div, message) {
  if (!div) {
    setTimeout(function () {
      displayError(div, message);
    }, 1000);
  } else {
    div.style.display = "block";
    div.innerText = message;
  }
}

// Unsure... Maybe I should rotate p5?
// function deviceOrientation() {
//   var body = document.body;
//   body.classList = "";
//   switch (window.orientation) {
//     case 0:
//       body.classList.add("rotation90");
//       break;
//     case 180:
//       body.classList.add("rotation-90");
//       break;
//     default:
//       body.classList.add("landscape");
//       break;
//   }
// }
// window.addEventListener("orientationchange", deviceOrientation);

// TODO:
//    Logic:
//        1. have all universe changes (adding/removing bodies) use ticks
//        2. Add plus or minus 15% to the end of the universe?
//            a. should I even have a set end of the universe date?
//        3. log the time that is takes to hit certain ticks
//            a. and log errors
//        4. how do I prevent planets from colliding into the sun till much much later?
//            a. recalculate their mass and velocity when the sun grows?
//
//    Visuals:
//        1. make the sun "pulse"/"breath" normally
//        2. have nebulas fade in and out as the universe age
//            a. should they have stars in them?
//        3. have plants and moons fly in as comets
//        4. after a big bang it should create nebulas with a special nebula in
//          the center that turns into the sun
//
//    Questions:
//        1. should the sun "supernova" and "black hole" at the same time?
//        2. should the sun should grow once, and then wait it
//          sucks up another planet to grow again?
//        3. should I add more songs?
//            a. "Main Title" when all the planets are in place?
//            b. "Travelers" or  "14.3 Billion Years" when the universe is empty before "bouncing"?
//            c. "End Times" when the sun supernovas, at 1:25 begin the black hole
//
//    Every few days:
//        1. test on the ipad mini, lots missing on Safari in iOS 9.3.5

document.addEventListener("DOMContentLoaded", function () {
  errorDiv = document.getElementById("errors");
  // deviceOrientation();
});
// This catches script loading errors, such as Reference Errors
window.addEventListener("error", function (e) {
  console.log(e);
  displayError(errorDiv, parseErrorMessage(e));
});

// Prevent mobile touch scrolling
document.ontouchmove = function (event) {
  event.preventDefault();
};

try {
  function preload() {
    universeState = {
      p5Canvas: null,
      logUuid: generateUUID(),

      tickNum: 0,
      tickIntervalRef: null,

      planetAddInterval: random(1200000, 1500000), // 20 - 25 mins
      lastPlanetAddTime: 0,
      planetsToAdd: [], // planets left to add
      orbitalRadii: [], // Array to store orbital ring radii

      sun: null,
      planets: [],
      numPlanets: 5,
      planetTrails: [],
      stars: [], // Array to store star objs
      numStars: 200, // Number of stars to draw
      nebulas: [], // Array to store nebulas objs
      numNebulas: 5, // Number of nebulas to draw

      endSound: null,
    };

    universeState.endSound = loadSound("End_Times.mp3");
  }

  function setup() {
    // universeState.endSound.onended(function () {
    //   setup();
    // });

    // logTimes(CONSTANTS.logUuid);

    universeState.p5Canvas = createCanvas(windowWidth, windowHeight);
    frameRate(20); // maybe set to 10 when prod?
    colorMode(HSB, 360, 100, 100, 1);

    universeState.sun = Sun.Create();

    // Calculate and store the orbital radii for each planet based on the sun's diameter.
    // The initial radius is set to 1.5 times the sun's diameter, and each subsequent planet's
    // orbital radius is spaced out by at least 60 units from the previous planet's radius.
    var previousRadius = universeState.sun.d * 1.5;
    for (var i = 0; i < universeState.numPlanets; i++) {
      universeState.orbitalRadii.push(
        random(previousRadius, previousRadius + 40)
      );

      previousRadius = universeState.orbitalRadii[i] + 60;
    }

    // Initialize the planets
    for (var i = 0; i < universeState.numPlanets; i++) {
      var planetMass = random(10, 30);
      var planetColor = color(random(360), random(80, 100), random(80, 100));
      var planetTrailLength = planetMass * random(0, 7);

      var planetTrail = PlanetTrail.Create(planetColor, planetTrailLength);
      var planet = Planet.Create(
        planetMass,
        universeState.orbitalRadii[i],
        planetColor,
        universeState.sun,
        planetTrail
      );
      universeState.planetsToAdd.push(planet);

      // Randomly add a moon to some planets
      if (random(1) < 0.5) {
        var moonMass = random(3, 6);
        var moonColor = color(random(360), random(80, 100), random(80, 100));
        var moonTrailLength = moonMass * 3;

        var moonTrail = PlanetTrail.Create(moonColor, moonTrailLength);
        var moon = Moon.Create(moonMass, moonColor, planet, moonTrail);
        universeState.planetsToAdd.push(moon);
      }
    }

    // Create stars
    for (var i = 0; i < universeState.numStars; i++) {
      var star = Star.Create();
      universeState.stars.push(star);
    }

    // Create nebulas
    for (var i = 0; i < universeState.numNebulas; i++) {
      var nebula = Nebula.Create();
      universeState.nebulas.push(nebula);
    }

    universeState.tickIntervalRef = setInterval(function () {
      universeState.tickNum++;
    }, CONSTANTS.tickIntervalMs);

    // we want to add the smallest mass planets first
    universeState.planetsToAdd.sort(function (a, b) {
      return a.mass - b.mass;
    });
  }

  function draw() {
    var year = universeState.tickNum * CONSTANTS.tickPeriod;

    background(10); // #0A0A0A

    translate(width / 2, height / 2);

    blendMode(ADD);
    for (var i = 0; i < universeState.nebulas.length; i++) {
      universeState.nebulas[i].draw();
    }
    blendMode(BLEND);

    // Draw the stars
    for (var i = 0; i < universeState.stars.length; i++) {
      universeState.stars[i].draw();
    }

    universeState.sun.draw();

    if (
      millis() - universeState.lastPlanetAddTime >
        universeState.planetAddInterval &&
      universeState.planetsToAdd.length > 0
    ) {
      var newBody = universeState.planetsToAdd.shift();
      universeState.planets.push(newBody);
      universeState.planetTrails.push(newBody.planetTrail);
      universeState.lastPlanetAddTime = millis();
    }

    for (var i = 0; i < universeState.planetTrails.length; i++) {
      var shouldContinueDrawing = universeState.planetTrails[i].draw();
      if (!shouldContinueDrawing) {
        universeState.planetTrails.splice(i, 1);
      }
    }

    for (var i = 0; i < universeState.planets.length; i++) {
      universeState.planets[i].move();
      universeState.planets[i].draw();

      // Check if the planet is completely covered by the sun
      if (
        universeState.planets[i] !== universeState.sun &&
        p5.Vector.dist(universeState.planets[i].pos, universeState.sun.pos) +
          universeState.planets[i].d / 2 <=
          universeState.sun.d / 2
      ) {
        universeState.planets[i].planetTrail.beginWindDown(); // wind down the trail
        universeState.planets[i].destroy();
        universeState.planets.splice(i, 1); // Remove the planet

        continue; // Skip to the next iteration
      }
    }

    // If all planets are sucked in begin the black hole
    if (
      universeState.planetsToAdd.length === 0 &&
      universeState.planets.length === 0 &&
      universeState.sun.stage === "sun"
    ) {
      universeState.sun.beginBlackHole();

      if (!universeState.endSound.isPlaying()) {
        universeState.endSound.play();
      }
    }

    if (universeState.sun.stage === "black hole") {
      if (frameCount % 200 === 0) {
        for (var i = 0; i < universeState.nebulas.length; i++) {
          // 30% chance for each nebula to change
          if (random(1) < 0.3) {
            var newAlpha =
              universeState.nebulas[i].currentAlpha - random(5, 10);
            universeState.nebulas[i].changeAlpha(newAlpha);
          }
        }
      }
    }

    // 0.7 min
    if (frameCount % 42000 === 0) {
      if (universeState.stars.length > 0) {
        var randomIndex = floor(random(universeState.stars.length));

        universeState.stars[randomIndex].beginExploading(function () {
          universeState.stars.splice(randomIndex, 1);
        });
      }
    }

    if (
      universeState.stars.length === 0 &&
      universeState.sun.stage === "black hole"
    ) {
      universeState.sun.beginBigBang(function () {
        for (var i = 0; i < universeState.nebulas.length; i++) {
          universeState.nebulas[i].destroy();
        }

        // restart
        setup();
      });
    }

    var universeAge = prettyNumString(year);
    var universeAgeWidth = textWidth(universeAge);

    textSize(20);
    fill(255);
    text(universeAge, width / 2 - universeAgeWidth - 20, height / 2 - 20);

    a11yDescribe(universeState.p5Canvas, "test");
  }
} catch (e) {
  console.log(e);
  displayError(errorDiv, parseErrorMessage(e));
}
