import { trigger } from '@angular/animations';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { GsapService } from 'src/app/services/gsap.service';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.sass']
})
export class HeroComponent implements OnInit, OnDestroy, AfterViewInit {

  gsap: GSAP;
  st;

  constructor(private gsapService: GsapService) {
    this.gsap = gsapService.gsap;
    this.st = gsapService.st;
  }

  a1;
  a2;
  a3;

  ngOnInit(): void {
    // document.querySelector(".to-outline").addEventListener("mouseover", e => {
    // let spans = document.querySelectorAll(".to-outline span")
    // spans.forEach((span) => span.classList.add("text-outline"))
    // })
    // document.querySelector(".to-outline").addEventListener("mouseleave", e => {
    // let spans = document.querySelectorAll(".to-outline span")
    // spans.forEach((span) => span.classList.remove("text-outline"))
    // })
  }

  ngAfterViewInit() {


    // HERO
    // this.gsap.from(
    //   ".hero",
    //   {
    //     y: 200,
    //     opacity: 0,
    //     scrollTrigger: {
    //       trigger: ".hero",
    //       start: "top top",
    //       // end: "top top",
    //       scrub: true
    //     }
    //   }
    // )

    this.gsap.to(
      ".hero",
      {
        y: -200,
        // opacity: 0,
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      }
    )


    // MARQUEE
    this.a3 = this.gsap.from(
      ".marquee",
      {
        x: -500,
        opacity: .9,
        duration: 3,
        scrollTrigger: {
          trigger: ".marquee",
          scrub: true,
          start: 'top bottom',
          end: 'bottom top',
          toggleActions: 'play none none reverse',
          markers: true
        }
      },
    )

    // UNDERHERO
    this.gsap.from(
      ".underhero",
      {
        y: 200,
        opacity: 0,
        scrollTrigger: {
          trigger: ".underhero",
          scrub: true,
          start: 'top 75%',
          end: '+=300',
        }
      },
    )

    // FIX:
    // this.gsap.to(
    //   ".underhero",
    //   {
    //     y: -400,
    //     // opacity: 0,
    //     scrollTrigger: {
    //       trigger: ".underhero",
    //       scrub: true,
    //       start: 'top top',
    //       end: 'bottom top',
    //     }
    //   },
    // )


    // Selected Work
    this.gsap.from(
      ".selected-work",
      {
        y: 300,
        opacity: 0,
        scrollTrigger: {
          trigger: ".selected-work",
          scrub: true,
          start: 'top 75%',
          end: '+=300',
        }
      },
    )










    this.st.create({
      trigger: ".section",
      pin: ".sticky-container",
      start: "top top",
      end: "+=500",
      scrub: true
    })

    // this.gsap.to(
    //   ".section", {
    //   scrollTrigger: {
    //     trigger: ".section",
    //     scrub: true,
    //     pin: ".sticky-container",
    //     // pinSpacing: false,
    //     start: "bottom bottom",
    //     end: "bottom top"
    //   }
    // }
    // )



    // this.anim.gsap.to(".featured .orange", {
    //   scrollTrigger: {
    //     trigger: ".orange",
    //     toggleActions: "play pause resume pause",
    //     start: "top center",
    //     end: "top 100",
    //     // scrub: 5,
    //     pin: ".orange",
    //     pinSpacing: false,
    //     markers: true
    //   },
    //   x: -100,
    //   duration: 5,
    // })
  }

  ngOnDestroy() {
  }
}
