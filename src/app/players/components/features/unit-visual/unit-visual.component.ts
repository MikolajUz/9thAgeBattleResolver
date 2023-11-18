import { Component, Input, OnInit } from '@angular/core';
import { VisualsService } from 'src/app/players/services/visuals.service';
import { Store } from '@ngrx/store';
import { RoosterStoreSelectors } from 'src/app/players/rooster-store/rooster.index';
import { unitUI } from 'src/app/players/interfaces/unit-ui.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-unit-visual',
  templateUrl: './unit-visual.component.html',
  styleUrls: ['./unit-visual.component.scss'],
})
export class UnitVisualComponent implements OnInit {
  onDrop($event: any) {
    console.log($event.target);
    //console.log($event.target.style.transform);
    console.log(this.orientation);
  }
  @Input() playerIndex!: number;
  @Input() unitID!: number;
  myBounds!: HTMLElement;
  data!: Observable<unitUI | undefined>;
  orientation!: 'top' | 'bottom';

  constructor(private visualsService: VisualsService, private store: Store) {}
  ngOnInit(): void {
    this.data = this.store.select(
      RoosterStoreSelectors.selectUnitUIData(this.playerIndex, 0, this.unitID)
    );
    this.playerIndex
      ? (this.orientation = 'bottom')
      : (this.orientation = 'top');
  }
}
