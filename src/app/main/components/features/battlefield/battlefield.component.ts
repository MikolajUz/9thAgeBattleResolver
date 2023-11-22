import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnChanges,
  SimpleChanges,
  Input,
  HostListener,
} from '@angular/core';
import { UnitDirective } from 'src/app/players/components/features/unit.directive';
import { FacadeService } from 'src/app/facade/facade.service';
import { concatAll } from 'rxjs';
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

  onResized(event: ResizedEvent): void {
    this.width = Math.round(event.newRect.width);
    this.height = Math.round(event.newRect.height);
    this.gridUnit = this.width / 50;
    let gridNumber: number;
    this.width >= this.height
      ? (gridNumber = Math.round(this.height / this.gridUnit))
      : (gridNumber = Math.round(this.width / this.gridUnit));
    this.grids = this.facade.createGridArray(gridNumber);
    this.gridUnitScss = `${this.gridUnit}px`;
    this.facade.setGridUnit(
      this.gridUnit,
      this.unitInjectPlace,
      this.battlefield
    );
  }
}
