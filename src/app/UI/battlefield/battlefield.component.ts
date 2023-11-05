import {
  Component,
  DestroyRef,
  ElementRef,
  HostBinding,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { UIService } from '../services/ui.service';
import { UnitDirective } from '../unit-ui/unit.directive';

@Component({
  selector: 'app-battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.scss'],
})
export class BattlefieldComponent implements OnDestroy {
  deleteUnit(id: string) {
    //this.unitInjectPlace.viewContainerRef.remove();
    //this.unitInjectPlace.viewContainerRef.remove();

    // console.log('parentID=',id)
    // let nodeElement = document.getElementById(id);
    // console.log('parentofID',nodeElement?.parentElement)
    // console.log('nodelement', nodeElement)
    // nodeElement?.parentElement?.remove()
    // nodeElement?.remove()
    //this.uiService.deleteUnit(id, )

    console.log('test', this.test);
  }

  ngOnDestroy(): void {}
  @ViewChild('test') test: ElementRef | undefined;
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
