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
    gsap.registerPlugin(ScrollTrigger)
  }

  smoothScroll(content, viewport, smoothness) {
    content = gsap.utils.toArray(content)[0];
    smoothness = smoothness || 1;

    gsap.set(viewport || content.parentNode, {
      overflow: "hidden",
      position: "fixed",
      height: "100%",
      width: "100%",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    });
    gsap.set(content, { overflow: "visible", width: "100%" });

    let getProp = gsap.getProperty(content),
      setProp = gsap.quickSetter(content, "y", "px"),
      setScroll = ScrollTrigger.getScrollFunc(window),
      removeScroll = () => (content.style.overflow = "visible"),
      killScrub = (trigger) => {
        let scrub = trigger.getTween
          ? trigger.getTween()
          : gsap.getTweensOf(trigger.animation)[0]; // getTween() was added in 3.6.2
        scrub && scrub.kill();
        trigger.animation.progress(trigger.progress);
      },
      height,
      isProxyScrolling;

    function onResize() {
      height = content.clientHeight;
      content.style.overflow = "visible";
      document.body.style.height = height + "px";
    }
    onResize();
    ScrollTrigger.addEventListener("refreshInit", onResize);
    ScrollTrigger.addEventListener("refresh", () => {
      removeScroll();
      requestAnimationFrame(removeScroll);
    });
    ScrollTrigger.defaults({ scroller: content });
    ScrollTrigger.prototype['update'] = (p) => p; // works around an issue in ScrollTrigger 3.6.1 and earlier (fixed in 3.6.2, so this line could be deleted if you're using 3.6.2 or later)

    ScrollTrigger.scrollerProxy(content, {
      scrollTop(value) {
        if (arguments.length) {
          isProxyScrolling = true; // otherwise, if snapping was applied (or anything that attempted to SET the scroll proxy's scroll position), we'd set the scroll here which would then (on the next tick) update the content tween/ScrollTrigger which would try to smoothly animate to that new value, thus the scrub tween would impede the progress. So we use this flag to respond accordingly in the ScrollTrigger's onUpdate and effectively force the scrub to its end immediately.
          setProp(-value);
          setScroll(value);
          return;
        }
        return -getProp("y");
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight
        };
      }
    });

    return ScrollTrigger.create({
      animation: gsap.fromTo(
        content,
        { y: 0 },
        {
          y: () => document.documentElement.clientHeight - height,
          ease: "none",
          onUpdate: ScrollTrigger.update
        }
      ),
      scroller: window,
      invalidateOnRefresh: true,
      start: 0,
      end: () => height - document.documentElement.clientHeight,
      scrub: smoothness,
      onUpdate: (self) => {
        if (isProxyScrolling) {
          killScrub(self);
          isProxyScrolling = false;
        }
      },
      onRefresh: killScrub // when the screen resizes, we just want the animation to immediately go to the appropriate spot rather than animating there, so basically kill the scrub.
    });
  }

  initScroll(element) {
    // gsap.registerPlugin(ScrollTrigger)

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
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     // Hide loading indicator
    //     if (this.locoScroll) {
    //       this.locoScroll.update();
    //       this.locoScroll.scrollTo("top", { duration: 0 });
    //       console.log("Updated.");
    //     }
    //   }
    // })

  }

  updateScroll() {
    ScrollTrigger.refresh();
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
  get st() { return ScrollTrigger }
}
