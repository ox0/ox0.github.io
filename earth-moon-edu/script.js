const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

let width;
let height;
let cx;
let cy;

function resize() {

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  width = canvas.width;
  height = canvas.height;

  cx = width / 2;
  cy = height / 2;
}

window.addEventListener("resize", resize);
resize();


// ======================================================
// UI CONTROLS
// ======================================================

let paused = false;
let simulationSpeed = 48;

const pauseBtn = document.getElementById("pauseBtn");
const speedSlider = document.getElementById("speedSlider");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const info = document.getElementById("info");

pauseBtn.onclick = () => {

  paused = !paused;

  pauseBtn.textContent = paused ? "Play" : "Pause";
};

speedSlider.oninput = e => {

  simulationSpeed = Number(e.target.value);
};

fullscreenBtn.onclick = () => {

  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};


// ======================================================
// SIMULATION TIME
// ======================================================

// 1 second = X simulated hours

let simHours = 0;

const EARTH_ROTATION_HOURS = 24;
const EARTH_ORBIT_DAYS = 365.25;
const MOON_ORBIT_DAYS = 27.3;

function update(deltaSeconds) {

  if (paused) return;

  simHours += deltaSeconds * simulationSpeed;
}


// ======================================================
// STARS
// ======================================================

const stars = [];

for (let i = 0; i < 700; i++) {

  stars.push({
    x: Math.random() * 4000 - 2000,
    y: Math.random() * 4000 - 2000,
    r: Math.random() * 1.8,
    a: Math.random(),
    twinkle: Math.random() * 0.02
  });
}

function drawStars() {

  ctx.save();

  ctx.translate(cx, cy);

  for (const s of stars) {

    s.a += s.twinkle;

    if (s.a > 1 || s.a < 0.1) {
      s.twinkle *= -1;
    }

    ctx.beginPath();

    ctx.fillStyle =
      `rgba(255,255,255,${s.a})`;

    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);

    ctx.fill();
  }

  ctx.restore();
}


// ======================================================
// SUN
// ======================================================

const sun = {
  x: -2500,
  y: 0,
  radius: 500
};

function drawSunGlow() {

  const grad = ctx.createRadialGradient(
    sun.x,
    sun.y,
    100,
    sun.x,
    sun.y,
    1200
  );

  grad.addColorStop(0, "rgba(255,220,120,0.5)");
  grad.addColorStop(1, "rgba(255,220,120,0)");

  ctx.fillStyle = grad;

  ctx.fillRect(0, 0, width, height);
}


// ======================================================
// EARTH
// ======================================================

const earth = {

  radius: 130,

  orbitRadius: 850,

  tilt: 23.5 * Math.PI / 180
};


function drawEarth(x, y, rotation, seasonAngle) {

  ctx.save();

  ctx.translate(x, y);

  ctx.rotate(-earth.tilt);

  // atmosphere glow
  const glow = ctx.createRadialGradient(
    0,
    0,
    earth.radius,
    0,
    0,
    earth.radius + 30
  );

  glow.addColorStop(0, "rgba(0,0,0,0)");
  glow.addColorStop(1, "rgba(100,180,255,0.3)");

  ctx.fillStyle = glow;

  ctx.beginPath();
  ctx.arc(0, 0, earth.radius + 30, 0, Math.PI * 2);
  ctx.fill();


  // earth body
  const earthGrad = ctx.createRadialGradient(
    -40,
    -40,
    20,
    0,
    0,
    earth.radius
  );

  earthGrad.addColorStop(0, "#6ad8ff");
  earthGrad.addColorStop(1, "#00396b");

  ctx.fillStyle = earthGrad;

  ctx.beginPath();
  ctx.arc(0, 0, earth.radius, 0, Math.PI * 2);
  ctx.fill();


  // rotating continents
  ctx.save();

  ctx.rotate(rotation);

  ctx.fillStyle = "#4caf50";

  for (let i = 0; i < 10; i++) {

    const a = i * Math.PI * 2 / 10;

    const ex = Math.cos(a) * 60;
    const ey = Math.sin(a) * 50;

    ctx.beginPath();

    ctx.ellipse(
      ex,
      ey,
      28,
      14,
      a,
      0,
      Math.PI * 2
    );

    ctx.fill();
  }

  ctx.restore();


  // clouds
  ctx.save();

  ctx.rotate(rotation * 1.1);

  ctx.fillStyle = "rgba(255,255,255,0.25)";

  for (let i = 0; i < 16; i++) {

    const a = i * Math.PI * 2 / 16;

    const ex = Math.cos(a) * 85;
    const ey = Math.sin(a) * 65;

    ctx.beginPath();

    ctx.ellipse(
      ex,
      ey,
      24,
      10,
      a,
      0,
      Math.PI * 2
    );

    ctx.fill();
  }

  ctx.restore();


  // day/night shading
  const shade = ctx.createLinearGradient(
    -earth.radius,
    0,
    earth.radius,
    0
  );

  shade.addColorStop(0, "rgba(0,0,0,0.82)");
  shade.addColorStop(0.45, "rgba(0,0,0,0.18)");
  shade.addColorStop(1, "rgba(0,0,0,0)");

  ctx.fillStyle = shade;

  ctx.beginPath();
  ctx.arc(0, 0, earth.radius, 0, Math.PI * 2);
  ctx.fill();


  // labels
  ctx.fillStyle = "white";
  ctx.font = "18px Arial";
  ctx.fillText("Earth", -28, earth.radius + 32);

  ctx.restore();
}


