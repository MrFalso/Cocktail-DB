function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(220);

  for (let i = 0; i <= 100; i++) {
    line(i * 100, 0, i * 100, height);
    line(0, i * 100, width, i * 100);
  }

  circle(100 / 2 + 500, 100 / 2, 50);
}
