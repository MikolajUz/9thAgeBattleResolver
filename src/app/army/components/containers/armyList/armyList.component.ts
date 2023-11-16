import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FacadeService } from 'src/app/facade/facade.service';
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

  constructor(
    private store: Store,
    private facade: FacadeService
  ) {
    this.store.dispatch(ArmyStoreActions.requestLoadArmy());
  }
}
