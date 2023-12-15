import { Component } from '@angular/core';
import { FacadeService } from 'src/app/facade/facade.service';
import { BattleService } from 'src/app/main/services/battle.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  constructor(private facade: FacadeService, private battle: BattleService) {}
  startSkirmish() {
    this.facade.runAllSkirmishes();
    
}
}