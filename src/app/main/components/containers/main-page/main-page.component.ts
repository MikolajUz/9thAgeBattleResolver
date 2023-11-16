import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Unit } from 'src/app/army/interfaces/unit.interface';
import {
  RoosterStoreActions,
  RoosterStoreSelectors,
} from 'src/app/players/rooster-store/rooster.index';
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
  setFileLength($event: any, unit: Unit, playerIndex: number) {
    this.store.dispatch(
      RoosterStoreActions.setFileLength({
        ID: unit.ID,
        fileLength: Number($event.target.value),
        playerIndex: playerIndex,
        roosterIndex: 0,
      })
    );
  }
  pickUnit($event: any, unit: Unit, playerIndex: number) {
    $event.stopPropagation();

    this.store.dispatch(
      RoosterStoreActions.createUnitUI({
        ID: unit.ID,
        playerIndex: playerIndex,
        roosterIndex: 0,
      })
    );
  }

  constructor(private store: Store) {}

  selectUnit($event: any, unit: Unit, player: number) {
    $event.stopPropagation();
    if (player === 0)
      this.store.dispatch(
        RoosterStoreActions.selectUnit({
          ID: unit.ID,
          playerIndex: 0,
          roosterIndex: 0,
        })
      );
    if (player === 1)
      this.store.dispatch(
        RoosterStoreActions.selectUnit({
          ID: unit.ID,
          playerIndex: 1,
          roosterIndex: 0,
        })
      );
  }

  dataSourcePlr1: Observable<(Unit | undefined)[]> = this.store.select(
    RoosterStoreSelectors.selectRooster(0, 0)
  );

  dataSourcePlr2: Observable<(Unit | undefined)[]> = this.store.select(
    RoosterStoreSelectors.selectRooster(1, 0)
  );

  Plr1 = 'Plr1';
  Plr2 = 'Plr2';

  columnsToDisplay = ['name', 'Qty', 'Wds', 'Pts'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand', 'pick'];
  expandedUnit: Unit | undefined;

  changeStat(unit: any, action: string) {
    switch (action) {
      case 'Increase quantity Player One':
        this.store.dispatch(
          RoosterStoreActions.increaseQuantity({
            ID: unit.ID,
            playerIndex: 0,
            roosterIndex: 0,
          })
        );

        break;
      case 'Decrease quantity Player One':
        this.store.dispatch(
          RoosterStoreActions.decreaseQuantity({
            ID: unit.ID,
            playerIndex: 0,
            roosterIndex: 0,
          })
        );
        break;
      case 'Add wounds Player One':
        this.store.dispatch(
          RoosterStoreActions.addWound({
            ID: unit.ID,
            playerIndex: 0,
            roosterIndex: 0,
          })
        );
        break;
      case 'Remove wounds Player One':
        this.store.dispatch(
          RoosterStoreActions.removeWound({
            ID: unit.ID,
            playerIndex: 0,
            roosterIndex: 0,
          })
        );
        break;
      ////////////
      case 'Increase quantity Player Two':
        this.store.dispatch(
          RoosterStoreActions.increaseQuantity({
            ID: unit.ID,
            playerIndex: 1,
            roosterIndex: 0,
          })
        );
        break;
      case 'Decrease quantity Player Two':
        this.store.dispatch(
          RoosterStoreActions.decreaseQuantity({
            ID: unit.ID,
            playerIndex: 1,
            roosterIndex: 0,
          })
        );
        break;
      case 'Add wounds Player Two':
        this.store.dispatch(
          RoosterStoreActions.addWound({
            ID: unit.ID,
            playerIndex: 1,
            roosterIndex: 0,
          })
        );
        break;
      case 'Remove wounds Player Two':
        this.store.dispatch(
          RoosterStoreActions.removeWound({
            ID: unit.ID,
            playerIndex: 1,
            roosterIndex: 0,
          })
        );
        break;
      case 'Delete unit of player one':
        this.store.dispatch(
          RoosterStoreActions.deleteUnit({
            ID: unit.ID,
            playerIndex: 0,
            roosterIndex: 0,
          })
        );

        break;
      case 'Delete unit of player two':
        this.store.dispatch(
          RoosterStoreActions.deleteUnit({
            ID: unit.ID,
            playerIndex: 1,
            roosterIndex: 0,
          })
        );
        break;
      default:
        console.log('Error button stat changer');
    }
  }
}
