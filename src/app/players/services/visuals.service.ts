import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { AdUnit } from '../components/features/ad-unit';
import { unitUI } from '../interfaces/unit-ui.interface';
import { UnitVisualComponent } from '../components/features/unit-visual/unit-visual.component';
import { FacadeService } from 'src/app/facade/facade.service';
import { RoosterFeatureKey } from '../rooster-store/rooster.reducer';
import { Unit } from 'src/app/army/interfaces/unit.interface';

@Injectable({
  providedIn: 'root',
})
export class VisualsService {
  private renderer: Renderer2;
  constructor(
    rendererFactory: RendererFactory2,
    private facade: FacadeService
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  createUnitData = (playerIndex: number, unitID: number): unitUI => {
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

    this.facade
      .getRoosterUnitByID$(playerIndex, 0, unitID)
      .subscribe((unitData) => {
        baseWidth = Number(unitData?.base.split('x')[0]) / 5;
        baseHeight = Number(unitData?.base.split('x')[1]) / 5;
        fileLength = unitData?.fileLength;
        quantity = unitData?.quantity;
      });

    quantity! < fileLength! ? (fileLength = quantity) : null;

    unitData.gridUnit = this.facade.getGridUnit();
    unitData.unitRFWidth = baseWidth! * unitData.gridUnit;
    unitData.unitRFHeight = baseHeight! * unitData.gridUnit;

    unitData.unitRFWidthScss = `${unitData.unitRFWidth}px`;
    unitData.unitRFHeightScss = `${unitData.unitRFHeight}px`;

    unitData.rankXPlaces = this.facade.createGridArray(Number(fileLength)!);
    unitData.fileYPlaces = this.facade.createGridArray(
      Math.trunc(quantity! / fileLength!)
    );

    unitData.RaFRest = this.facade.createGridArray(quantity! % fileLength!);
    let rest = 0;
    quantity! % fileLength! ? (rest = 1) : null;
    const nmbFiles = Math.trunc(quantity! / fileLength!) + rest;

    unitData.unitFileGrids = this.facade.createGridArray(nmbFiles);
    unitData.unitRankGrids = this.facade.createGridArray(Number(fileLength)!);
    unitData.unitWidth = unitData.unitRankGrids.length * unitData.unitRFWidth;
    unitData.unitHeight = nmbFiles * unitData.unitRFHeight;

    unitData.unitWidthScss = `${unitData.unitWidth}px`;
    unitData.unitHeightScss = `${unitData.unitHeight}px`;

    this.facade.changeUnitUIData(unitData, unitID, playerIndex, 0);

    return unitData;
  };

  createUnitUI(playerIndex: number, unitID: number) {
    this.createUnitData(playerIndex, unitID);

    const viewContainerRef = this.facade.getInjectPlace().viewContainerRef;
    const componentRef = viewContainerRef.createComponent(
      new AdUnit(UnitVisualComponent).component
    );
    componentRef.instance.myBounds =
      this.facade.getBattlefieldBoundaries()?.nativeElement;
    componentRef.instance.unitID = unitID;
    componentRef.instance.playerIndex = playerIndex;
  }
  checkBattleUnit(playerIndex: number, unitID: number): boolean {
    try {
      this.renderer.selectRootElement(
        `[id="PlayerIndex=${playerIndex},unitID=${unitID}"]`,
        false
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  deleteUnit(id: number, playerIndex: number) {
    if (this.checkBattleUnit(playerIndex, id)) {
      let unit = this.renderer.selectRootElement(
        `[id="PlayerIndex=${playerIndex},unitID=${id}"]`,
        true
      );
      this.renderer.parentNode(unit).remove();
    }
  }
  updateAllUnitUIData() {
    this.facade.getPlayers();
    this.facade.players.forEach((player, playerIndex) => {
      this.facade.getRoosters(playerIndex);
      this.facade.roosters.forEach((rooster, roosterIndex) => {
        this.facade.getUnits(playerIndex, roosterIndex);
        this.facade.units.forEach((unit) => {
          unit.unitUI ? this.createUnitData(playerIndex, unit.ID) : null;
        });
      });
    });
  }
}
