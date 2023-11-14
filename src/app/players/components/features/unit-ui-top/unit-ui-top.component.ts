import { Component } from '@angular/core';
import { UIService } from 'src/app/players/services/ui.service';
import { Store } from '@ngrx/store';
import { RoosterStoreSelectors } from 'src/app/players/current-rooster-store/current-rooster.index';

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

  ID = this.uiService.ID;
  myBounds!: HTMLElement;
  data = this.store.select(RoosterStoreSelectors.selectUnitUIDataPlr1(this.ID));

  constructor(private uiService: UIService, private store: Store) {}
}
