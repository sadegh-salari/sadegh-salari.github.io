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
  wrongAction: boolean = false;
  message: string = '';

  constructor(
    private _router: Router,
  ) {
    this.newGame();
  }

  newGame() {
    this.board = this._createBoard();
    this.currentPlayer = 'X';
    this.winner = '';
    this.gameOver = false;
    this._updatePlayer();
  }

  private _createBoard(): string[][] {
    return [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
  }

  makeMove(row: number, col: number) {
    if (this.board && this.board[row][col] === '') {
      if (!this.gameOver && !this.winner) {
        this.board[row][col] = this.currentPlayer || '';
        if (this._checkWinner()) {
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
    else {
      this.wrongAction = true;
      setTimeout(() => {
        this.wrongAction = false;
      }, 1500);
    }
    this._updatePlayer();
  }

  private _isDraw(): boolean {
    return this.board.every(row => row.every(cell => cell !== ''));
  }

  private _checkWinner(): boolean {
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

  private _computerMove() {
    // ? Check possible moves
    let userMoves = this._getUserMoves();
    let possibleMoves = this._getPossibleMoves();
    // ? Smart move
    // const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    // this.board[randomMove.row][randomMove.col] = 'O';

    if (this._checkWinner()) {
      this.winner = this.currentPlayer || '';
    } else {
      if (this._isDraw()) {
        this.gameOver = true;
        return;
      }
      this._makeSmartMove(possibleMoves, userMoves);
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
    this._updatePlayer();
  }

  private _makeSmartMove(possibleMoves: { row: number, col: number }[], userMoves: { row: number, col: number }[]) {
    let possibleUserMoves = possibleMoves.filter(move => !userMoves.some(userMove => userMove.row === move.row && userMove.col === move.col));
    if (possibleUserMoves.length > 0) {
      let randomMove = possibleUserMoves[Math.floor(Math.random() * possibleUserMoves.length)];
      this.board[randomMove.row][randomMove.col] = 'O';
    }
  }

  private _getPossibleMoves(): { row: number, col: number }[] {
    // ? Check possible moves
    let possibleMoves = [];
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] === '') {
          possibleMoves.push({ row: i, col: j });
        }
      }
    }
    console.log(possibleMoves);
    return possibleMoves;
  }

  private _getUserMoves(){
    let userMoves = [];
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] === "X") {
          userMoves.push({ row: i, col: j });
        }
      }
    }
    console.log(userMoves);
    return userMoves;
    
  }

  private _updatePlayer() {
    if (this.currentPlayer === 'X') {
      this.message = `It's your turn`;
    }
    else {
      this.message = `It's computer turn`;
      setTimeout(() => {
        this._computerMove();
      }, 1000);
    }
  }

  goBack() {
    this._router.navigate(['/']);
  }
}
