import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
  selector: 'app-table-rooster',
  templateUrl: './table-rooster.component.html',
  styleUrls: ['./table-rooster.component.scss'],
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
export class TableRoosterComponent implements OnInit {
  @Input() playerIndex!: number;
  Rooster!: Observable<Unit[]>;
  columnsToDisplay = ['name', 'quantity', 'wounds', 'points'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand', 'pick'];

  columnsDef = [
    {
      key: 'name',
      header: 'Name',
    },
    {
      key: 'quantity',
      header: 'Qty',
    },
    {
      key: 'wounds',
      header: 'Wds',
    },
    {
      key: 'points',
      header: 'Pts',
    },
  ];

  expandedUnit: Unit | undefined;

  constructor(private store: Store) {}
  ngOnInit(): void {
    this.Rooster = this.store.select(
      RoosterStoreSelectors.selectRooster(this.playerIndex, 0)
    );
  }

  setFileLength($event: any, unitID: number) {
    this.store.dispatch(
      RoosterStoreActions.setFileLength({
        unitID: unitID,
        fileLength: Number($event.target.value),
        playerIndex: this.playerIndex,
        roosterIndex: 0,
      })
    );
  }
  pickUnit(unitID: number) {
    this.store.dispatch(
      RoosterStoreActions.createUnitUI({
        unitID: unitID,
        playerIndex: this.playerIndex,
        roosterIndex: 0,
      })
    );
  }

  selectUnit(unitID: number) {
    this.store.dispatch(
      RoosterStoreActions.selectUnit({
        unitID: unitID,
        playerIndex: this.playerIndex,
        roosterIndex: 0,
      })
    );
  }

  changeStat(unitID: number, action: string) {
    switch (action) {
      case 'Increase quantity':
        this.store.dispatch(
          RoosterStoreActions.increaseQuantity({
            unitID: unitID,
            playerIndex: this.playerIndex,
            roosterIndex: 0,
          })
        );

        break;
      case 'Decrease quantity':
        this.store.dispatch(
          RoosterStoreActions.decreaseQuantity({
            unitID: unitID,
            playerIndex: this.playerIndex,
            roosterIndex: 0,
          })
        );
        break;
      case 'Add wound':
        this.store.dispatch(
          RoosterStoreActions.addWound({
            unitID: unitID,
            playerIndex: this.playerIndex,
            roosterIndex: 0,
          })
        );
        break;
      case 'Remove wound':
        this.store.dispatch(
          RoosterStoreActions.removeWound({
            unitID: unitID,
            playerIndex: this.playerIndex,
            roosterIndex: 0,
          })
        );
        break;

      case 'Delete unit':
        this.store.dispatch(
          RoosterStoreActions.deleteUnit({
            unitID: unitID,
            playerIndex: this.playerIndex,
            roosterIndex: 0,
          })
        );

        break;

      default:
        console.log('Error button stat changer');
    }
  }
}
