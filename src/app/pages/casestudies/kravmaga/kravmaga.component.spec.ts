import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KravmagaComponent } from './kravmaga.component';

describe('KravmagaComponent', () => {
  let component: KravmagaComponent;
  let fixture: ComponentFixture<KravmagaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KravmagaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KravmagaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
