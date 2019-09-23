import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/core/services/token.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  userId: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    if (this.isLogged()) {
      this.userId = this.getUserId();
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

  logout() {
    this.authService.logout();
  }

  isLogged(): boolean {
    return this.tokenService.isToken();
  }

}
