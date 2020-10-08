import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConductorComponent } from './edit-conductor.component';

describe('EditConductorComponent', () => {
  let component: EditConductorComponent;
  let fixture: ComponentFixture<EditConductorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditConductorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditConductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
