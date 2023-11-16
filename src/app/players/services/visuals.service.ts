import {
  ElementRef,
  Injectable,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { AdUnit } from '../components/features/ad-unit';
import { unitUI } from '../interfaces/unit-ui.interface';
import { UnitUiBottomComponent } from '../components/features/unit-ui-bottom/unit-ui-bottom.component';
import { UnitUITopComponent } from '../components/features/unit-ui-top/unit-ui-top.component';
import { UnitDirective } from '../components/features/unit.directive';
import { Store } from '@ngrx/store';
import { RoosterStoreActions } from '../rooster-store/rooster.index';
import { RoosterStoreSelectors } from '../rooster-store/rooster.index';

@Injectable({
  providedIn: 'root',
})
export class VisualsService {
  private renderer: Renderer2;
  constructor(rendererFactory: RendererFactory2, private store: Store) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

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

  createUnitData = (player_: number, ID: number): unitUI => {
    let player: string;
    if (player_ === 0) player = 'plrOne';
    if (player_ === 1) player = 'plrTwo';
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

    let unit = this.store.select(
      RoosterStoreSelectors.selectUnitByID(player_, 0, ID)
    );
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

    if (player_ === 0) unitData.player = 'RankAndFile';
    if (player_ === 1) unitData.player = 'RankAndFile2';
    this.unitData = unitData;

     this.store.dispatch(
       RoosterStoreActions.updateUnitUIData({ unitUI: unitData, ID: ID, playerIndex: player_,
        roosterIndex: 0 })
     );

    return unitData;
  };

  createUnitUI(type: string, player_: number, ID: number) {
    let player: string;
    if (player_ === 0) player = 'plrOne';
    if (player_ === 1) player = 'plrTwo';
    const createUnitComponent = (type: any) => {
      this.createUnitData(player_, ID);
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
    componentRef.instance.myBounds = this.battlefieldBoundaries?.nativeElement;
  }
  deleteUnit(id: number) {
    let unit = this.renderer.selectRootElement(`[id='${id}']`, true);
    this.renderer.parentNode(unit).remove();
  }
}
