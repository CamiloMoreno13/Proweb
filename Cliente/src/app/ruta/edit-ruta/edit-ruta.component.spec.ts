import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRutaComponent } from './edit-ruta.component';

describe('EditRutaComponent', () => {
  let component: EditRutaComponent;
  let fixture: ComponentFixture<EditRutaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRutaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
