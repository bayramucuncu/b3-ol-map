import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MouseWheelZoomComponent } from './mouse-wheel-zoom.component';

describe('MouseWheelZoomComponent', () => {
  let component: MouseWheelZoomComponent;
  let fixture: ComponentFixture<MouseWheelZoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MouseWheelZoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MouseWheelZoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
