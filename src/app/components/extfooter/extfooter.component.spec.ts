import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtfooterComponent } from './extfooter.component';

describe('ExtfooterComponent', () => {
  let component: ExtfooterComponent;
  let fixture: ComponentFixture<ExtfooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtfooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
