import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { FacadeService } from 'src/app/facade/facade.service';
import { BattleService } from 'src/app/main/services/battle.service';
import { messages } from 'src/app/players/interfaces/messages.interface';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  constructor(private facade: FacadeService, private battle: BattleService) {}
 
 
  ngOnInit(): void {
    this.messages=this.facade.getMessages()
  }

  messages!:Observable<messages>

  ngOnChanges(changes: SimpleChanges): void {
    this.messages=this.facade.getMessages()
  }

startSkirmish() {
  this.facade.runAllSkirmishes();
 
}
resolveHit(){
  this.facade.resolveHit()
}
 

}
