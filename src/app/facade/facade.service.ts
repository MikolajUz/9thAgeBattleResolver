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
import { Player } from '../players/interfaces/player.interface';
import { Rooster } from '../players/interfaces/rooster.interface';
import { skirmishScore } from '../main/interfaces/skirmishScore.interface';
import { BattleService } from '../main/services/battle.service';

@Injectable({
  providedIn: 'root',
})
export class FacadeService {
  constructor(private store: Store ) {}

  gridUnit!: number;
  injectPlace!: UnitDirective;
  battlefieldBoundaries: ElementRef | undefined;
  units: Unit[] = [];
  players: Player[] = [];
  roosters: Rooster[] = [];

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
  getPlayers() {
    this.store
      .select(RoosterStoreSelectors.selectPlayers)
      .subscribe((players) => (this.players = players));
  }

  getRoosters(playerIndex: number) {
    this.store
      .select(RoosterStoreSelectors.selectRoosters(playerIndex))
      .subscribe((roosters) => (this.roosters = roosters));
  }
  getUnits(playerIndex: number, roosterIndex: number) {
    this.store
      .select(RoosterStoreSelectors.selectRooster(playerIndex, roosterIndex))
      .subscribe((units) => (this.units = units));
  }

  getRoosterUnitByID$(playerIndex: number, roosterIndex: number, ID: number) {
    return this.store.select(
      RoosterStoreSelectors.selectUnitByID(playerIndex, roosterIndex, ID)
    );
  }
  getRoosterUnitByID(playerIndex: number, roosterIndex: number, ID: number) {
    let unitReturn!: Unit;
    let temp;
    let select = this.store.select(
      RoosterStoreSelectors.selectUnitByID(playerIndex, roosterIndex, ID)
    );

    select.subscribe((unit) => (temp = unit));

    if (temp) unitReturn = temp;
    return unitReturn;
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

  getBattleUnits(playerIndex: number) {
    let battleUnits: Unit[] = [];
    this.store
      .select(RoosterStoreSelectors.selectBattleUnits(playerIndex))
      .subscribe((unit) => (battleUnits = unit));

    return battleUnits;
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
  increaseQuantity(
    unitID: number,
    playerIndex: number,
    roosterIndex: number,
    amount: number
  ) {
    this.store.dispatch(
      RoosterStoreActions.increaseQuantity({
        unitID: unitID,
        playerIndex: playerIndex,
        roosterIndex: roosterIndex,
        amount: amount,
      })
    );
  }
  decreaseQuantity(
    unitID: number,
    playerIndex: number,
    roosterIndex: number,
    amount: number
  ) {
    this.store.dispatch(
      RoosterStoreActions.decreaseQuantity({
        unitID: unitID,
        playerIndex: playerIndex,
        roosterIndex: roosterIndex,
        amount: amount,
      })
    );
  }
  addWound(
    unitID: number,
    playerIndex: number,
    roosterIndex: number,
    amount: number
  ) {
    this.store.dispatch(
      RoosterStoreActions.addWound({
        unitID: unitID,
        playerIndex: playerIndex,
        roosterIndex: roosterIndex,
        amount: amount,
      })
    );
  }
  removeWound(
    unitID: number,
    playerIndex: number,
    roosterIndex: number,
    amount: number
  ) {
    this.store.dispatch(
      RoosterStoreActions.removeWound({
        unitID: unitID,
        playerIndex: playerIndex,
        roosterIndex: roosterIndex,
        amount: amount,
      })
    );
  }
  setWounds(
    unitID: number,
    playerIndex: number,
    roosterIndex: number,
    wounds: number
  ) {
    this.store.dispatch(
      RoosterStoreActions.setWounds({
        unitID: unitID,
        playerIndex: playerIndex,
        roosterIndex: roosterIndex,
        wounds: wounds,
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

  updateAllUnitUIData() {
    this.store.dispatch(RoosterStoreActions.updateAllUnitUIData());
  }

  changeOnBattlefieldProperty(
    unitID: number,
    playerIndex: number,
    roosterIndex: number
  ) {
    this.store.dispatch(
      RoosterStoreActions.changeOnBattlefieldProperty({
        unitID: unitID,
        playerIndex: playerIndex,
        roosterIndex: roosterIndex,
      })
    );
  }

  runAllSkirmishes() {
    this.store.dispatch(RoosterStoreActions.runAllSkirmishes());
    
  }

  updateScore(
    playerIndex: number,
    unitIndex: number,
    propertyName: keyof skirmishScore,
    changeValue: any
  ) {
    this.store.dispatch(
      RoosterStoreActions.updateScore({
        playerIndex: playerIndex,
        unitIndex: unitIndex,
        propertyName: propertyName,
        changeValue: changeValue,
      })
    );
  }
  scoreInit(playerIndex: number, unitIndex: number) {
    this.store.dispatch(
      RoosterStoreActions.scoreInit({
        playerIndex: playerIndex,
        unitIndex: unitIndex,
      })
    );
  }
  clearScore() {
    this.store.dispatch(RoosterStoreActions.clearScore());
  }

  resolveHit(){
    this.store.dispatch(RoosterStoreActions.resolveHit());
  }
}
