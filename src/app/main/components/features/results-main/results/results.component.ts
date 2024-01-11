import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BattleService } from 'src/app/main/services/battle.service';
import { messages } from 'src/app/rooster/interfaces/messages.interface';
import { MainFacade } from 'src/app/main/main.facade';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  constructor(private mainFacade: MainFacade) {}

  ngOnInit(): void {
    this.messages = this.mainFacade.getMessages();
  }

  messages!: Observable<messages>;

  ngOnChanges(changes: SimpleChanges): void {
    this.messages = this.mainFacade.getMessages();
  }

  startSkirmish() {
    this.mainFacade.runAllSkirmishes();
  }
  resolveHit() {
    this.mainFacade.resolveHit();
  }
}
