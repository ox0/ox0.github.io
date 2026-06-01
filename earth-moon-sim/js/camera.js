export class Camera {

  constructor() {

    this.zoom = 1;

    this.x = 0;
    this.y = 0;
  }

  apply(ctx, width, height) {

    ctx.translate(width / 2, height / 2);

    ctx.scale(this.zoom, this.zoom);

    ctx.translate(this.x, this.y);
  }
}
