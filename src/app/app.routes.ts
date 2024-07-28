import { Routes } from '@angular/router';
import { GameListComponent } from './pages/game-list/game-list.component';
import { TicTacToeComponent } from './pages/tic-tac-toe/tic-tac-toe.component';

export const routes: Routes = [
    {
        path: '',
        component: GameListComponent,
        data:{
            animation: 'gameList'
        }
    },
    {
        path: 'xo',
        component: TicTacToeComponent,
        data: {
            animation: 'xoGame'
        }
    },
    {
        path: 'snake',
        loadComponent: () => import('./pages/snake/snake.component').then(c => c.SnakeComponent),
        data: {
            animation: 'snakeGame'
        }
    },
    {
        path: 'flappy-bird',
        loadComponent: () => import('./pages/flappy-bird/flappy-bird.component').then(c => c.FlappyBirdComponent),
        data: {
            animation: 'flappyBirdGame'
        }
    }
];
