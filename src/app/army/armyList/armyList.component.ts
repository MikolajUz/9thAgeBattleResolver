import { Component } from '@angular/core';
import { ArmyService } from '../services/army.service';

@Component({
  selector: 'app-armyList',
  templateUrl: './armyList.component.html',
  styleUrls: ['./armyList.component.scss'],
})
export class ArmyListComponent {
  armyList$ = this.armyService.getArmy();
  unit$? = this.armyService.getUnit('Bruisers');

  constructor(private armyService: ArmyService) {}
}
