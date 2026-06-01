import { Renderer } from './renderer.js';
import { Physics } from './physics.js';
import { Controls } from './controls.js';
import { UI } from './ui.js';

const canvas =
  document.getElementById('space');

const renderer =
  new Renderer(canvas);

const physics =
  new Physics();

const ui =
  new UI(physics);

new Controls(renderer);

let last = performance.now();

function animate(now) {

  const delta =
    (now - last) / 1000;

  last = now;

  physics.update(delta);

  renderer.render(physics);

  ui.update();

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
