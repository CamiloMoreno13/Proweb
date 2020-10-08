import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioRutaComponent } from './inicio-ruta.component';

describe('InicioRutaComponent', () => {
  let component: InicioRutaComponent;
  let fixture: ComponentFixture<InicioRutaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioRutaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioRutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
