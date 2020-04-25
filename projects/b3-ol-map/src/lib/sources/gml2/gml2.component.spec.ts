import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gml2Component } from './gml2.component';

describe('Gml2Component', () => {
  let component: Gml2Component;
  let fixture: ComponentFixture<Gml2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gml2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gml2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
