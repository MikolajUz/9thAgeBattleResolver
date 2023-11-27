import { Component } from '@angular/core';
import { FacadeService } from 'src/app/facade/facade.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  constructor(private facade: FacadeService) {}
  startSkirmish() {
    this.facade.resolveSkirmish();
  }
}