// ======================================================
// MOON
// ======================================================

const moon = {

  radius: 42,

  orbitRadius: 340
};


function drawMoon(earthX, earthY, orbitAngle) {

  const mx =
    earthX + Math.cos(orbitAngle) * moon.orbitRadius;

  const my =
    earthY + Math.sin(orbitAngle) * moon.orbitRadius;

  // orbit path
  ctx.beginPath();

  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 1;

  ctx.arc(
    earthX,
    earthY,
    moon.orbitRadius,
    0,
    Math.PI * 2
  );

  ctx.stroke();


  ctx.save();

  ctx.translate(mx, my);

  const grad = ctx.createRadialGradient(
    -12,
    -12,
    4,
    0,
    0,
    moon.radius
  );

  grad.addColorStop(0, "#ffffff");
  grad.addColorStop(1, "#777777");

  ctx.fillStyle = grad;

  ctx.beginPath();
  ctx.arc(0, 0, moon.radius, 0, Math.PI * 2);
  ctx.fill();


  // craters
  ctx.fillStyle = "rgba(0,0,0,0.12)";

  for (let i = 0; i < 10; i++) {

    const a = i * Math.PI * 2 / 10;

    ctx.beginPath();

    ctx.arc(
      Math.cos(a) * 18,
      Math.sin(a) * 18,
      4,
      0,
      Math.PI * 2
    );

    ctx.fill();
  }


  // moon phase shading
  const phase = ctx.createLinearGradient(
    -moon.radius,
    0,
    moon.radius,
    0
  );

  phase.addColorStop(0, "rgba(0,0,0,0.92)");
  phase.addColorStop(0.5, "rgba(0,0,0,0)");
  phase.addColorStop(1, "rgba(0,0,0,0)");

  ctx.fillStyle = phase;

  ctx.beginPath();
  ctx.arc(0, 0, moon.radius, 0, Math.PI * 2);
  ctx.fill();


  // label
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText("Moon", -24, moon.radius + 26);

  ctx.restore();


  // eclipse line visualization
  const dx = mx - sun.x;
  const dy = my - sun.y;

  const align =
    Math.abs(Math.sin(orbitAngle));

  if (align < 0.03) {

    ctx.beginPath();

    ctx.strokeStyle =
      "rgba(255,120,120,0.4)";

    ctx.setLineDash([6, 6]);

    ctx.moveTo(sun.x, sun.y);

    ctx.lineTo(mx, my);

    ctx.stroke();

    ctx.setLineDash([]);
  }
}


// ======================================================
// ORBIT RENDER
// ======================================================

function drawEarthOrbit() {

  ctx.beginPath();

  ctx.strokeStyle = "rgba(255,255,255,0.05)";

  ctx.arc(
    cx,
    cy,
    earth.orbitRadius,
    0,
    Math.PI * 2
  );

  ctx.stroke();
}


// ======================================================
// DATE DISPLAY
// ======================================================

function updateInfo() {

  const startDate = new Date("2025-01-01");

  const current =
    new Date(
      startDate.getTime() +
      simHours * 3600000
    );

  info.innerHTML = `
    <strong>Simulation Time</strong><br>
    ${current.toDateString()}<br>
    ${current.toLocaleTimeString()}<br>
    Speed: ${simulationSpeed} hrs/sec
  `;
}


// ======================================================
// MAIN LOOP
// ======================================================

let last = performance.now();

function animate(now) {

  const deltaSeconds = (now - last) / 1000;

  last = now;

  update(deltaSeconds);

  updateInfo();

  ctx.clearRect(0, 0, width, height);

  drawSunGlow();

  drawStars();

  drawEarthOrbit();


  // earth orbit around sun
  const earthOrbitAngle =
    (simHours / (EARTH_ORBIT_DAYS * 24))
    * Math.PI * 2;

  const earthX =
    cx +
    Math.cos(earthOrbitAngle)
    * earth.orbitRadius;

  const earthY =
    cy +
    Math.sin(earthOrbitAngle)
    * earth.orbitRadius * 0.35;


  // earth rotation
  const earthRotation =
    (simHours / EARTH_ROTATION_HOURS)
    * Math.PI * 2;


  // moon orbit
  const moonOrbit =
    (simHours / (MOON_ORBIT_DAYS * 24))
    * Math.PI * 2;


  drawEarth(
    earthX,
    earthY,
    earthRotation,
    earthOrbitAngle
  );

  drawMoon(
    earthX,
    earthY,
    moonOrbit
  );

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
