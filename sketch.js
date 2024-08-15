let particles;
let grid;
let width;

function setup() {
  createCanvas(560, 560);
  grid = [];
  createGrid();
  width = floor(560/20);
  calculateMines();
  particles = [];
  updateTime = false;
  gameOver = false;
}

function calculate(x,y){
  let sum = 0;
  for (let i = -1; i < 2; i++){
    for (let j = -1; j < 2; j++){
      let x1 = x + j;
      let y1 = y + i;
      if (x1 >= 0 && x1 < grid.length && y1 >= 0 && y1 < grid.length){
        if (grid[y1][x1][1] == true){
          sum += 1
        }
      }
    }
  }
  return sum;
}

function calculateMines(){
  for (let i = 0; i < grid.length; i++){
    for (let j = 0; j < grid[0].length; j++){
      let cell = grid[i][j];
      if (cell[1] != true){
        let sum = calculate(j,i);
        cell[2] = sum;
      }
    }
  }
}

function displayGrid(){
  for (let i = 0; i < grid.length; i++){
    for (let j = 0; j < grid[0].length; j++){
      if (grid[i][j][0] == true){
        if (grid[i][j][1] == false){
          if (grid[i][j][2] > 0){
            textAlign(CENTER,CENTER);
            textSize(15);
            if (grid[i][j][2] == 1){
              fill(0);
            }else if (grid[i][j][2] > 1 && grid[i][j][2] < 3){
              fill(255,0,0);
            }else if (grid[i][j][2] > 2 && grid[i][j][2] < 5){
              fill(0,0,255);
            }
            text(grid[i][j][2],j*width + width/2,i*width + width/2);
          }
        }else{
          fill(0);
          circle(j*width + width/2,i*width + width/2,width/2);
        }
      }
      else{
        if ((i + j) % 2 == 0){
          fill(100,200,0);
        }else{
          fill(170,230,0);
        }
        noStroke();
        rect(j*width,i*width,width,width);
      }
    }
  }
}

function showRestartButton(){
  if (gameOver){
    updateTime = false;
    document.querySelector('#restart').style.display = 'flex';
  }
}

document.querySelector('#restart').addEventListener('click',(e)=>{
  location.reload();
})

document.querySelector('#animation').addEventListener('click',(e)=>{
  animate = !animate;
})

let animate = false;

function animationState(){
  if (animate){
    document.querySelector('#animation').innerHTML = 'Switch Off Animations';
    document.querySelector('#animation').style.background = 'greenyellow';
  }
  else{
    document.querySelector('#animation').style.background = 'red';
    document.querySelector('#animation').innerHTML = 'Switch On Animations';
    document.querySelector('#animation').style.color = 'white';
  }
}

let gameOver;

function mousePressed(){
  let x = floor(mouseX/width);
  let y = floor(mouseY/width);
  if (gameOver == false){
    if (x >= 0 && x < grid.length && y >= 0 && y < grid.length){
      updateTime = true;
      if (grid[y][x][0] != true){
        grid[y][x][0] = true;
        particles.push([x*width,y*width,random(2,5)]);
        if (grid[y][x][1] == false && grid[y][x][2] == 0){
          floodFill(x,y);
        }
      }
      if (grid[y][x][1] == true){
        gameOver = true;
      }
    }
  }
}

function floodFill(x,y){
  if(grid[y][x][1] == true || grid[y][x][1] == false && grid[y][x][2] > 0){
    return;
  }
  for (let i = -1; i < 2; i++){
    for (let j = -1; j < 2; j++){
      let x1 = x + j;
      let y1 = y + i;
      if (x1 >= 0 && x1 < grid.length && y1 >= 0 && y1 < grid.length){
        if (grid[y1][x1][1] == false && grid[y1][x1][0] == false){
          grid[y1][x1][0] = true;
          particles.push([x1*width,y1*width,random(2,5)]);
          floodFill(x1,y1);
        }
      }
    }
  }
}

// adding Time

let updateTime;

function updatingTime(){
  if (updateTime){
    let time = millis();
    document.querySelector('#time').innerHTML = int(time/100)/10;
  }
}

function animation(){
  if (animate){
    for (let i = 0; i < particles.length; i++){
      fill(100,200,0);
      strokeWeight(0.1);
      stroke(0);
      particles[i][2] -= 0.2;
      particles[i][1] -= particles[i][2];
      rect(particles[i][0],particles[i][1],width,width);
      if (particles[i][1] > 600){
        particles.splice(i,1);
      }
    }
  }
}

function createGrid(){
  for (let i = 0; i < 20; i++){
    let row = []
    for (let j = 0; j < 20; j++){
      let randomNum = random();
      if (randomNum < 0.3){
        row.push([false,true,0])
      }else{
        row.push([false,false,0])
      }
    }
    grid.push(row);
  }
}

function draw() {
  background(237, 217, 168);
  displayGrid();
  animation();
  animationState();
  if (gameOver){
    fill(0);
    textSize(30);
    textAlign(CENTER,CENTER);
    text('Game Over',560/2,560/2);
  }
  showRestartButton();
  updatingTime();
}
