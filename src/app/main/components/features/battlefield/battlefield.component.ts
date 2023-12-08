import { Component, ElementRef, ViewChild } from '@angular/core';
import { UnitDirective } from 'src/app/players/components/features/unit.directive';
import { FacadeService } from 'src/app/facade/facade.service';
import { ResizedEvent } from 'angular-resize-event';

@Component({
  selector: 'app-battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.scss'],
})
export class BattlefieldComponent {
  @ViewChild(UnitDirective, { static: true }) unitInjectPlace!: UnitDirective;
  @ViewChild('battlefieldBoundaries') battlefield: ElementRef | undefined;

  width = 0;
  height = 0;
  gridUnit: number = 10;
  gridDensity = 60;
  gridsX = this.facade.createGridArray(this.gridDensity);
  gridsY = this.facade.createGridArray(this.gridDensity);
  gridUnitScss = `${this.gridUnit}px`;

  constructor(private facade: FacadeService) {}

  ngAfterViewInit(): void {
    this.facade.setGridUnit(
      this.gridUnit,
      this.unitInjectPlace,
      this.battlefield
    );
  }

  onResized(event: ResizedEvent): void {
    this.width = Math.round(event.newRect.width);
    this.height = Math.round(event.newRect.height);
    this.gridUnit = Math.round(this.width / this.gridDensity);
    this.gridsX = this.facade.createGridArray(
      Math.round(this.width / this.gridUnit)
    );
    this.gridsY = this.facade.createGridArray(
      Math.round(this.height / this.gridUnit)
    );
    this.gridUnitScss = `${this.gridUnit}px`;
    this.facade.setGridUnit(
      this.gridUnit,
      this.unitInjectPlace,
      this.battlefield
    );
    this.facade.updateAllUnitUIData();
  }
}
