const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const cellSize = 20;
canvas.width = 25 * cellSize; // 25 grids and each width and height is 20
canvas.height = 25 * cellSize;

function drawGrid(){
    for(let x = 0; x <= canvas.width; x += cellSize){
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.strokeStyle = "white";
    ctx.stroke()
}
for(let y = 0; y <= canvas.height; y += cellSize){
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.strokeStyle = "white";
    ctx.stroke()
}
}
drawGrid()

function update(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    drawGrid()
    drawParticles()

    //mouse indicator
    ctx.fillStyle = "gray";
    ctx.fillRect(gridX*cellSize, gridY*cellSize, cellSize, cellSize)

    sandFall()
    requestAnimationFrame(update)
}
requestAnimationFrame(update)

let gridX = 0, gridY = 0;

canvas.addEventListener("mousemove", (e) =>{
    const rect = canvas.getBoundingClientRect(); // this function gets canva's place relative to the page 
    
    //calculate which grid ur mouse at
    gridX = Math.floor((e.clientX - rect.left) / cellSize);
    gridY = Math.floor((e.clientY - rect.top) / cellSize);

})

function spawnSand(){
    grid[gridY][gridX] = 1;
}
canvas.addEventListener("click", spawnSand)

function drawParticles(){
    for(let y = 0; y < rows; y++){
        for(let x = 0; x < cols; x++){
            if(grid[y][x] == 1){
                ctx.fillStyle = "yellow";
                ctx.fillRect(x*cellSize, y*cellSize, cellSize, cellSize)
            }
        }
    }
}

const rows = canvas.height / cellSize;
const cols = canvas.width / cellSize;

let grid = [];
for(let y = 0; y < rows; y++){
    grid[y] = [];
    for(let x = 0; x < cols; x++){
        grid[y][x] = 0;
    }
}

function sandFall(){
    for(let i = rows-1; i >= 0; i--){
        for(let j = 0; j < cols; j++){
            if(i + 1 < rows && grid[i][j] == 1 && grid[i+1][j] == 0) {
                grid[i+1][j] = 1;
                grid[i][j] = 0;
            }

            else if(i+1 < rows && grid[i][j] == 1 && grid[i+1][j] == 1){
                if(j > 0 && grid[i+1][j-1] == 0){
                    grid[i+1][j-1] = 1;
                    grid[i][j] = 0;
                }
                else if(j < cols - 1 && grid[i+1][j+1] == 0){
                    grid[i+1][j+1] = 1;
                    grid[i][j] =0;
                }
                else{
                    let randNum = Math.floor(Math.random() * 2);
                    
                    if(j - 1 < cols && grid[i+1][j+1] == 0 && grid[i+1][j-1] == 0){
                        if(randNum == 1){
                            grid[i+1][j+1] = 1;
                            grid[i][j] = 0;
                        }
                        else{
                            grid[i+1][j-1] = 1;
                            grid[i][j] = 0;
                        }
                    }
                }
            }
        }
    }
}