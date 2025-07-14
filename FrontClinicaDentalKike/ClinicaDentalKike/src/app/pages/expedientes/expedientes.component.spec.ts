import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedientesComponent } from './expedientes.component';

describe('ExpedientesComponent', () => {
  let component: ExpedientesComponent;
  let fixture: ComponentFixture<ExpedientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpedientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpedientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
