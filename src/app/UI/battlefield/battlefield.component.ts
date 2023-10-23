import { Component, HostBinding } from '@angular/core';
import { UIService } from '../services/ui.service';

@Component({
  selector: 'app-battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.scss'],
})
export class BattlefieldComponent {
  createUnit() {
    this.uiService.createUnit(14, 5, '25x25');
  }

  gridUnit: number = 10;
  grids: number[];

  createGridArray = (x: number) => Array.from(Array(x).keys());

  @HostBinding('style.--gridUnitScss')
  gridUnitScss = `${this.gridUnit}px`;

  constructor(private uiService: UIService) {
    this.grids = this.createGridArray(50);
    this.uiService.setGridUnit(this.gridUnit);
    this.uiService.createUnit(14, 5, '25x25');
  }
}
