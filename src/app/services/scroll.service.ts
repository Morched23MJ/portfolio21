import { Injectable } from '@angular/core';
// import gsap from 'gsap';
// import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { GsapService } from './gsap.service';

// import LocomotiveScroll from 'locomotive-scroll';
@Injectable({
  providedIn: 'root'
})
export class ScrollService {


  routeChange$: Subscription;

  constructor(private router: Router, private gsapService: GsapService) {
    this.routeChange$ = this.router.events.pipe(
      filter(
        x =>
          x instanceof NavigationStart ||
          x instanceof NavigationEnd ||
          x instanceof NavigationCancel ||
          x instanceof NavigationError
      ),
      map(x => (x instanceof NavigationStart)),
    ).subscribe(change => { if (change) this.updateScroll() });
  }

  smoothScroll(content, viewport, smoothness) {
    content = this.gsapService.gsap.utils.toArray(content)[0];
    smoothness = smoothness || 1;

    this.gsapService.gsap.set(viewport || content.parentNode, {
      overflow: "hidden",
      position: "fixed",
      height: "100%",
      width: "100%",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    });
    this.gsapService.gsap.set(content, { overflow: "visible", width: "100%" });

    let getProp = this.gsapService.gsap.getProperty(content),
      setProp = this.gsapService.gsap.quickSetter(content, "y", "px"),
      setScroll = this.gsapService.st.getScrollFunc(window),
      removeScroll = () => (content.style.overflow = "visible"),
      killScrub = (trigger) => {
        let scrub = trigger.getTween
          ? trigger.getTween()
          : this.gsapService.gsap.getTweensOf(trigger.animation)[0]; // getTween() was added in 3.6.2
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
    this.gsapService.st.addEventListener("refreshInit", onResize);
    this.gsapService.st.addEventListener("refresh", () => {
      removeScroll();
      requestAnimationFrame(removeScroll);
    });
    this.gsapService.st.defaults({ scroller: content });
    this.gsapService.st.prototype['update'] = (p) => p; // works around an issue in ScrollTrigger 3.6.1 and earlier (fixed in 3.6.2, so this line could be deleted if you're using 3.6.2 or later)

    this.gsapService.st.scrollerProxy(content, {
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

    return this.gsapService.st.create({
      animation: this.gsapService.gsap.fromTo(
        content,
        { y: 0 },
        {
          y: () => document.documentElement.clientHeight - height,
          ease: "none",
          onUpdate: this.gsapService.st.update
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

  updateScroll() {
    // ScrollTrigger.refresh();
    window.dispatchEvent(new Event('resize'))
  }
}
