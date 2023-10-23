import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UIService {
  gridUnit!: number;
  unitWidth!: number;
  unitHeight!: number;
  unitRFWidth!: number;
  unitRFHeight!: number;

  rankXPlaces!: number[];
  fileYPlaces!: number[];
  RaFRest!: number[];
  unitFileGrids!: number[];
  unitRankGrids!: number[];

  setGridUnit(gridUnit: number) {
    this.gridUnit = gridUnit;
  }

  createUnit(quantity: number, fileLength: number, base: string) {
    if (quantity < fileLength) {
      fileLength = quantity;
    }
    const createGridArray = (x: number) => Array.from(Array(x).keys());
    const baseWidth = Number(base.split('x')[0]) / 5;
    const baseHeight = Number(base.split('x')[1]) / 5;
    this.unitRFWidth = baseWidth * this.gridUnit;
    this.unitRFHeight = baseHeight * this.gridUnit;

    this.rankXPlaces = createGridArray(fileLength);
    this.fileYPlaces = createGridArray(Math.trunc(quantity / fileLength));
    this.RaFRest = createGridArray(quantity % fileLength);

    let rest = 0;
    if (quantity % fileLength) rest = 1;

    const nmbFiles = Math.trunc(quantity / fileLength) + rest;

    this.unitFileGrids = createGridArray(nmbFiles);
    this.unitRankGrids = createGridArray(fileLength);

    this.unitWidth = this.unitRankGrids.length * this.unitRFWidth;
    this.unitHeight = nmbFiles * this.unitRFHeight;
  }
}
