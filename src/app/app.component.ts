import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import LocomotiveScroll from 'locomotive-scroll';
import { ResizeObserver } from '@juggle/resize-observer';
import { ScrollService } from './services/scroll.service';
import { debounceTime, filter, map, tap } from 'rxjs/operators'
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'portfolio';
  loading$;

  @ViewChild('scrollContent') scrollContent: ElementRef;

  constructor(private router: Router, private scrollService: ScrollService) {
    this.loading$ = this.router.events.pipe(
      filter(
        x =>
          x instanceof NavigationStart ||
          x instanceof NavigationEnd ||
          x instanceof NavigationCancel ||
          x instanceof NavigationError
      ),
      map(x => {
        console.log(x);
        if (x instanceof NavigationStart) return true
        else setTimeout(() => {
          return false
        }, 2000);
      }),
      debounceTime(2000),
      tap(x => console.log(x))
    );
  }

  ngOnInit() {
    console.log("init")
    let el = document.querySelector('[data-scroll-container]');
    // this.scrollService.initScroll(el);
  }

  ngAfterViewInit() {
    // let el = document.querySelector('[data-scroll-container]');
    // this.scrollService.initScroll(el);
    // this.scrollService.updateScroll(this.scrollContent.nativeElement)
  }

}
