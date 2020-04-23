import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinchRotateComponent } from './pinch-rotate.component';

describe('PinchRotateComponent', () => {
  let component: PinchRotateComponent;
  let fixture: ComponentFixture<PinchRotateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinchRotateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinchRotateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
