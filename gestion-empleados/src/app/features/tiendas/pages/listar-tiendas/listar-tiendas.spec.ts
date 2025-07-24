import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTiendasComponent } from './listar-tiendas.component';

describe('ListarTiendas', () => {
  let component: ListarTiendasComponent;
  let fixture: ComponentFixture<ListarTiendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarTiendasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarTiendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
