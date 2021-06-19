import { Injectable } from '@angular/core';
import LocomotiveScroll from 'locomotive-scroll';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  locoScroll;

  constructor(private router: Router) {
    // if (!this.locoScroll) this.initScroll(document.querySelector('[data-scroll-container]'))
  }

  initScroll(element) {
    gsap.registerPlugin(ScrollTrigger)

    this.locoScroll = new LocomotiveScroll({
      el: element,
      smooth: true,
    });

    this.locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(element, {
      scrollTop(value) {
        return arguments.length ? this.locoScroll.scrollTo(value, 0, 0) : this.locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: element.style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.addEventListener("refresh", () => { console.log("refresh"); this.locoScroll.update() });
    ScrollTrigger.refresh();

    // INFO: when route changes, update Locomotive Scroll
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        if (this.locoScroll) {
          this.locoScroll.update();
          this.locoScroll.scrollTo("top", { duration: 0 });
          console.log("Updated.")
        }
      }
    })

  }

  updateScroll(element) {
    // const ro = new ResizeObserver((entries, observer) => {
    //   entries.forEach((entry, index) => {
    //     const { inlineSize: width, blockSize: height } = entry.contentBoxSize[0];
    //     if (this.locoScroll) {
    //       console.log("🚀 ~ file: scroll.service.ts ~ line 46 ~ ScrollService ~ entries.forEach ~ locoScroll", this.locoScroll)
    //       this.locoScroll.update();

    //       // TODO: This needs a better approach.
    //       this.locoScroll.scrollTo("top", { duration: 0 });
    //       console.log("Updated.")
    //     }
    //   });
    // });

    // ro.observe(element);
  }

  get gsap() { return gsap }
}
