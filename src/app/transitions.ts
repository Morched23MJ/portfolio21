import { style, query, group, animate, animateChild, transition, trigger } from "@angular/animations";

export const pageTransition =
  trigger('routeAnimations', [
    transition('* <=> *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('.3s ease-out', style({ left: '100%' }))
        ]),
        query(':enter', [
          animate('.3s ease-out', style({ left: '0%' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
  ]);
