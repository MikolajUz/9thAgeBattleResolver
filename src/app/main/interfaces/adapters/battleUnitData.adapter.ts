import { Injectable } from '@angular/core';
import { BattleUnitData } from '../battleUnitData.interface';

@Injectable({
  providedIn: 'root',
})
export class BattleUnitAdapter {
  adapt(
    playerIndex: number,
    gridUnit: number,
    files: number,
    ranks: number,
    startPoint: {
      x: number;
      y: number;
    },
    RFwidth: number,
    RFheight: number,
    RFnumber: number
  ): BattleUnitData {
    return new BattleUnitData(
      playerIndex,
      gridUnit,
      files,
      ranks,
      startPoint,
      RFwidth,
      RFheight,
      RFnumber
    );
  }
}
