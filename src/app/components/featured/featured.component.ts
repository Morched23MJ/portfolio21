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
    let projects = document.querySelectorAll(".project")
    console.log(projects)
    projects.forEach(project => {
      project.addEventListener("mouseover", e => {
        console.log(e);
        project.querySelector(".project-image").setAttribute("style", `display: block; top: ${e['clientY']}; left: ${e['clientY']}; max-height: 400px; width: 400px;`)
      })
      project.addEventListener("mouseleave", e => {
        console.log("HA");
        project.querySelector(".project-image").setAttribute("style", `display: none;`)
      })
    })
  }
}
