import { Injectable } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransitService {

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(
        x =>
          x instanceof NavigationStart ||
          x instanceof NavigationEnd ||
          x instanceof NavigationCancel ||
          x instanceof NavigationError
      ),
      // map(x => (x instanceof NavigationStart ? x : false)),
    ).subscribe(change => {
      console.log(change)
      if (change instanceof NavigationStart) {
        // this.animateTransit(change)
        // window.scrollTo({ top: 0, behavior: 'auto'})
      }
      // PATCH FIXs
      // if (change instanceof NavigationEnd) setTimeout(() => {
      //   window.scrollTo(0, 0)
      // }, 1500);
    });
  }

  animateTransit(change: NavigationStart) {
    let transit = document.querySelector(".transit");
    console.log(change.url.split("/"))
    transit.querySelector(".text").textContent = change.url.split("/")[1] || "morch23mj";
    transit.setAttribute("style", "display: block");
    setTimeout(() => {
      transit.setAttribute("style", "display: block; opacity: 1; transition: .3s;");
    }, 50);

    setTimeout(() => {
      transit.setAttribute("style", "display:block; opacity: 0; transition: .3s");
      setTimeout(() => {
        transit.setAttribute("style", "display: none");
      }, 300);

    }, 2700);
  }
}
