import { Component } from '@angular/core';
import { ArmyService } from 'src/app/army/services/army.service';
import { Store } from '@ngrx/store';
import {
  ArmyStoreActions,
  ArmyStoreSelectors,
} from 'src/app/army/army-store/army.index';

@Component({
  selector: 'app-armyList',
  templateUrl: './armyList.component.html',
  styleUrls: ['./armyList.component.scss'],
})
export class ArmyListComponent {
  armyList$ = this.store.select(ArmyStoreSelectors.selectArmyState);

  constructor(private armyService: ArmyService, private store: Store) {
    this.store.dispatch(ArmyStoreActions.requestLoadArmy());
  }
}
