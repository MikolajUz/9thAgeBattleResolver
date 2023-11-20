import { Component, Input, OnInit } from '@angular/core';
import { unitUI } from 'src/app/players/interfaces/unit-ui.interface';
import { Observable } from 'rxjs';
import { FacadeService } from 'src/app/facade/facade.service';

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

  constructor(private facade: FacadeService) {}
  ngOnInit(): void {
    this.data = this.facade.getUnitUIdata(this.playerIndex, 0, this.unitID);
    this.playerIndex
      ? (this.orientation = 'bottom')
      : (this.orientation = 'top');
  }
}
