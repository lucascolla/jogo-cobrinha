//Personalizações
let corFundo = "lightgreen"; //Cor do fundo do jogo
let corCobra = "green"; //Cor da cobra
let corComida = "red"; //Cor do alimento da cobra
let largura = 16; //Tamanho da largura do jogo em quadradinhos
let altura = 16; // Tamanho da altura do jogo em quadradinhos
let box = 32; //Tamanho de cada quadradinho em pixels
let direction = "right"; //Direção inicial da cobra
let velocidade = 100; //Velocidade da atualização de quadros em milissegundos


let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");

//Inicializa com a cobrinha no meio do jogo
let snake = [];
snake[0] = {
    x: (altura / 2) * box,
    y: (largura / 2) * box
}

//Inicializa com a comida randomicamente
let food = {
    x: Math.floor(Math.random() * largura) * box,
    y: Math.floor(Math.random() * altura) * box
}

//Função para randomizar a comida novamente (usado quando a cobra engole)
function randonFood() {
    food.x = Math.floor(Math.random() * largura) * box;
    food.y = Math.floor(Math.random() * altura) * box;
}

function desenharFundo() {
    context.fillStyle = corFundo;
    context.fillRect(0, 0, largura * box, altura * box);
}

function desenharCobra() {
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = corCobra;
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function desenharComida() {
    context.fillStyle = corComida;
    context.fillRect(food.x, food.y, box, box);
}

//Espera clique no teclado e chama função update
document.addEventListener("keydown", update);

//Função uptade muda direção da cobra
function update(event) {
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo() {

    //Quando atingir o limite da tela a cobra é teleportada para o outro lado
    if (snake[0].x > (largura - 1) * box && direction == 'right') snake[0].x = 0;
    if (snake[0].x > (largura - 1) * box && direction == 'up') snake[0].x = 0;
    if (snake[0].x > (largura - 1) * box && direction == 'down') snake[0].x = 0;

    if (snake[0].x < 0 && direction == 'left') snake[0].x = (largura - 1) * box;
    if (snake[0].x < 0 && direction == 'up') snake[0].x = (largura - 1) * box;
    if (snake[0].x < 0 && direction == 'down') snake[0].x = (largura - 1) * box;

    if (snake[0].y > (altura - 1) * box && direction == 'down') snake[0].y = 0;
    if (snake[0].y > (altura - 1) * box && direction == 'right') snake[0].y = 0;
    if (snake[0].y > (altura - 1) * box && direction == 'left') snake[0].y = 0;

    if (snake[0].y < 0 && direction == 'up') snake[0].y = (altura - 1) * box;
    if (snake[0].y < 0 && direction == 'right') snake[0].y = (altura - 1) * box;
    if (snake[0].y < 0 && direction == 'left') snake[0].y = (altura - 1) * box;

    //Verifica se a cobra colidiu com seu próprio corpo para finalizar o jogo!
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            alert("Fim de jogo! Recarregue a página.");
        }
    }

    desenharFundo();
    desenharCobra();
    desenharComida();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop(); //Exclui o ultimo quadrado
    } else {
        randonFood();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); //Desenha o próximo quadrado 
}

let jogo = setInterval(iniciarJogo, velocidade); //Inicia o jogo.
