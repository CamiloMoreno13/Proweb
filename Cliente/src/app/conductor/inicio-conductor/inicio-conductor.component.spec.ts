import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioConductorComponent } from './inicio-conductor.component';

describe('InicioConductorComponent', () => {
  let component: InicioConductorComponent;
  let fixture: ComponentFixture<InicioConductorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioConductorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioConductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
