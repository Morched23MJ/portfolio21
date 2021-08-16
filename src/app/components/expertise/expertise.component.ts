import { Component, OnInit } from '@angular/core';
import { GsapService } from 'src/app/services/gsap.service';

@Component({
  selector: 'app-expertise',
  templateUrl: './expertise.component.html',
  styleUrls: ['./expertise.component.sass']
})
export class ExpertiseComponent implements OnInit {

  gsap: GSAP;
  st;

  constructor(private gsapService: GsapService) {
    this.gsap = gsapService.gsap;
    this.st = gsapService.st;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    let certificates = document.querySelectorAll('.certificate')


    certificates.forEach(certificate => {
      let image = certificate.querySelector("img");

      let gsap = this.gsap;

      this.st.matchMedia({

        // desktop
        "(min-width: 800px)": () => {
          certificate.addEventListener("mousemove", e => {
            this.gsap.to(certificate.querySelector("img"), {
              x: e['clientX'],
              y: e['clientY'],
              // transform origin of images to center
              xPercent: -100,
              yPercent: -100,
              // stagger subsequent images by 50ms
            })
          });

          certificate.addEventListener('mouseenter', () => {
            this.gsap.to(certificate.querySelector("img"), { transform: "scale(.8)", opacity: .65, zIndex: 1 })
            this.gsap.to(certificate.querySelector("a"), { zIndex: 2 })
          })

          certificate.addEventListener('mouseleave', () => {
            this.gsap.to(certificate.querySelector("img"), { transform: "scale(.3)", opacity: 0, zIndex: -1 })
            this.gsap.to(certificate.querySelector("a"), { zIndex: 0 })
          })
        },

      });


    })

  }

}
