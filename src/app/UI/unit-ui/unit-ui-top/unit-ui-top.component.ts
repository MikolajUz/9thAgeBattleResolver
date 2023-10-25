import { Component, HostBinding } from '@angular/core';
import { UIService } from '../../services/ui.service';

@Component({
  selector: 'app-unit-ui-top',
  templateUrl: './unit-ui-top.component.html',
  styleUrls: ['./unit-ui-top.component.scss'],
})
export class UnitUITopComponent {
  onDrop($event: any) {
    console.log($event.target);
    //console.log($event.target.style.transform);
  }

  myBounds!: HTMLElement;
  data = this.uiService.unitData;
  constructor(private uiService: UIService) {
    console.log(this.unitColorScss);
  }

  @HostBinding('style.--unitRFWidthScss')
  unitRFWidthScss = `${this.data.unitRFWidth}px`;
  @HostBinding('style.--unitRFHeightScss')
  unitRFHeightScss = `${this.data.unitRFHeight}px`;
  @HostBinding('style.--unitWidthScss')
  unitWidthScss = `${this.data.unitWidth}px`;
  @HostBinding('style.--unitHeightScss')
  unitHeightScss = `${this.data.unitHeight}px`;
  @HostBinding('style.--unitColorScss')
  unitColorScss = this.data.player;
}
