import {
  AfterContentInit,
  Component,
  HostBinding,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { UIService } from '../../services/ui.service';
import { Store } from '@ngrx/store';
import { RoosterStoreSelectors } from 'src/app/root-store/current-rooster-store/current-rooster.index';

@Component({
  selector: 'app-unit-ui-top',
  templateUrl: './unit-ui-top.component.html',
  styleUrls: ['./unit-ui-top.component.scss'],
})
export class UnitUITopComponent  {
  onDrop($event: any) {
    console.log($event.target);
    //console.log($event.target.style.transform);
  }

  ID = this.uiService.ID;
  myBounds!: HTMLElement;
  data2 = this.uiService.unitData;
  data = this.store.select(RoosterStoreSelectors.selectUnitUIDataPlr1(this.ID));
  unitRFWidth!: number;
  unitRFHeight!: number;
  unitWidth!: number;
  unitHeight!: number;
  player!: string;
  gridUnit!: number;
  unitFileGrids!: number[];
  unitRankGrids!: number[];
  fileYPlaces!: number[];
  rankXPlaces!: number[];
  RaFRest!: number[];

  constructor(private uiService: UIService, private store: Store) {
    this.unitRFWidth = this.data2.unitRFWidth;
    this.data.subscribe((unitUI) => {
      if (unitUI !== undefined) {
        this.unitFileGrids = unitUI.unitFileGrids;
        this.unitRankGrids = unitUI.unitRankGrids;
        this.fileYPlaces = unitUI.fileYPlaces;
        this.rankXPlaces = unitUI.rankXPlaces;
        this.RaFRest = unitUI.RaFRest;

        this.gridUnit = unitUI.gridUnit;
        this.unitRFWidth = unitUI.unitRFWidth;
        this.unitRFHeight = unitUI.unitRFHeight;
        this.unitWidth = unitUI.unitWidth;
        this.unitHeight = unitUI.unitHeight;
        this.player = unitUI.player;
      }
    });

    this.data.subscribe((e) => console.log(e));
  }

 

  @HostBinding('style.--unitRFWidthScss')
  unitRFWidthScss = `${this.data2.unitRFWidth}px`;
  @HostBinding('style.--unitRFHeightScss')
  unitRFHeightScss = `${this.data2.unitRFHeight}px`;
  @HostBinding('style.--unitWidthScss')
  unitWidthScss = `${this.data2.unitWidth}px`;
  @HostBinding('style.--unitHeightScss')
  unitHeightScss = `${this.data2.unitHeight}px`;
  @HostBinding('style.--unitColorScss')
  unitColorScss = this.data2.player;
}
