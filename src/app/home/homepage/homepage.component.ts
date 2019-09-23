import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { ModalService } from './../../core/services/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import 'hammerjs';
import { SidebarComponent } from '../sidebar/sidebar.component';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})


export class HomepageComponent implements OnInit {
  @ViewChild('sidebar') sidebar: SidebarComponent;

  collapse: string;
  transparent: string;
  fixed: boolean;
  navMosueEnter: boolean;
  index = 0;
  infinite = true;
  direction = 'right';
  directionToggle = true;
  autoplay = true;
  avatars = '1234'.split('').map((x, i) => {
    // const num = Math.floor(Math.random() * 1000);
    return {
      url: '../../../assets/slider',
      title: '.jpg',
    };
  });

  constructor(
    private translate: TranslateService,
    private router: Router,
    private modalService: ModalService,
  ) { }

  indexChanged(index) {

  }
  ngOnInit(): void {
    this.collapse = 'nodisplay';
    this.transparent = 'full';
    this.navMosueEnter = false;
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
