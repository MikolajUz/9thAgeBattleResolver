import { Injectable } from '@angular/core';
import { AdUnit } from '../unit-ui/ad-unit';
import { UnitUIComponent } from '../unit-ui/unit-ui.component';
import { unitUI } from '../unit-ui/unit-ui.interface';

@Injectable({
  providedIn: 'root',
})
export class UIService {
  unitData: unitUI = {
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
  };

  setGridUnit(gridUnit: number) {
    this.unitData.gridUnit = gridUnit;
  }
  createGridArray = (x: number) => Array.from(Array(x).keys());

  createUnit(quantity: number, fileLength: number, base: string) {
    if (quantity < fileLength) {
      fileLength = quantity;
    }
    const baseWidth = Number(base.split('x')[0]) / 5;
    const baseHeight = Number(base.split('x')[1]) / 5;
    this.unitData.unitRFWidth = baseWidth * this.unitData.gridUnit;
    this.unitData.unitRFHeight = baseHeight * this.unitData.gridUnit;

    this.unitData.rankXPlaces = this.createGridArray(fileLength);
    this.unitData.fileYPlaces = this.createGridArray(
      Math.trunc(quantity / fileLength)
    );

    this.unitData.RaFRest = this.createGridArray(quantity % fileLength);

    let rest = 0;
    if (quantity % fileLength) rest = 1;

    const nmbFiles = Math.trunc(quantity / fileLength) + rest;

    this.unitData.unitFileGrids = this.createGridArray(nmbFiles);
    this.unitData.unitRankGrids = this.createGridArray(fileLength);
    this.unitData.unitWidth =
      this.unitData.unitRankGrids.length * this.unitData.unitRFWidth;
    this.unitData.unitHeight = nmbFiles * this.unitData.unitRFHeight;
  }

  getUnit(quantity: number, fileLength: number, base: string) {
    this.createUnit(quantity, fileLength, base);
    return new AdUnit(UnitUIComponent);
  }
}
