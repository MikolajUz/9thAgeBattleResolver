import { Injectable } from '@angular/core';
import { ArmyStoreSelectors } from '../army/army-store/army.index';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class FacadeService {
  constructor(private store: Store) {}

  getArmy() {
    this.store.select(ArmyStoreSelectors.selectArmyState);
  }
  getArmyUnit(name: string) {
    this.store.select(ArmyStoreSelectors.selectArmyUnit(name));
  }
}
