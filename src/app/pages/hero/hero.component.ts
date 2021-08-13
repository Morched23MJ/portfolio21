import { trigger } from '@angular/animations';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { GsapService } from 'src/app/services/gsap.service';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.sass']
})
export class HeroComponent implements OnInit, AfterViewInit {

  gsap: GSAP;
  st;

  constructor(private gsapService: GsapService) {
    this.gsap = gsapService.gsap;
    this.st = gsapService.st;
  }

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

    this.gsap.from(
      ".hero", {
      y: 200,
      opacity: 0,
      duration: 2,
    },
    )

    // not working as expected: wanted to pull it to top when scrolled
    // this.gsap.to(
    //   ".hero", {
    //   opacity: .3,
    //   duration: 3,
    //   scrollTrigger: {
    //     trigger: ".hero",
    //     scrub: true,
    //     start: 'top 100',
    //     end: '+=300',
    //     toggleActions: 'play none none reverse',
    //     markers: true
    //   }
    // },
    // )

    this.gsap.from(
      ".underhero", {
      y: 200,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ".underhero",
        scrub: true,
        start: 'top 75%',
        end: '+=300',
        toggleActions: 'play none none reverse',
        // markers: true
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

    // MARQUEE
    this.gsap.from(
      ".marquee", {
      x: -300,
      opacity: .9,
      duration: 3,
      scrollTrigger: {
        trigger: ".marquee",
        scrub: true,
        start: 'top bottom',
        toggleActions: 'play none none reverse',
        markers: true
      }
    },
    )


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
}
