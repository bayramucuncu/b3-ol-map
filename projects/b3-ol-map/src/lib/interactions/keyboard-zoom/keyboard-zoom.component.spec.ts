import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardZoomComponent } from './keyboard-zoom.component';

describe('KeyboardZoomComponent', () => {
  let component: KeyboardZoomComponent;
  let fixture: ComponentFixture<KeyboardZoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyboardZoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyboardZoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
