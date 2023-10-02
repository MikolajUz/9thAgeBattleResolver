import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmylistComponent } from './armylist.component';

describe('ArmylistComponent', () => {
  let component: ArmylistComponent;
  let fixture: ComponentFixture<ArmylistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArmylistComponent]
    });
    fixture = TestBed.createComponent(ArmylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
