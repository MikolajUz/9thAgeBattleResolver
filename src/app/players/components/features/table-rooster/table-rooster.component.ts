import { Component, Input, OnInit } from '@angular/core';
import { Unit } from 'src/app/army/interfaces/unit.interface';

import { Observable } from 'rxjs/internal/Observable';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { FacadeService } from 'src/app/facade/facade.service';

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

  constructor(private facade: FacadeService) {}
  ngOnInit(): void {
    this.Rooster = this.facade.getRooster(this.playerIndex, 0);
  }

  setFileLength($event: any, unitID: number) {
    this.facade.setFileLength(unitID, $event.target.value, this.playerIndex, 0);
  }

  pickUnit(unit: Unit) {
    if (!unit.onBattlefield) {
      this.facade.pickUnit(unit.ID, this.playerIndex, 0);
      this.facade.changeOnBattlefieldProperty(unit.ID, this.playerIndex, 0);
    }
  }

  selectUnit(unitID: number) {
    this.facade.selectUnit(unitID, this.playerIndex, 0);
  }

  changeStat(unitID: number, action: string) {
    switch (action) {
      case 'Increase quantity':
        this.facade.increaseQuantity(unitID, this.playerIndex, 0);
        break;
      case 'Decrease quantity':
        this.facade.decreaseQuantity(unitID, this.playerIndex, 0);
        break;
      case 'Add wound':
        this.facade.addWound(unitID, this.playerIndex, 0);
        break;
      case 'Remove wound':
        this.facade.removeWound(unitID, this.playerIndex, 0);
        break;
      case 'Delete unit':
        this.facade.deleteUnit(unitID, this.playerIndex, 0);
        break;
      default:
        console.log('Error button stat changer');
    }
  }
}
