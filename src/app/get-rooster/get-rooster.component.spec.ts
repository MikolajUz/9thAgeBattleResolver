import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetRoosterComponent } from './get-rooster.component';

describe('GetRoosterComponent', () => {
  let component: GetRoosterComponent;
  let fixture: ComponentFixture<GetRoosterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetRoosterComponent]
    });
    fixture = TestBed.createComponent(GetRoosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
