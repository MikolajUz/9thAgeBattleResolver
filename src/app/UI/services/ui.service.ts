import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { AdUnit } from '../unit-ui/ad-unit';
import { unitUI } from '../unit-ui/unit-ui.interface';
import { UnitUiBottomComponent } from '../unit-ui/unit-ui-bottom/unit-ui-bottom.component';
import { UnitUITopComponent } from '../unit-ui/unit-ui-top/unit-ui-top.component';
import { UnitDirective } from '../unit-ui/unit.directive';
import { Store } from '@ngrx/store';
import { RoosterStoreActions } from 'src/app/root-store/current-rooster-store/current-rooster.index';
import { RoosterStoreSelectors } from 'src/app/root-store/current-rooster-store/current-rooster.index';

@Injectable({
  providedIn: 'root',
})
export class UIService {
  constructor(private store: Store) {}

  unitData!: unitUI;
  gridUnit!: number;
  injectPlace!: UnitDirective;
  battlefieldBoundaries: ElementRef | undefined;
  ID!: number;

  setGridUnit(
    gridUnit: number,
    injectPlace: UnitDirective,
    battlefieldBoundaries: ElementRef | undefined
  ) {
    this.gridUnit = gridUnit;
    this.injectPlace = injectPlace;
    this.battlefieldBoundaries = battlefieldBoundaries;
  }
  createGridArray = (x: number) => Array.from(Array(x).keys());

  createUnitData = (player: string, ID: number): unitUI => {
    let unitData: unitUI = {
      gridUnit: 0,
      unitFileGrids: [],
      unitRankGrids: [],
      fileYPlaces: [],
      rankXPlaces: [],
      RaFRest: [],
      unitRFWidth: 0,
      unitRFHeight: 0,
      unitWidth: 0,
      unitHeight: 0,
      player: '',
      unitWidthScss: '',
      unitRFWidthScss: '',
      unitRFHeightScss: '',
      unitHeightScss: '',
    };

    let baseWidth: number | undefined;
    let baseHeight: number | undefined;
    let fileLength: number | undefined;
    let quantity: number | undefined;

    let unit = this.store.select(RoosterStoreSelectors.selectUnitPlr1(ID));
    unit.subscribe((unitData) => {
      baseWidth = Number(unitData?.base?.split('x')[0]) / 5;
      baseHeight = Number(unitData?.base?.split('x')[1]) / 5;
      fileLength = unitData?.fileLength;
      quantity = unitData?.Qty;
    });

    if (quantity! < fileLength!) {
      fileLength = quantity;
    }

    unitData.gridUnit = this.gridUnit;
    unitData.unitRFWidth = baseWidth! * unitData.gridUnit;
    unitData.unitRFHeight = baseHeight! * unitData.gridUnit;

    unitData.unitRFWidthScss = `${unitData.unitRFWidth}px`;
    unitData.unitRFHeightScss = `${unitData.unitRFHeight}px`;

    unitData.rankXPlaces = this.createGridArray(fileLength!);
    unitData.fileYPlaces = this.createGridArray(
      Math.trunc(quantity! / fileLength!)
    );

    unitData.RaFRest = this.createGridArray(quantity! % fileLength!);
    let rest = 0;
    if (quantity! % fileLength!) rest = 1;
    const nmbFiles = Math.trunc(quantity! / fileLength!) + rest;

    unitData.unitFileGrids = this.createGridArray(nmbFiles);
    unitData.unitRankGrids = this.createGridArray(fileLength!);
    unitData.unitWidth = unitData.unitRankGrids.length * unitData.unitRFWidth;
    unitData.unitHeight = nmbFiles * unitData.unitRFHeight;

    unitData.unitWidthScss = `${unitData.unitWidth}px`;
    unitData.unitHeightScss = `${unitData.unitHeight}px`;

    if (player === 'plrOne') unitData.player = 'RankAndFile';
    if (player === 'plrTwo') unitData.player = 'RankAndFile2';
    this.unitData = unitData;

    this.store.dispatch(
      RoosterStoreActions.updateUnitUIDataPlr1({ unitUI: unitData, ID: ID })
    );

    return unitData;
  };

  createUnitUI(type: string, player: string, ID: number) {
    const createUnitComponent = (type: any) => {
      this.createUnitData(player, ID);
      return new AdUnit(type);
    };

    let adUnit;
    switch (type) {
      case 'UnitUiBottomComponent':
        adUnit = createUnitComponent(UnitUiBottomComponent);
        break;
      case 'UnitUITopComponent':
        adUnit = createUnitComponent(UnitUITopComponent);
        break;
    }
    this.ID = ID;
    const viewContainerRef = this.injectPlace.viewContainerRef;
    const componentRef = viewContainerRef.createComponent(adUnit!.component);

    this.store.dispatch(
      RoosterStoreActions.viewIDsetPlr1({
        ID: ID,
        viewID: viewContainerRef.indexOf(componentRef.hostView),
      })
    );
    componentRef.instance.myBounds = this.battlefieldBoundaries?.nativeElement;
  }
  deleteUnit(id: number) {
    let viewID: number | undefined;
    this.store
      .select(RoosterStoreSelectors.selectUnitPlr1(id))
      .subscribe((unit$) => {
        viewID = unit$?.viewID;
      });
    this.injectPlace.viewContainerRef.remove(viewID);
  }
}
