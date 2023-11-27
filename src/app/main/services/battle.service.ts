import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { FacadeService } from 'src/app/facade/facade.service';
import { BattlePlayer } from '../interfaces/battlePlayer.interface';
import { BattleUnitAdapter } from '../interfaces/adapters/battleUnitData.adapter';

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
    if (this.battleData.length === 0) {
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
              unit.quantity
            )
          );
        });
      });
    }
    console.log('battleData', this.battleData);
  }

  getAmountInContact() {
    this.createBattleData();
  }

  resolveSkirmish() {
    this.getAmountInContact();
  }
}
