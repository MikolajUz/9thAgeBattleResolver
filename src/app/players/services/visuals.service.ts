import {
  ElementRef,
  Injectable,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { AdUnit } from '../components/features/ad-unit';
import { unitUI } from '../interfaces/unit-ui.interface';
import { UnitVisualComponent } from '../components/features/unit-visual/unit-visual.component';
import { UnitDirective } from '../components/features/unit.directive';
import { Store } from '@ngrx/store';
import { RoosterStoreActions } from '../rooster-store/rooster.index';
import { RoosterStoreSelectors } from '../rooster-store/rooster.index';

@Injectable({
  providedIn: 'root',
})
export class VisualsService {
  private renderer: Renderer2;
  gridUnit!: number;
  injectPlace!: UnitDirective;
  battlefieldBoundaries: ElementRef | undefined;

  constructor(rendererFactory: RendererFactory2, private store: Store) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

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

  createUnitData = (playerIndex: number, ID: number): void => {
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
      unitWidthScss: '',
      unitRFWidthScss: '',
      unitRFHeightScss: '',
      unitHeightScss: '',
    };

    let baseWidth: number | undefined;
    let baseHeight: number | undefined;
    let fileLength: number | undefined;
    let quantity: number | undefined;

    let unit = this.store.select(
      RoosterStoreSelectors.selectUnitByID(playerIndex, 0, ID)
    );
    unit.subscribe((unitData) => {
      baseWidth = Number(unitData?.base.split('x')[0]) / 5;
      baseHeight = Number(unitData?.base.split('x')[1]) / 5;
      fileLength = unitData?.fileLength;
      quantity = unitData?.quantity;
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

    this.store.dispatch(
      RoosterStoreActions.updateUnitUIData({
        unitUI: unitData,
        unitID: ID,
        playerIndex: playerIndex,
        roosterIndex: 0,
      })
    );
  };

  createUnitUI(playerIndex: number, ID: number) {
    this.createUnitData(playerIndex, ID);

    const viewContainerRef = this.injectPlace.viewContainerRef;
    const componentRef = viewContainerRef.createComponent(
      new AdUnit(UnitVisualComponent).component
    );
    componentRef.instance.myBounds = this.battlefieldBoundaries?.nativeElement;
    componentRef.instance.unitID = ID;
    componentRef.instance.playerIndex = playerIndex;
  }
  deleteUnit(id: number) {
    let unit = this.renderer.selectRootElement(`[id='${id}']`, true);
    this.renderer.parentNode(unit).remove();
  }
}
