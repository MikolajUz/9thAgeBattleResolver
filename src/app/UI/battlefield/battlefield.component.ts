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

  gridUnit: number = 10;
  grids: number[];

  @HostBinding('style.--gridUnitScss')
  gridUnitScss = `${this.gridUnit}px`;

  constructor(private uiService: UIService) {
    this.grids = this.uiService.createGridArray(50);
    this.uiService.setGridUnit(
      this.gridUnit,
      this.unitInjectPlace,
      this.battlefield
    );
  }

  ngAfterViewInit(): void {
    this.uiService.setGridUnit(
      this.gridUnit,
      this.unitInjectPlace,
      this.battlefield
    );
  }
}
