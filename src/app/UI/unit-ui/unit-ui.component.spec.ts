import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitUIComponent } from './unit-ui.component';

describe('UnitUIComponent', () => {
  let component: UnitUIComponent;
  let fixture: ComponentFixture<UnitUIComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnitUIComponent]
    });
    fixture = TestBed.createComponent(UnitUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
