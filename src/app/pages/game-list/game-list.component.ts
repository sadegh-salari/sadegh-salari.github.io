import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IGame } from '@shared/models/game.interface';
import { GameCardComponent } from './components/game-card/game-card.component';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [
    CommonModule,
    GameCardComponent
  ],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.scss'
})
export class GameListComponent {
  gameButtons: IGame[] = [
    {
      title: 'Tic-Tac-Toe Game',
      url: 'xo',
      description: 'Tic-Tac-Toe Game with easy and hard mode',
      image: '/assets/tik-tak-toe.png',
      isNew: false,
      score: 0,
      buttonText:'Play Now',
      isActive: true,
    }
    ,
    {
      title: 'Snake Game',
      url: 'snake',
      description: 'Snake Game with easy and hard mode',
      image: '/assets/snake.jpg',
      isNew: false,
      score: 0,
      buttonText:'Play Now',
      isActive: true,
    },
    {
      title: 'Flappy Bird Game',
      url: 'flappy-bird',
      description: 'Flappy Bird Game with easy and hard mode',
      image: '/assets/flappy-bird/flappy-bird.png',
      isNew: true,
      score: 0,
      buttonText:'Play Now',
      isActive: true,
    },
  ]

  constructor(
    private _router: Router,
  ) { }

  gotoGame(game?: IGame) {
    if(game?.isActive){
      this._router.navigate([game?.url],);
    }
  }
}
