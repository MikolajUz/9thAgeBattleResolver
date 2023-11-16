import {
  Component,
  ElementRef,
  HostBinding,
  ViewChild,
} from '@angular/core';
import { VisualsService } from 'src/app/players/services/visuals.service';
import { UnitDirective } from 'src/app/players/components/features/unit.directive';

@Component({
  selector: 'app-battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.scss'],
})
export class BattlefieldComponent  {


  @ViewChild(UnitDirective, { static: true }) unitInjectPlace!: UnitDirective;
  @ViewChild('battlefieldBoundaries') battlefield: ElementRef | undefined;

  gridUnit: number = 10;
  grids: number[];

  @HostBinding('style.--gridUnitScss')
  gridUnitScss = `${this.gridUnit}px`;

  constructor(private visualsService: VisualsService) {
    this.grids = this.visualsService.createGridArray(50);
    this.visualsService.setGridUnit(
      this.gridUnit,
      this.unitInjectPlace,
      this.battlefield
    );
  }

  ngAfterViewInit(): void {
    this.visualsService.setGridUnit(
      this.gridUnit,
      this.unitInjectPlace,
      this.battlefield
    );
  }
}
