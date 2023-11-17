import { Component, OnInit } from '@angular/core';
import { ArmyService } from './army/services/army.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private armyService: ArmyService) {}
  ngOnInit(): void {
    this.armyService.init();
  }
  title = '9thAgeBattleResolver';
}
