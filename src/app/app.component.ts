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

  cursor;
  cursorOuter

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
    // let el = document.querySelector('[data-scroll-container]');



    // this.scrollService.initScroll(el);
  }

  ngAfterViewInit() {
    // let el = document.querySelector('[data-scroll-container]');
    // this.scrollService.initScroll(el);
    // this.scrollService.updateScroll(this.scrollContent.nativeElement)



    // CURSOR


    // document.addEventListener("scroll", this.updateCursor)

    // MOUSEMOVE
    document.addEventListener("mousemove", this.updateCursor)


    let cta_link = document.querySelector(".cta-link")
    console.log(cta_link)
    cta_link.addEventListener("mouseover", e => {
      document.querySelector(".cursor-outer").classList.add("expand");
      setTimeout(() => {
        document.querySelector(".cursor-outer").classList.remove("expand")
      }, 500);
    })

    document.querySelectorAll(".cta-link").forEach((e) => e.addEventListener("mouseover", e => {
      console.log("Mhm")
      document.querySelector(".cursor-outer").classList.add("expand");
      setTimeout(() => {
        document.querySelector(".cursor-outer").classList.remove("expand")
      }, 500);
    }))

    // CLICK
    document.addEventListener("click", () => {
      this.cursorOuter.classList.add("expand")
      setTimeout(() => {
        this.cursorOuter.classList.remove("expand")
      }, 500);
    })
  }


  updateCursor(event) {
    // console.log("scroll")
    this.cursor = document.querySelector(".cursor")
    this.cursorOuter = document.querySelector(".cursor-outer")

    this.cursor.setAttribute("style", `top: ${event.pageY - 16}px; left: ${event.pageX + 10}px;`)
    this.cursorOuter.setAttribute("style", `top: ${event.pageY - 32}px; left: ${event.pageX - 32}px;`)
  }
}
