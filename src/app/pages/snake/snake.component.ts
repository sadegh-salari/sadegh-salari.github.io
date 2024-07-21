import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalRepository } from '../../../utils/local-repository';
import { MobileControllerModel } from '@shared/models/mobile-controller.model';

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

  // ? Snake Body
  snakeBody: any[][] = []; // ? [x,y][] = [];

  // ? Velocity
  velocityX: number = 0;
  velocityY: number = 0;

  // ? Food
  foodX: number = 0;
  foodY: number = 0;

  speed: number = 5;

  interval: any;
  isMobile: boolean;

  gameOver: boolean = false;

  mobileControllers: MobileControllerModel[] = [
    {
      name: 'ArrowUp',
      icon: 'icon arrow-circle-up'
    },
    {
      name: 'ArrowDown',
      icon: 'icon arrow-circle-down'
    },
    {
      name: 'ArrowLeft',
      icon: 'icon arrow-circle-left'
    },
    {
      name: 'ArrowRight',
      icon: 'icon arrow-circle-right'
    }
  ]

  constructor(
    private _router: Router,
    private _localRepository: LocalRepository
  ) {
    this.isMobile = _localRepository.IsInMobile;
  }

  ngAfterViewInit(): void {
    this._initGame();
    this._starter();
  }

  private _initGame() {
    this.board = document.getElementById('board') as HTMLCanvasElement;
    if (this.board) {
      this.board.height = this.rows * this.blockSize;
      this.board.width = this.cols * this.blockSize;
      this.context = this.board.getContext('2d');
    }

    this._placeFood();
    this._detectChangeDirection();
  }

  private _starter() {
    this.interval = setInterval(() => this._update(), 1000 / this.speed);
  }

  private _detectChangeDirection() {
    if (!this._localRepository.IsInMobile) {
      document.addEventListener('keyup', (e) => {
        switch (e.code) {
          case 'Space':
            clearInterval(this.interval);
            break;

          default:
            this.handleDirection(e.code);
            break;
        }
      });
    }
  }

  handleDirection(direction?: string) {
    switch (direction) {
      case 'ArrowUp':
        if (this.velocityY !== 1) {
          this.velocityX = 0;
          this.velocityY = -1;
        }
        break;
      case 'ArrowDown':
        if (this.velocityY !== -1) {
          this.velocityX = 0;
          this.velocityY = 1;
        }
        break;
      case 'ArrowLeft':
        if (this.velocityX !== 1) {
          this.velocityX = -1;
          this.velocityY = 0;
        }
        break;
      case 'ArrowRight':
        if (this.velocityX !== -1) {
          this.velocityX = 1;
          this.velocityY = 0;
        }
        break;
      default:
        this.velocityX = 0;
        this.velocityY = 0;
        break;
    }
  }

  private _update() {

    if (this.gameOver) {
      return;
    }

    // ? Board
    this.context.fillStyle = '#1A2036';
    this.context.fillRect(0, 0, this.board.width, this.board.height);

    // ? Food
    this.context.fillStyle = '#7F88A9';
    this.context.fillRect(this.foodX, this.foodY, this.blockSize, this.blockSize);

    if (this._snakeAteFood()) {
      this.snakeBody.push([this.foodX, this.foodY]);
      this._placeFood();
    }

    for (let i = this.snakeBody.length - 1; i > 0; i--) {
      this.snakeBody[i] = this.snakeBody[i - 1];
    }

    if (this.snakeBody.length) {
      this.snakeBody[0] = [this.snakeX, this.snakeY];
    }

    // ? Snake
    this.context.fillStyle = '#B1B9D8';
    this.snakeX += this.velocityX * this.blockSize;
    this.snakeY += this.velocityY * this.blockSize;
    this.context.fillRect(this.snakeX, this.snakeY, this.blockSize, this.blockSize);

    this._drowSnakeBody();

    // ? game over
    this._checkGameOver();
  }

  private _checkGameOver() {
    if (this.snakeX < 0 || this.snakeX > this.cols * this.blockSize || this.snakeY < 0 || this.snakeY > this.rows * this.blockSize) {
      this._setGameOver();
    }

    for (let i = 0; i < this.snakeBody.length; i++) {
      if (this.snakeX === this.snakeBody[i][0] && this.snakeY === this.snakeBody[i][1]) {
        this._setGameOver();
      }
    }
  }

  private _setGameOver() {
    this.context.clearRect(0, 0, this.board.width, this.board.height);
    this.gameOver = true;
    this.snakeBody = [];
    this.snakeY = this.blockSize * 5;
    this.snakeX = this.blockSize * 5;
    clearInterval(this.interval);
  }

  private _drowSnakeBody() {
    for (let i = 0; i < this.snakeBody.length; i++) {
      this.context.fillRect(this.snakeBody[i][0], this.snakeBody[i][1], this.blockSize, this.blockSize);
    }
  }

  private _snakeAteFood(): boolean {
    return this.snakeX === this.foodX && this.snakeY === this.foodY;
  }

  private _placeFood() {
    this.foodX = Math.floor(Math.random() * (this.cols - 1)) * this.blockSize;
    this.foodY = Math.floor(Math.random() * (this.rows - 1)) * this.blockSize;
  }

  goBack() {
    this._router.navigate(['/']);
  }

  reloadGame() {
    this.gameOver = false;
    this._initGame();
    this.handleDirection('');
    this._starter();
  }
}
