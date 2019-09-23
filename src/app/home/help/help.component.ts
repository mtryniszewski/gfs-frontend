import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

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
