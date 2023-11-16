import { Component } from '@angular/core';
import { VisualsService } from 'src/app/players/services/visuals.service';
import { Store } from '@ngrx/store';
import { RoosterStoreSelectors } from 'src/app/players/rooster-store/rooster.index';

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

  ID = this.visualsService.ID;
  myBounds!: HTMLElement;
  data = this.store.select(
    RoosterStoreSelectors.selectUnitUIData(0, 0, this.ID)
  );

  constructor(private visualsService: VisualsService, private store: Store) {}
}
