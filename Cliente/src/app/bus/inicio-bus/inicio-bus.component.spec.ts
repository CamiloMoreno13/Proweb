import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioBusComponent } from './inicio-bus.component';

describe('InicioBusComponent', () => {
  let component: InicioBusComponent;
  let fixture: ComponentFixture<InicioBusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioBusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
