import { Component } from '@angular/core';
import { UnitUITopComponent } from '../unit-ui-top/unit-ui-top.component';

@Component({
  selector: 'app-unit-ui-bottom',
  templateUrl: './unit-ui-bottom.component.html',
  styleUrls: ['../unit-ui-top.component.scss'],
})
export class UnitUiBottomComponent extends UnitUITopComponent {}
