import { Injectable } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

@Injectable({
  providedIn: 'root'
})
export class GsapService {

  constructor() {
    gsap.registerPlugin(ScrollTrigger)
  }

  get gsap(): GSAP { return gsap }
  get st() { return ScrollTrigger }
}
