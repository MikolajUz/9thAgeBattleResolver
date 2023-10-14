import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { readyUnit } from '../army/interfaces/rooster.interface';
import {
  RoosterStoreActions,
  RoosterStoreSelectors,
} from 'src/app/root-store/current-rooster-store/current-rooster.index';
import { Observable } from 'rxjs/internal/Observable';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class MainPageComponent {
  dataSourcePlr1: Observable<(readyUnit | undefined)[]> = this.store.select(
    RoosterStoreSelectors.selectCurrentRoosterState
  );

  dataSourcePlr2: Observable<(readyUnit | undefined)[]> = this.store.select(
    RoosterStoreSelectors.selectCurrentRoosterState
  );

  columnsToDisplay = ['name', 'quantity', 'wounds', 'pts'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedUnit: readyUnit | undefined;

  constructor(private store: Store) {}

  changeStat(unit: any, action: string) {
    console.log(action);
  }
}
