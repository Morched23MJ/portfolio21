import { AfterViewInit, Component, OnInit } from '@angular/core';
import { GsapService } from 'src/app/services/gsap.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.sass']
})
export class FeaturedComponent implements OnInit, AfterViewInit {

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

    // VERSION 1
    // projects.forEach(project => {
    //   project.addEventListener("mousemove", e => {
    //     this.gsap.to(project.querySelector("img"), {
    //       x: e['clientX'],
    //       y: e['clientY'],
    //       // transform origin of images to center
    //       xPercent: -150,
    //       yPercent: -100,
    //       // stagger subsequent images by 50ms
    //       stagger: .05
    //     })
    //   });

    //   project.addEventListener('mouseenter', () => {
    //     this.gsap.to(project.querySelector(".project-image"), { transform: "scale(.8)", opacity: .65, zIndex: 1 })
    //     this.gsap.to(project.querySelector(".project-content"), { zIndex: 2 })
    //   })

    //   project.addEventListener('mouseleave', () => {
    //     this.gsap.to(project.querySelector(".project-image"), { transform: "scale(.3)", opacity: 0, zIndex: -1 })
    //     this.gsap.to(project.querySelector(".project-content"), { zIndex: 0 })
    //   })
    // })



    // gsap.utils.toArray('.categories p')
    //   .forEach(category => {
    //     let { label } = category.dataset

    //     category.addEventListener('mouseenter', () => {
    //       gsap.to(`img[data-image=${label}]`, { opacity: 1, scale: 1 })
    //       gsap.set(`img[data-image=${label}]`, { zIndex: 1 })
    //       gsap.set(`p[data-label=${label}]`, { zIndex: 2 })
    //     })

    //     category.addEventListener('mouseleave', () => {
    //       gsap.to(`img[data-image=${label}]`, { opacity: 0, zIndex: -1, scale: .80 })
    //       gsap.set(`p[data-label=${label}]`, { zIndex: 0 })
    //     })
    //   })











    // It's working: Can't click CASE STUDY BTN THO.
    // let projects = document.querySelectorAll(".project")
    // console.log(projects)
    // projects.forEach(project => {
    //   project.addEventListener("mousemove", e => {
    //     console.log(e);
    //     project.querySelector(".project-image").setAttribute("style", `display: block; top: ${e['clientY'] + window.scrollY - 200}px; left: ${e['clientX'] - 200}px; max-height: 400px; width: 400px;`)
    //   })
    //   project.addEventListener("mouseleave", e => {
    //     console.log("HA");
    //     project.querySelector(".project-image").setAttribute("style", `display: none;`)
    //   })
    // })


  }
}
