import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tic-tac-toe',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './tic-tac-toe.component.html',
  styleUrl: './tic-tac-toe.component.scss'
})
export class TicTacToeComponent {

  board: string[][] = [];
  currentPlayer?: string;
  winner?: string;
  gameOver: boolean = false;

  constructor(
    private _router: Router,
  ) {
    this.newGame();
  }

  newGame() {
    this.board = this._createBoard();
    this.currentPlayer = 'X';
    this.winner = '';
  }

  private _createBoard(): string[][] {
    return [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
  }

  makeMove(row: number, col: number) {
    if (!this.gameOver && this.board && this.board[row][col] === '' && !this.winner) {
      this.board[row][col] = this.currentPlayer || '';
      if (this.checkWinner()) {
        this.winner = this.currentPlayer || '';
      } else {
        if (this._isDraw()) {
          this.gameOver = true;
          return;
        }
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  }

  private _isDraw(): boolean {
    return this.board.every(row => row.every(cell => cell !== ''));
  }

  checkWinner(): boolean {
    // Check rows, columns, and diagonals for a win
    const lines = [
      // Rows
      [this.board[0][0], this.board[0][1], this.board[0][2]],
      [this.board[1][0], this.board[1][1], this.board[1][2]],
      [this.board[2][0], this.board[2][1], this.board[2][2]],
      // Columns
      [this.board[0][0], this.board[1][0], this.board[2][0]],
      [this.board[0][1], this.board[1][1], this.board[2][1]],
      [this.board[0][2], this.board[1][2], this.board[2][2]],
      // Diagonals
      [this.board[0][0], this.board[1][1], this.board[2][2]],
      [this.board[0][2], this.board[1][1], this.board[2][0]]
    ];

    return lines.some(line => line.every(cell => cell === this.currentPlayer));
  }

  goBack() {
    this._router.navigate(['/']);
  }
}
