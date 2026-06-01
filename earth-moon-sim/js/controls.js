export class Controls {

  constructor(renderer) {

    this.renderer = renderer;

    this.initZoom();

    this.initDrag();

    this.initFullscreen();

    this.initUI();
  }

  // ============================================
  // ZOOM
  // ============================================

  initZoom() {

    window.addEventListener(
      'wheel',
      e => {

        e.preventDefault();

        const cam =
          this.renderer.camera;

        const zoomFactor =
          e.deltaY > 0 ? 0.9 : 1.1;

        cam.zoom *= zoomFactor;

        cam.zoom =
          Math.max(
            0.2,
            Math.min(8, cam.zoom)
          );
      },
      { passive: false }
    );
  }

  // ============================================
  // DRAG / PAN
  // ============================================

  initDrag() {

    let dragging = false;

    let lastX = 0;
    let lastY = 0;

    window.addEventListener(
      'mousedown',
      e => {

        dragging = true;

        lastX = e.clientX;
        lastY = e.clientY;
      }
    );

    window.addEventListener(
      'mouseup',
      () => {

        dragging = false;
      }
    );

    window.addEventListener(
      'mousemove',
      e => {

        if (!dragging) return;

        const dx =
          e.clientX - lastX;

        const dy =
          e.clientY - lastY;

        lastX = e.clientX;
        lastY = e.clientY;

        this.renderer.camera.x += dx;
        this.renderer.camera.y += dy;
      }
    );
  }

  // ============================================
  // FULLSCREEN
  // ============================================

  initFullscreen() {

    document
      .getElementById(
        'fullscreenBtn'
      )
      .onclick = () => {

      if (
        !document.fullscreenElement
      ) {

        document
          .documentElement
          .requestFullscreen();

      } else {

        document.exitFullscreen();
      }
    };
  }

  // ============================================
  // UI
  // ============================================

  initUI() {

  const dateSlider =
    document.getElementById('dateSlider');

  dateSlider.oninput = e => {

    const day =
      Number(e.target.value);

    window.physics.setDay(day);
  };

    const pauseBtn =
      document.getElementById(
        'pauseBtn'
      );

    const speedSlider =
      document.getElementById(
        'speedSlider'
      );

pauseBtn.onclick = () => {

  window.physics.paused =
    !window.physics.paused;

  pauseBtn.textContent =
    window.physics.paused
    ? 'Play'
    : 'Pause';
};

    speedSlider.oninput = e => {

      window.physics.speed =
        Number(e.target.value);
    };
  }
}
