import { ElementRef, Injectable } from '@angular/core';
import { AdUnit } from '../unit-ui/ad-unit';
import { unitUI } from '../unit-ui/unit-ui.interface';
import { UnitUiBottomComponent } from '../unit-ui/unit-ui-bottom/unit-ui-bottom.component';
import { UnitUITopComponent } from '../unit-ui/unit-ui-top/unit-ui-top.component';
import { UnitDirective } from '../unit-ui/unit.directive';

@Injectable({
  providedIn: 'root',
})
export class UIService {
  unitData!: unitUI;
  gridUnit!: number;
  injectPlace!: UnitDirective;
  battlefieldBoundaries: ElementRef | undefined;

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

  createUnitUI(
    quantity: number,
    fileLength: number,
    base: string,
    type: string,
    player: string
  ) {
    const createUnitData = (
      quantity: number,
      fileLength: number,
      base: string,
      player: string
    ): void => {
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
      };

      if (quantity < fileLength) {
        fileLength = quantity;
      }

      const baseWidth = Number(base.split('x')[0]) / 5;
      const baseHeight = Number(base.split('x')[1]) / 5;
      unitData.gridUnit = this.gridUnit;
      unitData.unitRFWidth = baseWidth * unitData.gridUnit;
      unitData.unitRFHeight = baseHeight * unitData.gridUnit;

      unitData.rankXPlaces = this.createGridArray(fileLength);
      unitData.fileYPlaces = this.createGridArray(
        Math.trunc(quantity / fileLength)
      );

      unitData.RaFRest = this.createGridArray(quantity % fileLength);
      let rest = 0;
      if (quantity % fileLength) rest = 1;
      const nmbFiles = Math.trunc(quantity / fileLength) + rest;

      unitData.unitFileGrids = this.createGridArray(nmbFiles);
      unitData.unitRankGrids = this.createGridArray(fileLength);
      unitData.unitWidth = unitData.unitRankGrids.length * unitData.unitRFWidth;
      unitData.unitHeight = nmbFiles * unitData.unitRFHeight;

      if (player === 'plrOne') unitData.player = 'RankAndFile';
      if (player === 'plrTwo') unitData.player = 'RankAndFile2';
      this.unitData = unitData;
    };

    const createUnitComponent = (
      quantity: number,
      fileLength: number,
      base: string,
      type: any
    ) => {
      createUnitData(quantity, fileLength, base, player);
      return new AdUnit(type);
    };

    let adUnit;
    switch (type) {
      case 'UnitUiBottomComponent':
        adUnit = createUnitComponent(
          quantity,
          fileLength,
          base,
          UnitUiBottomComponent
        );
        break;
      case 'UnitUITopComponent':
        adUnit = createUnitComponent(
          quantity,
          fileLength,
          base,
          UnitUITopComponent
        );

        break;
    }

    const viewContainerRef = this.injectPlace.viewContainerRef;
    const componentRef = viewContainerRef.createComponent(adUnit!.component);
    componentRef.instance.myBounds = this.battlefieldBoundaries?.nativeElement;
  }
}
