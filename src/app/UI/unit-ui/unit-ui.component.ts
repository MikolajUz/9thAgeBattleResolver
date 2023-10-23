import { Component, HostBinding, Input } from '@angular/core';
import { UIService } from '../services/ui.service';

@Component({
  selector: 'app-unit-ui',
  templateUrl: './unit-ui.component.html',
  styleUrls: ['./unit-ui.component.scss'],
})
export class UnitUIComponent {
  @Input() myBounds!: HTMLElement;

  onDrop($event: any) {
    console.log($event.target);
    //console.log($event.target.style.transform);
  }
  gridUnit = this.uiService.gridUnit;

  unitFileGrids = this.uiService.unitFileGrids;
  unitRankGrids = this.uiService.unitRankGrids;

  fileYPlaces = this.uiService.fileYPlaces;
  rankXPlaces = this.uiService.rankXPlaces;
  RaFRest = this.uiService.RaFRest;

  unitRFWidth = this.uiService.unitRFWidth;
  unitRFHeight = this.uiService.unitRFHeight;
  unitWidth = this.uiService.unitWidth;
  unitHeight = this.uiService.unitHeight;

  constructor(private uiService: UIService) {}

  @HostBinding('style.--unitRFWidthScss')
  unitRFWidthScss = `${this.unitRFWidth}px`;
  @HostBinding('style.--unitRFHeightScss')
  unitRFHeightScss = `${this.unitRFHeight}px`;
  @HostBinding('style.--unitWidthScss')
  unitWidthScss = `${this.unitWidth}px`;
  @HostBinding('style.--unitHeightScss')
  unitHeightScss = `${this.unitHeight}px`;
}
