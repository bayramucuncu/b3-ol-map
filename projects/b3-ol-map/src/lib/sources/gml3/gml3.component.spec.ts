import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gml3Component } from './gml3.component';

describe('Gml3Component', () => {
  let component: Gml3Component;
  let fixture: ComponentFixture<Gml3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gml3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gml3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
