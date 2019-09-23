import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Tesar Studio';

  constructor(
    translateService: TranslateService
  ) {
    translateService.setDefaultLang('pl');
    translateService.use('pl');
  }
}
