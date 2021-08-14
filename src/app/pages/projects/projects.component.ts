import { AfterViewInit, Component, OnInit } from '@angular/core';
import { GsapService } from 'src/app/services/gsap.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass']
})
export class ProjectsComponent implements OnInit, AfterViewInit {

  gsap: GSAP;
  st;

  constructor(private gsapService: GsapService) {
    this.gsap = gsapService.gsap;
    this.st = gsapService.st;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    let projects = document.querySelectorAll('.project')


    projects.forEach(project => {
      let images = this.gsap.utils.toArray(project.querySelectorAll("img"));
      console.log(images.length)

      let gsap = this.gsap;

      this.gsap.to(images, {
        opacity: 1,
        zIndex: 1,
        stagger: {
          each: 1,
          onComplete: function () {
            gsap.to(
              images
                .filter(img => img !== this._targets[0]),
              { opacity: 0, zIndex: 0 }
            )
          }
        },
        repeat: -1,
        repeatDelay: 1
      })

      this.st.matchMedia({

        // desktop
        "(min-width: 800px)": () => {
          project.addEventListener("mousemove", e => {
            this.gsap.to(project.querySelectorAll("img"), {
              x: e['clientX'],
              y: e['clientY'],
              // transform origin of images to center
              xPercent: -150,
              yPercent: -100,
              // stagger subsequent images by 50ms
              stagger: .05
            })
          });

          project.addEventListener('mouseenter', () => {
            this.gsap.to(project.querySelector(".project-image"), { transform: "scale(.8)", opacity: .65, zIndex: 1 })
            this.gsap.to(project.querySelector(".project-content"), { zIndex: 2 })
          })

          project.addEventListener('mouseleave', () => {
            this.gsap.to(project.querySelector(".project-image"), { transform: "scale(.3)", opacity: 0, zIndex: -1 })
            this.gsap.to(project.querySelector(".project-content"), { zIndex: 0 })
          })
        },

      });


    })

  }
}
