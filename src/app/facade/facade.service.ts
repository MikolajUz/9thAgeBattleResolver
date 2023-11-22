import { ElementRef, Injectable } from '@angular/core';
import {
  ArmyStoreActions,
  ArmyStoreSelectors,
} from '../army/army-store/army.index';
import { Store } from '@ngrx/store';
import {
  RoosterStoreActions,
  RoosterStoreSelectors,
} from '../players/rooster-store/rooster.index';
import { Unit } from '../army/interfaces/unit.interface';
import { unitUI } from '../players/interfaces/unit-ui.interface';
import { UnitDirective } from '../players/components/features/unit.directive';

@Injectable({
  providedIn: 'root',
})
export class FacadeService {
  constructor(private store: Store) {}

  gridUnit!: number;
  injectPlace!: UnitDirective;
  battlefieldBoundaries: ElementRef | undefined;

  public init() {
    this.store.dispatch(ArmyStoreActions.requestLoadArmy());
  }

  createGridArray = (x: number) => Array.from(Array(x).keys());

  setGridUnit(
    gridUnit: number,
    injectPlace: UnitDirective,
    battlefieldBoundaries: ElementRef | undefined
  ) {
    this.gridUnit = gridUnit;
    this.injectPlace = injectPlace;
    this.battlefieldBoundaries = battlefieldBoundaries;
  }

  getGridUnit() {
    return this.gridUnit;
  }
  getInjectPlace() {
    return this.injectPlace;
  }
  getBattlefieldBoundaries() {
    return this.battlefieldBoundaries;
  }

  getArmy() {
    return this.store.select(ArmyStoreSelectors.selectArmyState);
  }
  getArmyUnit(name: string) {
    return this.store.select(ArmyStoreSelectors.selectArmyUnit(name));
  }

  getRooster(playerIndex: number, roosterIndex: number) {
    return this.store.select(
      RoosterStoreSelectors.selectRooster(playerIndex, roosterIndex)
    );
  }

  getRoosterUnitByID(playerIndex: number, roosterIndex: number, ID: number) {
    return this.store.select(
      RoosterStoreSelectors.selectUnitByID(playerIndex, roosterIndex, ID)
    );
  }

  getPropertyOfRoosterUnit(
    playerIndex: number,
    roosterIndex: number,
    ID: number,
    propertyName: keyof Unit
  ) {
    let propertyReturn;
    this.store
      .select(
        RoosterStoreSelectors.selectUnitPropertyByID(
          playerIndex,
          roosterIndex,
          ID,
          propertyName
        )
      )
      .subscribe((property) => (propertyReturn = property));
    return propertyReturn;
  }

  getUnitUIdata(playerIndex: number, roosterIndex: number, ID: number) {
    return this.store.select(
      RoosterStoreSelectors.selectUnitUIData(playerIndex, roosterIndex, ID)
    );
  }

  changeUnitUIData(
    unitUI: unitUI,
    unitID: number,
    playerIndex: number,
    roosterIndex: number
  ) {
    this.store.dispatch(
      RoosterStoreActions.updateUnitUIData({
        unitUI: unitUI,
        unitID: unitID,
        playerIndex: playerIndex,
        roosterIndex: roosterIndex,
      })
    );
  }

  addUnitToRooster(unit: Unit, playerIndex: number, roosterIndex: number) {
    this.store.dispatch(
      RoosterStoreActions.addUnitToRooster({
        nextUnit: unit,
        playerIndex: playerIndex,
        roosterIndex: roosterIndex,
      })
    );
  }

  requestLoadArmy() {
    this.store.dispatch(ArmyStoreActions.requestLoadArmy());
  }

  requestRoosterLoad(
    roosterTxT: string,
    playerIndex: number,
    roosterIndex: number
  ) {
    this.store.dispatch(
      RoosterStoreActions.requestRoosterLoad({
        roosterTxT: roosterTxT,
        playerIndex: playerIndex,
        roosterIndex: roosterIndex,
      })
    );
  }

  setFileLength(
    unitID: number,
    fileLength: number,
    playerIndex: number,
    roosterIndex: number
  ) {
    this.store.dispatch(
      RoosterStoreActions.setFileLength({
        unitID: unitID,
        fileLength: fileLength,
        playerIndex: playerIndex,
        roosterIndex: roosterIndex,
      })
    );
  }

  pickUnit(unitID: number, playerIndex: number, roosterIndex: number) {
    this.store.dispatch(
      RoosterStoreActions.createUnitUI({
        unitID: unitID,
        playerIndex: playerIndex,
        roosterIndex: roosterIndex,
      })
    );
  }

  selectUnit(unitID: number, playerIndex: number, roosterIndex: number) {
    this.store.dispatch(
      RoosterStoreActions.selectUnit({
        unitID: unitID,
        playerIndex: playerIndex,
        roosterIndex: roosterIndex,
      })
    );
  }
  increaseQuantity(unitID: number, playerIndex: number, roosterIndex: number) {
    this.store.dispatch(
      RoosterStoreActions.increaseQuantity({
        unitID: unitID,
        playerIndex: playerIndex,
        roosterIndex: roosterIndex,
      })
    );
  }
  decreaseQuantity(unitID: number, playerIndex: number, roosterIndex: number) {
    this.store.dispatch(
      RoosterStoreActions.decreaseQuantity({
        unitID: unitID,
        playerIndex: playerIndex,
        roosterIndex: roosterIndex,
      })
    );
  }
  addWound(unitID: number, playerIndex: number, roosterIndex: number) {
    this.store.dispatch(
      RoosterStoreActions.addWound({
        unitID: unitID,
        playerIndex: playerIndex,
        roosterIndex: roosterIndex,
      })
    );
  }
  removeWound(unitID: number, playerIndex: number, roosterIndex: number) {
    this.store.dispatch(
      RoosterStoreActions.removeWound({
        unitID: unitID,
        playerIndex: playerIndex,
        roosterIndex: roosterIndex,
      })
    );
  }
  deleteUnit(unitID: number, playerIndex: number, roosterIndex: number) {
    this.store.dispatch(
      RoosterStoreActions.deleteUnit({
        unitID: unitID,
        playerIndex: playerIndex,
        roosterIndex: roosterIndex,
      })
    );
  }
}
