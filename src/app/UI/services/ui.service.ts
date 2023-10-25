import { Injectable } from '@angular/core';
import { AdUnit } from '../unit-ui/ad-unit';
import { unitUI } from '../unit-ui/unit-ui.interface';

@Injectable({
  providedIn: 'root',
})
export class UIService {
  unitData!: unitUI;
  gridUnit!: number;

  setGridUnit(gridUnit: number) {
    this.gridUnit = gridUnit;
  }
  createGridArray = (x: number) => Array.from(Array(x).keys());

  createUnit(quantity: number, fileLength: number, base: string) {
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

    this.unitData = unitData;
  }

  getUnit(quantity: number, fileLength: number, base: string, type: any) {
    this.createUnit(quantity, fileLength, base);
    return new AdUnit(type);
  }
}
