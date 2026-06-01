export class UI {

  constructor(physics) {

    this.physics = physics;

    window.physics = physics;

    this.timeDisplay =
      document.getElementById(
        'timeDisplay'
      );
  }

update() {

  const date =
    new Date(
      this.physics.startDate.getTime() +
      this.physics.currentDay * 86400000
    );

  this.timeDisplay.innerHTML = `
    <strong>Simulation Time</strong><br>
    ${date.toDateString()}<br><br>

    Time Scale:<br>
    1 sec = ${this.physics.speed} hours<br>
    (${(this.physics.speed / 24).toFixed(2)} days/sec)<br><br>

    Days passed since 2025-01-01: ${this.physics.currentDay.toFixed(2)}

  `;
}


}
