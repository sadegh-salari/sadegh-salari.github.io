import { Component } from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { slideInAnimation } from '../utils/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  animations:[
    slideInAnimation
  ],
  template: `
  <div [@routeAnimations]="getRouteAnimationData()">
    <router-outlet></router-outlet>
  </div>
  `,
})
export class AppComponent {

  constructor(
    private _contexts: ChildrenOutletContexts
  ) { }

  getRouteAnimationData() {
    return this._contexts.getContext('primary')?.route?.snapshot?.data?.['animation']
  }
}
