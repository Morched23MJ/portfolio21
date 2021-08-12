import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.sass']
})
export class FeaturedComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
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
