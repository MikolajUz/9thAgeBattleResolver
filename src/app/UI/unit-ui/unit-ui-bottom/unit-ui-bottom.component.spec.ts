import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitUiBottomComponent } from './unit-ui-bottom.component';

describe('UnitUiBottomComponent', () => {
  let component: UnitUiBottomComponent;
  let fixture: ComponentFixture<UnitUiBottomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnitUiBottomComponent]
    });
    fixture = TestBed.createComponent(UnitUiBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
