let imagemDaEstrada;
let imagemDoAtor;
let imagemCarro;

let somDaTrilha;
let somDaColisao;
let somDosPontos;

function preload() {
    imagemDaEstrada = loadImage("imagem/estrada.png")
    imagemDoAtor = loadImage("imagem/ator-1.png")
    imagemCarro = loadImage("imagem/carro-1.png");
    imagemCarro2 = loadImage("imagem/carro-2.png");
    imagemCarro3 = loadImage("imagem/carro-3.png");
  
    imagemCarros = [imagemCarro, imagemCarro2, imagemCarro3, imagemCarro, imagemCarro2, imagemCarro3];
  
   somDaTrilha = loadSound("sons/trilha.mp3");
   somDaColisao = loadSound("sons/colidiu.mp3");
   somDosPontos = loadSound("sons/pontos.wav");
}


//carro

let xCarros = [2500, 2500, 2500, 2500, 2500, 2500];
let yCarros = [120, 280, 410, 575, 715, 870];
let comprimentoCarro = 100;
let alturaCarro = 90;
let velocidadeCarros = [8, 10.5, 8.7, 8.2, 7.2, 7.5];

function mostraCarro() {
   for (let i = 0; i < imagemCarros.length; i++) {
     image(imagemCarros[i], xCarros[i], yCarros[i], comprimentoCarro, alturaCarro);
   }
}

function movimentaCarro() {
  for(let i = 0; i<imagemCarros.length; i++) {
  xCarros[i] -= velocidadeCarros[i];
  }
}

function voltaPosicaoInicialDoCarro() {
  for(let i = 0; i < imagemCarros.length; i++) {
    if (passouTodaATela(xCarros[i])) {
    xCarros[i] = 2450;
  }
  }
  function passouTodaATela(xCarros) {
    return xCarros < - 50;
  }
}

//ator

let xAtor = 150;
let yAtor = 1002;
let colisao = false;
let meusPontos = 0;

function mostraAtor() {
   image(imagemDoAtor, xAtor, yAtor, 65, 65);
}

function movimentaAtor() {
  if (keyIsDown(UP_ARROW)){
    yAtor -= 3;
  }
   if (keyIsDown(DOWN_ARROW)){
     if(podeSeMover()) {
    yAtor += 3;
     }
  }
}

function podeSeMover(){
  return yAtor < 1002;
}

function verificaColisao(){
  for (let i = 0; i<imagemCarros.length; i++){
    colisao = collideRectCircle(xCarros[i], yCarros[i], comprimentoCarro, alturaCarro, xAtor, yAtor, 15)
    if(colisao){
      voltaAtorPosicaoInicial();
      somDaColisao.play();
      if(pontosMaiorQueZero()){
      meusPontos -= 1;
      }
    }
  }
}

function voltaAtorPosicaoInicial(){
  yAtor = 1002;
}

function incluiPontos(){
  textAlign(CENTER);
  textSize(70);
  fill(color(255,0,255));
  text(meusPontos, width/4, 68);
}

function marcaPonto(){
  if (yAtor < 15){
    meusPontos += 1;
    somDosPontos.play();
    voltaAtorPosicaoInicial();
  }
}

function pontosMaiorQueZero(){
  return meusPontos >0
}