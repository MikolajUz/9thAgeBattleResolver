import { Component, ElementRef, HostBinding, ViewChild } from '@angular/core';
import { UIService } from '../services/ui.service';
import { UnitDirective } from '../unit-ui/unit.directive';
import { UnitUITopComponent } from '../unit-ui/unit-ui-top.component';
import { UnitUiBottomComponent } from '../unit-ui/unit-ui-bottom/unit-ui-bottom.component';

@Component({
  selector: 'app-battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.scss'],
})
export class BattlefieldComponent {
  @ViewChild(UnitDirective, { static: true }) appUnit!: UnitDirective;
  @ViewChild('myBounds') div: ElementRef | undefined;

  createUnitButton(
    quantity: number,
    fileLength: number,
    base: string,
    type: string
  ) {
    let adUnit;
    switch (type) {
      case 'UnitUiBottomComponent':
        adUnit = this.uiService.getUnit(
          quantity,
          fileLength,
          base,
          UnitUiBottomComponent
        );
        break;
      case 'UnitUITopComponent':
        adUnit = this.uiService.getUnit(
          quantity,
          fileLength,
          base,
          UnitUITopComponent
        );

        break;
    }
    const viewContainerRef = this.appUnit.viewContainerRef;
    const componentRef = viewContainerRef.createComponent(adUnit!.component);
    componentRef.instance.myBounds = this.div?.nativeElement;
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
