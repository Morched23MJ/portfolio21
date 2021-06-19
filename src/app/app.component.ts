import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import LocomotiveScroll from 'locomotive-scroll';
import { ResizeObserver } from '@juggle/resize-observer';
import { ScrollService } from './services/scroll.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'portfolio';

  @ViewChild('scrollContent') scrollContent: ElementRef;

  constructor(private scrollService: ScrollService) { }

  ngOnInit() {
    console.log("init")
    let el = document.querySelector('[data-scroll-container]');
    // this.scrollService.initScroll(el);
  }

  ngAfterViewInit() {
    let el = document.querySelector('[data-scroll-container]');
    this.scrollService.initScroll(this.scrollContent.nativeElement);
    // this.scrollService.updateScroll(this.scrollContent.nativeElement)
  }

}
