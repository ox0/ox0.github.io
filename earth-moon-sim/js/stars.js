export class Stars {

  constructor() {

    this.stars = [];

    for (let i = 0; i < 1000; i++) {

      this.stars.push({

        x: Math.random() * 6000 - 3000,
        y: Math.random() * 6000 - 3000,

        r: Math.random() * 2,

        a: Math.random(),

        twinkle:
          Math.random() * 0.02
      });
    }
  }

  draw(ctx) {

    for (const s of this.stars) {

      s.a += s.twinkle;

      if (s.a > 1 || s.a < 0.1) {
        s.twinkle *= -1;
      }

      ctx.beginPath();

      ctx.fillStyle =
        `rgba(255,255,255,${s.a})`;

      ctx.arc(
        s.x,
        s.y,
        s.r,
        0,
        Math.PI * 2
      );

      ctx.fill();
    }
  }
}
