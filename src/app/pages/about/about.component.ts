import { AfterViewInit, Component, OnInit } from '@angular/core';
import gsap from 'gsap';
import { ScrollService } from 'src/app/services/scroll.service';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass']
})
export class AboutComponent implements OnInit, AfterViewInit {

  constructor(private scrollService: ScrollService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // let firstTween = this.scrollService.gsap.to(".red", { scrollTrigger: ".red", duration: 1, opacity: 0 })
  }

}
