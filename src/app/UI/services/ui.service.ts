import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { AdUnit } from '../unit-ui/ad-unit';
import { unitUI } from '../unit-ui/unit-ui.interface';
import { UnitUiBottomComponent } from '../unit-ui/unit-ui-bottom/unit-ui-bottom.component';
import { UnitUITopComponent } from '../unit-ui/unit-ui-top/unit-ui-top.component';
import { UnitDirective } from '../unit-ui/unit.directive';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { RoosterStoreActions } from 'src/app/root-store/current-rooster-store/current-rooster.index';
import { deleteUnitPlr1 } from 'src/app/root-store/current-rooster-store/current-rooster.actions';


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

  createUnitUI(
    quantity: number,
    fileLength: number,
    base: string,
    type: string,
    player: string,
    ID: number
  ) {
    const createUnitData = (
      quantity: number,
      fileLength: number,
      base: string,
      player: string
    ): unitUI => {
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

      console.log('base', base);

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

      this.store.dispatch(
        RoosterStoreActions.updateUnitUIDataPlr1({ unitUI: unitData, ID: ID })
      );
      return unitData;
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

    this.ID = ID;
    const viewContainerRef = this.injectPlace.viewContainerRef;
    console.log('injectPLace', this.injectPlace);
    const componentRef = viewContainerRef.createComponent(adUnit!.component);
    componentRef.instance.myBounds = this.battlefieldBoundaries?.nativeElement;
    componentRef.instance.ID = ID;
    componentRef.setInput('ID', ID);
  }
  deleteUnit(id:string){
    //@ViewChild(id, { static: false }) nodeElement: ElementRef;

    

    //let nodeElement = document.getElementById(id);
    // console.log('parentofID',nodeElement?.parentElement)
    // console.log('nodelement', nodeElement)
    // nodeElement?.parentElement?.remove()
    // nodeElement?.remove()

  }
}
