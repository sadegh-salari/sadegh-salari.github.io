import { Routes } from '@angular/router';
import { GameListComponent } from './pages/game-list/game-list.component';

export const routes: Routes = [
    {
        path:'',
        component: GameListComponent
    },
    {
        path: 'xo',        loadComponent: () => import('./pages/tic-tac-toe/tic-tac-toe.component').then(c => c.TicTacToeComponent)
    }
];
