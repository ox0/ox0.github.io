export class Physics {

  constructor() {

    this.startDate =
      new Date("2025-01-01");

    this.totalDaysRange = 1000;

    this.currentDay = 500;

    this.simHours = this.currentDay * 24;

    this.speed = 48; // hours per second

    this.paused = false;

    this.playMode = true;

    this.earthRotation = 0;

    this.earthOrbit = 0;

    this.moonOrbit = 0;
  }

  // ==========================================
  // CALCULATE FROM TIME
  // ==========================================

  compute() {

    this.earthRotation =
      (this.simHours / 24) * Math.PI * 2;

    this.earthOrbit =
      (this.simHours / (365.25 * 24))
      * Math.PI * 2;

    this.moonOrbit =
      (this.simHours / (27.3 * 24))
      * Math.PI * 2;
  }

  // ==========================================
  // UPDATE LOOP (PLAY MODE ONLY)
  // ==========================================

update(delta) {

  if (this.paused) return;

  if (this.playMode) {

    this.simHours += delta * this.speed;

    this.currentDay =
      this.simHours / 24;
  }

  this.compute();
}

  // ==========================================
  // SET FROM SLIDER
  // ==========================================

setDay(day) {

  this.currentDay = day;

  this.simHours = day * 24;

  this.compute();
}

  // ==========================================
  // RESUME PLAY MODE
  // ==========================================

  play() {

    this.playMode = true;
  }
}
