import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-snake',
  standalone: true,
  imports: [],
  templateUrl: './snake.component.html',
  styleUrl: './snake.component.scss'
})
export class SnakeComponent implements AfterViewInit {

  blockSize: number = 10;
  rows: number = 35;
  cols: number = 35;

  board: any;
  context: any;

  // ? Snake head
  snakeX: number = this.blockSize * 5;
  snakeY: number = this.blockSize * 5;

  // ? Velocity
  velocityX: number = 0;
  velocityY: number = 0;

  // ? Food
  foodX: number = 0;
  foodY: number = 0;

  speed: number = 5;

  interval: any;

  constructor(
    private _router: Router,
  ) { }

  ngAfterViewInit(): void {
    this.board = document.getElementById('board') as HTMLCanvasElement;
    if (this.board) {
      this.board.height = this.rows * this.blockSize;
      this.board.width = this.cols * this.blockSize;
      this.context = this.board.getContext('2d');
    }

    this._placeFood();
    this._detectChangeDirection();

    this._starter();
  }

  private _starter() {
    this.interval = setInterval(() => this._update(), 1000 / this.speed);
  }

  private _detectChangeDirection(){
    document.addEventListener('keyup', (e) => {
      switch (e.code) {
        case 'ArrowUp':
          this.velocityX = 0;
          this.velocityY = -1;
          break;
        case 'ArrowDown':
          this.velocityX = 0;
          this.velocityY = 1;
          break;
        case 'ArrowLeft':
          this.velocityX = -1;
          this.velocityY = 0;
          break;
        case 'ArrowRight':
          this.velocityX = 1;
          this.velocityY = 0;
          break;
          case 'Space':
            clearInterval(this.interval);
            break;
      }
    });
  }

  private _update() {

    // ? Board
    this.context.fillStyle = '#1A2036';
    this.context.fillRect(0, 0, this.board.width, this.board.height);

    // ? Food
    this.context.fillStyle = '#7F88A9';
    this.context.fillRect(this.foodX, this.foodY, this.blockSize, this.blockSize);

    // ? Snake
    this.context.fillStyle = '#B1B9D8';
    this.snakeX += this.velocityX * this.blockSize;
    this.snakeY += this.velocityY * this.blockSize;
    this.context.fillRect(this.snakeX, this.snakeY, this.blockSize, this.blockSize);
  }

  private _placeFood(){
    this.foodX = Math.floor(Math.random() * (this.cols - 1)) * this.blockSize;
    this.foodY = Math.floor(Math.random() * (this.rows - 1)) * this.blockSize;
  }

  goBack() {
    this._router.navigate(['/']);
  }
}
