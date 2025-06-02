// Registrar plugins do GSAP
if (typeof gsap !== 'undefined' && typeof Draggable !== 'undefined') {
  gsap.registerPlugin(Draggable);
}

let isCurrentlyDragging = false;
const ball = document.querySelector(".ball");
let vx = 0, vy = 0, animation = null;
let lastX = 0, lastY = 0;

const bounds = {
  left: 0,
  top: 0,
  right: window.innerWidth,
  bottom: window.innerHeight
};

function updateBounds() {
  bounds.right = window.innerWidth;
  bounds.bottom = window.innerHeight;
  bounds.left = 0;
  bounds.top = 0;
}

window.addEventListener("resize", updateBounds);

const draggable = new Draggable(ball, {
  bounds: window,
  onPress() {
    isCurrentlyDragging = true;
    if (animation) animation.kill();
    lastX = this.x;
    lastY = this.y;
  },
  onDrag() {
    vx = this.x - lastX;
    vy = this.y - lastY;
    lastX = this.x;
    lastY = this.y;
  },
  onRelease() {
    isCurrentlyDragging = false;
    animateBounce(this.x, this.y, vx, vy);
  }
});

function animateBounce(x, y, vx, vy) {
  let radius = ball.offsetWidth / 2;
  function move() {
    x += vx;
    y += vy;
    // Rebater nas paredes
    if (x - radius < bounds.left) {
      x = bounds.left + radius;
      vx *= -0.7;
    } else if (x + radius > bounds.right) {
      x = bounds.right - radius;
      vx *= -0.7;
    }
    if (y - radius < bounds.top) {
      y = bounds.top + radius;
      vy *= -0.7;
    } else if (y + radius > bounds.bottom) {
      y = bounds.bottom - radius;
      vy *= -0.7;
    }
    // Fricção
    vx *= 0.98;
    vy *= 0.98;
    // Parar se velocidade for muito baixa
    if (Math.abs(vx) < 0.5 && Math.abs(vy) < 0.5) {
      gsap.set(ball, {x, y});
      return;
    }
    gsap.set(ball, {x, y});
    animation = gsap.delayedCall(0.016, move);
  }
  move();
}