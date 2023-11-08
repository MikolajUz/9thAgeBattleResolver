import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { readyUnit } from '../../army/interfaces/rooster.interface';
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
  setFileLength($event: any, unit: readyUnit, player: string) {
    if (player === 'plrOne')
      this.store.dispatch(
        RoosterStoreActions.setFileLengthPlr1({
          ID: unit.ID,
          fileLength: Number($event.target.value),
        })
      );
    if (player === 'plrTwo')
      this.store.dispatch(
        RoosterStoreActions.setFileLengthPlr2({
          ID: unit.ID,
          fileLength: Number($event.target.value),
        })
      );
  }
  pickUnit($event: any, unit: readyUnit, player: string) {
    $event.stopPropagation();
    if (player === 'plrOne')
      this.store.dispatch(
        RoosterStoreActions.createUnitUIPlr1({
          ID: unit.ID,
        })
      );
    if (player === 'plrTwo')
      this.store.dispatch(
        RoosterStoreActions.createUnitUIPlr2({
          quantity: unit.Qty,
          fileLength: unit.fileLength,
          base: unit.base,
          type_: unit.type,
          player: player,
          ID: unit.ID,
        })
      );
  }

  constructor(private store: Store) {}

  selectUnit($event: any, unit: readyUnit, player: string) {
    $event.stopPropagation();
    if (player === 'plrOne')
      this.store.dispatch(RoosterStoreActions.selectUnitPlr1({ ID: unit.ID }));
    if (player === 'plrTwo')
      this.store.dispatch(RoosterStoreActions.selectUnitPlr2({ ID: unit.ID }));
  }

  dataSourcePlr1: Observable<(readyUnit | undefined)[]> = this.store.select(
    RoosterStoreSelectors.selectCurrentRoosterStatePlr1
  );

  dataSourcePlr2: Observable<(readyUnit | undefined)[]> = this.store.select(
    RoosterStoreSelectors.selectCurrentRoosterStatePlr2
  );

  Plr1 = 'Plr1';
  Plr2 = 'Plr2';

  columnsToDisplay = ['Name', 'Qty', 'Wds', 'Pts'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand', 'pick'];
  expandedUnit: readyUnit | undefined;

  changeStat(unit: any, action: string) {
    switch (action) {
      case 'Increase quantity Player One':
        this.store.dispatch(
          RoosterStoreActions.increaseQuantityPlr1({ ID: unit.ID })
        );

        break;
      case 'Decrease quantity Player One':
        this.store.dispatch(
          RoosterStoreActions.decreaseQuantityPlr1({ ID: unit.ID })
        );
        break;
      case 'Add wounds Player One':
        this.store.dispatch(RoosterStoreActions.addWoundPlr1({ ID: unit.ID }));
        break;
      case 'Remove wounds Player One':
        this.store.dispatch(
          RoosterStoreActions.removeWoundPlr1({ ID: unit.ID })
        );
        break;
      ////////////
      case 'Increase quantity Player Two':
        this.store.dispatch(
          RoosterStoreActions.increaseQuantityPlr2({ ID: unit.ID })
        );
        break;
      case 'Decrease quantity Player Two':
        this.store.dispatch(
          RoosterStoreActions.decreaseQuantityPlr2({ ID: unit.ID })
        );
        break;
      case 'Add wounds Player Two':
        this.store.dispatch(RoosterStoreActions.addWoundPlr2({ ID: unit.ID }));
        break;
      case 'Remove wounds Player Two':
        this.store.dispatch(
          RoosterStoreActions.removeWoundPlr2({ ID: unit.ID })
        );
        break;
      case 'Delete unit of player one':
        this.store.dispatch(
          RoosterStoreActions.requestDeleteUnitPlr1({ ID: unit.ID })
        );
        break;
      case 'Delete unit of player two':
        this.store.dispatch(
          RoosterStoreActions.deleteUnitPlr2({ ID: unit.ID })
        );
        break;
      default:
        console.log('Error button stat changer');
    }
  }
}
