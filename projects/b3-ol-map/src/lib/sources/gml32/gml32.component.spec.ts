import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gml32Component } from './gml32.component';

describe('Gml32Component', () => {
  let component: Gml32Component;
  let fixture: ComponentFixture<Gml32Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gml32Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gml32Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
