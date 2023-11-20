import { Component } from '@angular/core';
import { FacadeService } from 'src/app/facade/facade.service';

@Component({
  selector: 'app-armyList',
  templateUrl: './armyList.component.html',
  styleUrls: ['./armyList.component.scss'],
})
export class ArmyListComponent {
  armyList$ = this.facade.getArmy();
  constructor(private facade: FacadeService) {
    this.facade.requestLoadArmy;
  }
}
