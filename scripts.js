var dots = [],
  mouse = {
    x: 0,
    y: 0,
    isMoving: false,
    stopTimeout: null
  };

var Dot = function() {
  this.x = 0;
  this.y = 0;
  this.node = (function() {
    var n = document.createElement("div");
    n.className = "trail";
    document.body.appendChild(n);
    return n;
  }());
};

Dot.prototype.draw = function() {
  this.node.style.left = this.x + "px";
  this.node.style.top = this.y + "px";
};

for (var i = 0; i < 3; i++) {
  var d = new Dot();
  dots.push(d);
}

function draw() {
  var x = mouse.x,
    y = mouse.y;

  dots.forEach(function(dot, index, dots) {
    var nextDot = dots[index + 1] || dots[0];
    dot.x = x;
    dot.y = y;
    dot.draw();
    x += (nextDot.x - dot.x) * .6;
    y += (nextDot.y - dot.y) * .6;
  });
}

// Function to trigger the bubble explosion
function triggerExplosion() {
  dots.forEach(function(dot) {
    dot.node.classList.add('explode');
    setTimeout(function() {
      dot.node.classList.remove('explode');
      dot.node.classList.add('trail-hidden'); // Hide after explosion
    }, 500); // Reset after the animation
  });
}

// Detect mouse move and reset timer
addEventListener("mousemove", function(event) {
  // Show the dots when mouse moves
  dots.forEach(function(dot) {
    dot.node.classList.remove('trail-hidden');
    dot.node.classList.add('trail');
  });
  
  mouse.x = event.pageX;
  mouse.y = event.pageY;
  mouse.isMoving = true;

  // Clear the previous stop timeout
  clearTimeout(mouse.stopTimeout);

  // Set a new stop timeout
  mouse.stopTimeout = setTimeout(function() {
    mouse.isMoving = false;
    triggerExplosion(); // Trigger explosion when the mouse stops
  }, 150); // Time delay before detecting the stop
});

function animate() {
  draw();
  requestAnimationFrame(animate);
}

animate();

function toggleMenu() {
  const menu = document.getElementById("menu");
  if (menu.style.display === "none" || menu.style.display === "") {
      menu.style.display = "block";
  } else {
      menu.style.display = "none";
  }
}

