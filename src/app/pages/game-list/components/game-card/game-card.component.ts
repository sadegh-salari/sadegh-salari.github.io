import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { IGame } from '@shared/models/game.interface';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.scss'
})
export class GameCardComponent {
  @Input({ required: true }) game!: IGame;

  @Output() GameClicked: EventEmitter<IGame> = new EventEmitter<IGame>();


  gotoGame() {
    this.GameClicked.emit(this.game);
  }
}
