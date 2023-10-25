import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitUITopComponent } from './unit-ui-top.component';

describe('UnitUIComponent', () => {
  let component: UnitUITopComponent;
  let fixture: ComponentFixture<UnitUITopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnitUITopComponent],
    });
    fixture = TestBed.createComponent(UnitUITopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
