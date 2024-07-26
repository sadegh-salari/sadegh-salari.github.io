import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flappy-bird',
  standalone: true,
  imports: [],
  templateUrl: './flappy-bird.component.html',
  styleUrl: './flappy-bird.component.scss'
})
export class FlappyBirdComponent implements AfterViewInit {

  board: any;
  context: any;
  boardWidth = 375;
  boardHeight = 595;

  // ? bird
  birdWidth = 34;
  birdHeight = 24;
  birdX = this.boardWidth / 8;
  birdY = this.boardHeight / 2;
  birdImage: any;

  bird: any;

  // jump = 4.6;

  pipeArray: any[] = [];
  pipeWidth = 62;
  pipeHeight = 512;
  pipeX = this.boardWidth;
  pipeY = 0;

  topPipeImage: any;
  bottomPipeImage: any;

  // ? Game Physics
  velocityX = -2; // * pixels per frame (Pipes speed to left) 
  velocityY = 0; // * Bird jump speed
  gravity = 0.4;

  gameOver = false;
  score = 0;

  constructor(
    private _router: Router,
  ) {
    this.bird = {
      x: this.birdX,
      y: this.birdY,
      width: this.birdWidth,
      height: this.birdHeight
    }
  }

  ngAfterViewInit(): void {
    this.board = document.getElementById('board');
    this.board.height = this.boardHeight;
    this.board.width = this.boardWidth;
    this.context = this.board.getContext('2d');

    // ? load image
    this.birdImage = new Image();
    this.birdImage.src = '../../../assets/flappy-bird/flappy-bird-icon.png';
    this.birdImage.onload = () => {
      this.context.drawImage(this.birdImage, this.birdX, this.birdY, this.birdWidth, this.birdHeight);
    }

    this.topPipeImage = new Image();
    this.topPipeImage.src = '../../../assets/flappy-bird/flappy-bird-pipe-top.png';

    this.bottomPipeImage = new Image();
    this.bottomPipeImage.src = '../../../assets/flappy-bird/flappy-bird-pipe-bottom.png';

  }
  
  startGame(){    
    requestAnimationFrame(this._update.bind(this));
  
    setInterval(() => {
      this._generatePipe();
    }, 1500);
  
    document.addEventListener('click', () => {
      this.velocityY = -6;
    });

    if(this.gameOver){
      this.score = 0;
      this.gameOver = false;
      this.pipeArray = [];
      // this.velocityX = -2;
      this.velocityY = 0;
      this.bird.y = this.birdY;
    }
  }

  private _update() {
    requestAnimationFrame(this._update.bind(this));
    if (this.gameOver) {
      return;
    }
    this.context.clearRect(0, 0, this.board.width, this.board.height);

    // ? Bird
    this.velocityY += this.gravity;
    this.bird.y = Math.max(this.bird.y + this.velocityY, 0);
    this.context.drawImage(this.birdImage, this.bird.x, this.bird.y, this.bird.width, this.bird.height);

    if (this.bird.y > this.board.height) {
      this.gameOver = true;
    }

    // ? Pipes
    this.pipeArray.forEach((pipe: any) => {
      pipe.x += this.velocityX;
      this.context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

      if (!pipe.passed && this.bird.x > pipe.x + pipe.width) {
        pipe.passed = true;
        this.score += 0.5;
      }

      if (this._detectCollision(this.bird, pipe)) {
        this.gameOver = true;
      }

    });

    // ? Clear the pipe
    while (this.pipeArray.length > 0 && this.pipeArray[0].x < -this.pipeWidth) {
      this.pipeArray.shift();
    }

    // ? Score
    this.context.fillStyle = 'white';
    this.context.font = '30px Verdana';
    this.context.fillText(this.score, 20, 50);

  }

  private _generatePipe() {
    if (this.gameOver) {
      return;
    }

    let randomPipeY = this.pipeY - this.pipeHeight / 4 - Math.random() * (this.pipeHeight / 2);
    let openingSpace = this.boardHeight / 4;

    const topPipe = {
      x: this.pipeX,
      y: randomPipeY,
      img: this.topPipeImage,

      width: this.pipeWidth,
      height: this.pipeHeight,
      passed: false
    }

    this.pipeArray.push(topPipe);

    const bottomPipe = {
      x: this.pipeX,
      y: randomPipeY + this.pipeHeight + openingSpace,
      img: this.bottomPipeImage,
      width: this.pipeWidth,
      height: this.pipeHeight,
      passed: false
    }

    this.pipeArray.push(bottomPipe);

  }

  private _detectCollision(bird: any, pipe: any): boolean {
    return bird.x < pipe.x + pipe.width &&
      bird.x + pipe.width > pipe.x &&
      bird.y < pipe.y + pipe.height &&
      bird.y + bird.height > pipe.y
  }

  goBack() {
    this._router.navigate(['/']);
  }
}
