import { AfterViewInit, Component, OnInit } from '@angular/core';
import { GsapService } from 'src/app/services/gsap.service';

@Component({
  selector: 'app-kravmaga',
  templateUrl: './kravmaga.component.html',
  styleUrls: ['./kravmaga.component.sass']
})
export class KravmagaComponent implements OnInit, AfterViewInit {

  gsap: GSAP;
  st;

  constructor(private gsapService: GsapService) {
    this.gsap = gsapService.gsap;
    this.st = gsapService.st;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {



    this.st.matchMedia({

      // desktop
      "(min-width: 800px)": () => {

        let pinBoxes = document.querySelectorAll('.pin');

        var pinWrapWidth = window.innerWidth * pinBoxes.length;

        var horizontalScrollLength = (pinBoxes.length - 1) * window.innerWidth;

        document.querySelector(".kravmaga-case .wrapper").setAttribute("style", `width: ${pinWrapWidth}px`)

        console.log(pinBoxes)
        console.log(pinWrapWidth)
        console.log(horizontalScrollLength)

        this.gsap.to(".kravmaga-case .wrapper", {
          scrollTrigger: {
            trigger: ".kravmaga-case .wrapper",
            scrub: true,
            pin: ".kravmaga-case",
            // anticipatePin: 1,
            start: "top top",
            end: pinWrapWidth
          },
          x: -horizontalScrollLength,
          ease: "none"
        });

        this.gsap.to(".kravvv",
          {
            y: -400,
            scrollTrigger: {
              trigger: ".pin1",
              scrub: true,
              start: "left left",
              end: "right left",
            }
          }
        )
      },

    });
  }

}
