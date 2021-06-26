import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent implements OnInit, AfterViewInit {

  constructor(private anim: ScrollService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // this.anim.gsap.from(".contact .orange", {
    //   scrollTrigger: {
    //     trigger: ".orange",
    //     toggleActions: "play pause resume pause",
    //     start: "top top",
    //     end: "+=100%",
    //     scrub: 5,
    //     pin: true,
    //     pinSpacing: false,
    //     markers: true
    //   },
    //   duration: 5,
    // })



    const tl = this.anim.gsap.timeline({
      scrollTrigger: {
        trigger: ".abc",
        start: "top top",
        end: "+=2000",
        // pinSpacing: false,
        scrub: 1,
        pin: true,
        snap: {
          snapTo: 1 / 2,
          delay: 1,
          duration: 1
        },
        markers: true,
      }
    });
    tl.to(".a", { opacity: 0, xPercent: -100 })
      .from(".b", { opacity: 0, xPercent: 100, }, "<50%")
      .to(".b", { opacity: 0, xPercent: -100 })
      .from(".c", { opacity: 0, xPercent: 100 }, "<50%")


    const tl2 = this.anim.gsap.timeline({
      scrollTrigger: {
        trigger: ".efg",
        start: "top top",
        end: "+=2000",
        // pinSpacing: false,
        scrub: 1,
        pin: true,
        snap: {
          snapTo: 1 / 2,
          delay: 1,
          duration: 1
        },
        markers: true,
      }
    });


    tl2.to(".e", { opacity: 0, yPercent: -100 })
      .from(".f", { opacity: 0, yPercent: 100, }, "<50%")
      .to(".f", { opacity: 0, yPercent: -100 })
      .from(".g", { opacity: 0, yPercent: 100 }, "<50%")



    this.anim.gsap.from(".f-wrapper", {
      scrollTrigger: {
        trigger: ".f",
        start: "top-=300 top",
        end: "+=100",
        scrub: 1,
        markers: true,
      },
      opacity: 0,
      yPercent: 50
    });

    // this.anim.st.create({
    //   animation: tl,
    //   trigger: ".abc",
    //   start: "top top",
    //   end: "+=4000",
    //   pinSpacing: false,
    //   scrub: 3,
    //   pin: ".abc",
    //   markers: true,
    //   // anticipatePin: 1
    // })

    this.anim.gsap.from(".contact .x", {
      scrollTrigger: {
        trigger: ".x",
        // toggleActions: "play pause resume pause",
        start: "top top",
        end: "+=1000",
        scrub: 5,
        pin: true,
        markers: true
      }
    })
    this.anim.gsap.from(".contact .y", {
      scrollTrigger: {
        trigger: ".y",
        // toggleActions: "play pause resume pause",
        start: "top top",
        end: "+=1000",
        scrub: 5,
        pin: true,
        markers: true
      }
    })


  }
}
