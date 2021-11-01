console.log("welcome javascript!");
// Roger Argueta sick sketch
let x = 0;
let y = 0;
let spacing = 20;
function setup(){
    console.log("p5 is here!");
    createCanvas(windowWidth,windowHeight);
    // background(100,100,100);
    colorMode(HSL);
    background(0);
}

function draw() {
    stroke(255);
    if (random([0, 1]) == 1) {
      let square_lightness = map(y, 0, height, 50, 0);
      fill(0, 100, square_lightness);
      square(x, y, spacing);
    } else {
      let triangle_lightness = map(x, 0, width, 0, 50);
      fill(120, 100, triangle_lightness);
      triangle(x, y, x + spacing/2, y + spacing, x + spacing, y);
    }
    
    y += spacing;
    
    if (y > height) {
      y = 0;
      x += spacing;
    }

}