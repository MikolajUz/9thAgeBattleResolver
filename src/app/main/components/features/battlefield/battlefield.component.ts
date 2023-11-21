import { Component, ElementRef, ViewChild } from '@angular/core';
import { UnitDirective } from 'src/app/players/components/features/unit.directive';
import { FacadeService } from 'src/app/facade/facade.service';

@Component({
  selector: 'app-battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.scss'],
})
export class BattlefieldComponent {
  @ViewChild(UnitDirective, { static: true }) unitInjectPlace!: UnitDirective;
  @ViewChild('battlefieldBoundaries') battlefield: ElementRef | undefined;

  gridUnit: number = 10;
  grids = this.facade.createGridArray(50);
  gridUnitScss = `${this.gridUnit}px`;

  constructor(private facade: FacadeService) {}

  ngAfterViewInit(): void {
    this.facade.setGridUnit(
      this.gridUnit,
      this.unitInjectPlace,
      this.battlefield
    );
  }
}
