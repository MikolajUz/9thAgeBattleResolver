import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { UIService } from '../services/ui.service';

@Component({
  selector: 'app-unit-ui',
  templateUrl: './unit-ui.component.html',
  styleUrls: ['./unit-ui.component.scss'],
})
export class UnitUIComponent {
  onDrop($event: any) {
    console.log($event.target);
    //console.log($event.target.style.transform);
  }

  myBounds!: HTMLElement;
  data = this.uiService.unitData;

  constructor(private uiService: UIService) {}

  @HostBinding('style.--unitRFWidthScss')
  unitRFWidthScss = `${this.data.unitRFWidth}px`;
  @HostBinding('style.--unitRFHeightScss')
  unitRFHeightScss = `${this.data.unitRFHeight}px`;
  @HostBinding('style.--unitWidthScss')
  unitWidthScss = `${this.data.unitWidth}px`;
  @HostBinding('style.--unitHeightScss')
  unitHeightScss = `${this.data.unitHeight}px`;
}
