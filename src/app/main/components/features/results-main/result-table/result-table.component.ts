import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { FacadeService } from 'src/app/facade/facade.service';
import { skirmishScore } from 'src/app/main/interfaces/skirmishScore.interface';

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss'],
})
export class ResultTableComponent {
  constructor(private facade: FacadeService) {}
  @Input() player!: number;

  columns = [
    'Name',
    'Wounds',
    'Standard',
    'RankBonus',
    'PositionBonus',
    'Charge',
    'Other',
  ];

  scores$!: Observable<skirmishScore[]>;

  ngOnInit(): void {
    this.scores$ = this.facade.getPlayerScore$(this.player);
  }
}
