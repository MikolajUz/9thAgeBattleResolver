import { Component, OnInit } from '@angular/core';
import { FacadeService } from './facade/facade.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private facade: FacadeService) {}
  ngOnInit(): void {
    this.facade.init();
  }
  title = '9thAgeBattleResolver';
}
