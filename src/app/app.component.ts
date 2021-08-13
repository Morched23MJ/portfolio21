import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { ScrollService } from './services/scroll.service';
import { GsapService } from './services/gsap.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'portfolio';
  loading$;

  scroll;

  cursor;
  cursorOuter;

  mouseX;
  mouseY;


  constructor(private scrollService: ScrollService, private gsapService: GsapService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

    this.scrollService.smoothScroll("#content", null, 1);




    // CURSOR


    // MOUSEMOVE
    document.addEventListener("scroll", this.updateCursor)
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
    this.cursor = document.querySelector(".cursor")
    this.cursorOuter = document.querySelector(".cursor-outer")

    if (event.type == "mousemove") {
      console.log("H")
      this.mouseX = event.pageX;
      this.mouseY = event.pageY;
      this.cursor.setAttribute("style", `top: ${this.mouseY - 16}px; left: ${this.mouseX + 10}px;`)
      this.cursorOuter.setAttribute("style", `top: ${this.mouseY - 32}px; left: ${this.mouseX - 32}px;`)
    } else if (event.type == "scroll") {
      document.dispatchEvent(new Event('mousemove'))
    }
  }
}
