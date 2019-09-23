import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  collapse: string;
  transparent: string;
  fixed: boolean;
  navMosueEnter: boolean;
  constructor(
  ) { }

  ngOnInit():void{
    this.collapse = 'nodisplay';
    this.transparent = 'full';
    this.navMosueEnter = false;
  }


  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event) {
    const number = event.target.scrollingElement.scrollTop;
    if (number > 50) {
      this.fixed = true;
      if (!this.navMosueEnter) {
        this.transparent = 'py-0';
      }
    } else if (this.fixed && number < 10) {
      this.fixed = false;
      if (!this.navMosueEnter) {
        this.transparent = 'full';
      }
    }
  }

  notransparent() {
    if (this.fixed) {
      this.transparent = 'full';
    }
    this.navMosueEnter = true;
  }

  hidden() {
    this.collapse = 'nodisplay';
  }

  leave() {
    if (this.fixed) {
      this.transparent = 'py-0';
    }
    this.navMosueEnter = false;
  }

}
