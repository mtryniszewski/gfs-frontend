import { Component, OnInit} from '@angular/core';
import 'hammerjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  collapse: string;
  transparent: string;
  fixed: boolean;
  navMosueEnter: boolean;

  constructor(
  ) { }

  ngOnInit(): void {
    this.collapse = 'nodisplay';
    this.transparent = 'full';
    this.navMosueEnter = false;
  }

  hidden() {
    this.collapse = 'nodisplay';
  }

  notransparent() {
    if (this.fixed) {
      this.transparent = 'full';
    }
    this.navMosueEnter = true;
  }

  leave() {
    if (this.fixed) {
      this.transparent = 'bg-into py-0';
    }
    this.navMosueEnter = false;
  }


}
