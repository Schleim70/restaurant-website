var dots = [],
  mouse = { x: -999, y: -999 };

const COUNT = 6;
const sizes = [14, 11, 9, 7, 5, 4];
const opacities = [0.95, 0.75, 0.55, 0.38, 0.22, 0.12];

let hasMovedOnce = false;
let stopTimeout = null;

var Dot = function(size) {
  this.x = -999;
  this.y = -999;
  this.node = (function() {
    var n = document.createElement("div");
    n.className = "trail";
    n.style.width = size + "px";
    n.style.height = size + "px";
    document.body.appendChild(n);
    return n;
  }());
};

Dot.prototype.draw = function() {
  this.node.style.left = this.x + "px";
  this.node.style.top = this.y + "px";
};

for (var i = 0; i < COUNT; i++) {
  dots.push(new Dot(sizes[i]));
}

function fadeOut() {
  dots.forEach(function(dot) {
    dot.node.style.transition = "opacity 0.4s ease";
    dot.node.style.opacity = "0";
  });
}

function fadeIn() {
  dots.forEach(function(dot, i) {
    dot.node.style.transition = "opacity 0.15s ease";
    dot.node.style.opacity = opacities[i];
  });
}

function draw() {
  var tx = mouse.x, ty = mouse.y;
  dots.forEach(function(dot, i) {
    dot.x += (tx - dot.x) * (0.55 - i * 0.04);
    dot.y += (ty - dot.y) * (0.55 - i * 0.04);
    dot.draw();
    tx = dot.x;
    ty = dot.y;
  });
  requestAnimationFrame(draw);
}

addEventListener("mousemove", function(event) {
  mouse.x = event.pageX;
  mouse.y = event.pageY;

  if (!hasMovedOnce) {
    hasMovedOnce = true;
    dots.forEach(function(dot) {
      dot.x = mouse.x;
      dot.y = mouse.y;
    });
    requestAnimationFrame(fadeIn);
  } else {
    fadeIn();
  }

  clearTimeout(stopTimeout);
  stopTimeout = setTimeout(fadeOut, 180);
});

draw();

// deine anderen Funktionen bleiben unverändert
function toggleMenu() {
  const menu = document.getElementById("menu");
  if (menu.style.display === "none" || menu.style.display === "") {
    menu.style.display = "block";
  } else {
    menu.style.display = "none";
  }
}

function toggleMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  const burger = document.querySelector(".burger");
  menu.classList.toggle("show");
  burger.classList.toggle("open");
}