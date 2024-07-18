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
      icon: 'tic-tac-toe',
      isNew: true,
      score: 0
    },
  ]

  constructor(
    private _router: Router,
  ) { }

  gotoGame(game?: IGame) {
    this._router.navigate([game?.url],);
  }
}
