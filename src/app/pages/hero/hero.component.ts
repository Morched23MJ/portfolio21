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
  }

  ngAfterViewInit() {
    this.anim.gsap.to(".featured .orange", {
      scrollTrigger: {
        trigger: ".orange",
        toggleActions: "play pause resume pause",
        start: "top center",
        end: "top 100",
        // scrub: 5,
        pin: ".orange",
        pinSpacing: false,
        markers: true
      },
      x: -100,
      duration: 5,
    })
  }
}
