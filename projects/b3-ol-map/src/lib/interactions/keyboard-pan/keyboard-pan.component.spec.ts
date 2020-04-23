import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardPanComponent } from './keyboard-pan.component';

describe('KeyboardPanComponent', () => {
  let component: KeyboardPanComponent;
  let fixture: ComponentFixture<KeyboardPanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyboardPanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyboardPanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
