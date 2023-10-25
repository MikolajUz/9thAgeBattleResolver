import { Component, ElementRef, HostBinding, ViewChild } from '@angular/core';
import { UIService } from '../services/ui.service';
import { UnitDirective } from '../unit-ui/unit.directive';

@Component({
  selector: 'app-battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.scss'],
})
export class BattlefieldComponent {
  @ViewChild(UnitDirective, { static: true }) unitInjectPlace!: UnitDirective;
  @ViewChild('battlefieldBoundaries') battlefield: ElementRef | undefined;

  createUnitButton(
    quantity: number,
    fileLength: number,
    base: string,
    type: string
  ) {
    this.uiService.createUnitUI(
      quantity,
      fileLength,
      base,
      type,
      this.unitInjectPlace,
      this.battlefield
    );
  }

  gridUnit: number = 10;
  grids: number[];

  @HostBinding('style.--gridUnitScss')
  gridUnitScss = `${this.gridUnit}px`;

  constructor(private uiService: UIService) {
    this.grids = this.uiService.createGridArray(50);
    this.uiService.setGridUnit(this.gridUnit);
  }
}
