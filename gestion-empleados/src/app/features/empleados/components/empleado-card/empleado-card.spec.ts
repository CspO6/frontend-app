import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoCardComponent } from '../empleado-card/empleado-card';

describe('EmpleadoCard', () => {
  let component: EmpleadoCardComponent;
  let fixture: ComponentFixture<EmpleadoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadoCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
