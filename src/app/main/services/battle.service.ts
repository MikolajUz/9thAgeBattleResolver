import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { FacadeService } from 'src/app/facade/facade.service';
import { BattlePlayer } from '../interfaces/battlePlayer.interface';
import { BattleUnitAdapter } from '../interfaces/adapters/battleUnitData.adapter';
import { Unit } from 'src/app/army/interfaces/unit.interface';

@Injectable({
  providedIn: 'root',
})
export class BattleService {
  private renderer: Renderer2;
  constructor(
    private rendererFactory: RendererFactory2,
    private facade: FacadeService,
    private adapter: BattleUnitAdapter
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  battleData: BattlePlayer[] = [];

  createBattleData() {
    const checkYPosition = (
      playerIndex: number,
      RFy: number,
      lastRankNumber: number,
      unit: Unit
    ): Boolean => {
      if (playerIndex === 0) {
        if (RFy - unit.unitUI.unitRFHeight / 4 > 0) {
          console.log('Please move last rank RF to');
          return false;
        }
      }
      if (playerIndex === 1) {
        if (
          RFy + unit.unitUI.unitRFHeight / 4 <
          lastRankNumber * unit.unitUI.unitRFHeight
        ) {
          console.log('Please move last rank RF to');
          return false;
        }
      }
      return true;
    };

    const createRestRFarray = (
      playerIndex: number,
      unit: Unit,
      unitDOM: any
    ): boolean[] => {
      let RFlastRankPositions: boolean[] = [];
      if (unit.unitUI.RaFRest.length > 0) {
        let lastRankNumber = unit.unitUI.fileYPlaces.length;
        let rankSectionsArray: number[] = [0];
        for (
          let RFrest = 0;
          RFrest < unit.unitUI.rankXPlaces.length;
          RFrest++
        ) {
          rankSectionsArray.push(
            (RFrest + 1) * Number(unit.unitUI.unitRFWidth)
          );
        }

        for (
          let RFrest = 0;
          RFrest < unit.unitUI.rankXPlaces.length;
          RFrest++
        ) {
          RFlastRankPositions.push(false);
        }

        for (let RFrest = 0; RFrest < unit.unitUI.RaFRest.length; RFrest++) {
          let RF = this.renderer.selectRootElement(
            `[id='${unitDOM.id},x=${RFrest},y=${lastRankNumber}']`,
            true
          );

          let RFy: number = Number(
            RF.style.transform.split(',')[1].slice(0, -3).trim()
          );

          if (!checkYPosition(playerIndex, RFy, lastRankNumber, unit))
            return RFlastRankPositions;

          let RFx: number = Number(
            RF.style.transform.split(',')[0].slice(10, -2).trim()
          );
          let RFxMiddle: number = RFx + Number(unit.unitUI.unitRFWidth) / 2;

          for (let index = 0; index < rankSectionsArray.length - 1; index++) {
            if (
              rankSectionsArray[index] <= RFxMiddle &&
              RFxMiddle < rankSectionsArray[index + 1]
            ) {
              RFlastRankPositions[index] = true;
            }
          }
        }
      }
      return RFlastRankPositions;
    };

    this.battleData = [];
    this.battleData.push(new BattlePlayer([]));
    this.battleData.push(new BattlePlayer([]));

    this.battleData.forEach((player, index) => {
      this.facade.getBattleUnits(index).forEach((unit) => {
        let unitDOM = this.renderer.selectRootElement(
          `[id='PlayerIndex=${index},unitID=${unit.ID}']`,
          true
        );

        this.battleData[index].battlePlayer.push(
          this.adapter.adapt(
            index,
            this.facade.gridUnit,
            unit.unitUI.rankXPlaces.length,
            unit.unitUI.fileYPlaces.length,
            {
              x: unitDOM.style.transform.split(',')[0].slice(10, -2).trim(),
              y: unitDOM.style.transform.split(',')[1].slice(0, -3).trim(),
            },
            unit.unitUI.unitRFWidth,
            unit.unitUI.unitRFHeight,
            unit.quantity,
            unit.ID,
            createRestRFarray(index, unit, unitDOM)
          )
        );
      });
    });
  }

  getAmountInContact() {
    this.createBattleData();
  }

  resolveSkirmish() {
    this.getAmountInContact();
  }
}
