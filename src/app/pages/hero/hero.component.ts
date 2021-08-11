import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.sass']
})
export class HeroComponent implements OnInit, AfterViewInit {

  constructor(private anim: ScrollService) { }

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
