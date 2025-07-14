import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TratamientosComponent } from './tratamientos.component';

describe('TratamientosComponent', () => {
  let component: TratamientosComponent;
  let fixture: ComponentFixture<TratamientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TratamientosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TratamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
