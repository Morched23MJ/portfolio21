import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  menu: HTMLElement;
  menuContent: HTMLElement;

  constructor() { }

  ngOnInit(): void {
    this.menu = document.querySelector(".menu");
    this.menuContent = document.querySelector(".menu-content");

    this.menu.addEventListener("click", () => {
      this.toggleMenu();
    })
  }


  toggleMenu() {
    let hidden = window.getComputedStyle(this.menuContent).display == "none";
    if (hidden) {
      this.menuContent.setAttribute("style", "display: block");
      setTimeout(() => {
        this.menuContent.classList.add("opacityUp");
      }, 100);
    } else {
      this.menuContent.classList.remove("opacityUp");
      setTimeout(() => {
        this.menuContent.setAttribute("style", "display: none");
      }, 300);
    }
  }
}
