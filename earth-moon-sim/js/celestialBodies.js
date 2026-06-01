export class CelestialBodies {

  constructor() {

    this.earthDay =
      new Image();

    this.earthDay.src =
      './assets/earth_day.jpg';

    this.earthNight =
      new Image();

    this.earthNight.src =
      './assets/earth_night.jpg';

    this.clouds =
      new Image();

    this.clouds.src =
      './assets/earth_clouds.png';

    this.moon =
      new Image();

    this.moon.src =
      './assets/moon.jpg';
  }

  drawEarth(
    ctx,
    x,
    y,
    radius,
    rotation
  ) {

    ctx.save();

    ctx.translate(x, y);

    ctx.rotate(rotation);

    ctx.beginPath();

    ctx.arc(
      0,
      0,
      radius,
      0,
      Math.PI * 2
    );

    ctx.clip();

    ctx.drawImage(
      this.earthDay,
      -radius,
      -radius,
      radius * 2,
      radius * 2
    );

    // clouds
    ctx.globalAlpha = 0.35;

    ctx.rotate(rotation * 0.15);

    ctx.drawImage(
      this.clouds,
      -radius,
      -radius,
      radius * 2,
      radius * 2
    );

    ctx.restore();

    // atmosphere
    const glow =
      ctx.createRadialGradient(
        x,
        y,
        radius,
        x,
        y,
        radius + 20
      );

    glow.addColorStop(
      0,
      'rgba(0,0,0,0)'
    );

    glow.addColorStop(
      1,
      'rgba(100,180,255,0.4)'
    );

    ctx.fillStyle = glow;

    ctx.beginPath();

    ctx.arc(
      x,
      y,
      radius + 20,
      0,
      Math.PI * 2
    );

    ctx.fill();
  }

  drawMoon(
    ctx,
    x,
    y,
    radius
  ) {

    ctx.save();

    ctx.translate(x, y);

    ctx.beginPath();

    ctx.arc(
      0,
      0,
      radius,
      0,
      Math.PI * 2
    );

    ctx.clip();

    ctx.drawImage(
      this.moon,
      -radius,
      -radius,
      radius * 2,
      radius * 2
    );

    ctx.restore();
  }
}
