import { UserRole } from './../../enums/user-role.enum';
import { Component, Input, OnInit, HostListener } from '@angular/core';

import { TokenService } from '../../services/token.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  collapse: string;
  transparent: string;
  fixed: boolean;
  navMosueEnter: boolean;
  permissions: UserRole;
  userId: string;
  isNavbarHidden = false;


  @Input() title;
  logo: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.logo = '../../../../assets/smalllogo.png';
    this.collapse = 'nodisplay';
    this.transparent = 'bg-primary full';
    this.navMosueEnter = false;
    if (this.tokenService.isToken()) {
      this.userId = this.getUserId();
    }

    if (this.router.url === '/home/homepage/') {
      this.isNavbarHidden = true;
    }


  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event) {
    const number = event.target.scrollingElement.scrollTop;
    if (number > 50) {
      this.fixed = true;
      if (!this.navMosueEnter) {
        this.transparent = 'transparent bg-into py-0';
      }
    } else if (this.fixed && number < 10) {
      this.fixed = false;
      if (!this.navMosueEnter) {
        this.transparent = 'bg-primary full';
      }
    }
  }

  getUserName(): string {
    return this.tokenService.getDecodedToken().sub[1];
  }

  getUserRole(): string {

    return this.tokenService.getDecodedToken()[`Permissions`];
  }

  getUserId(): string {
    return this.tokenService.getDecodedToken().sub[3];
  }
  isLogged(): boolean {
    return this.tokenService.isToken();
  }

  logout() {
    this.authService.logout();
  }

  toggle() {
    if (this.collapse === 'nodisplay') {
      this.collapse = 'display';
    } else {
      this.collapse = 'nodisplay';
    }
  }

  hidden() {
    this.collapse = 'nodisplay';
  }

  notransparent() {
    if (this.fixed) {
      this.transparent = 'bg-primary full';
    }
    this.navMosueEnter = true;
  }

  leave() {
    if (this.fixed) {
      this.transparent = 'transparent bg-into py-0';
    }
    this.navMosueEnter = false;
  }
}
