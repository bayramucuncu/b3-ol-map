import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomSliderComponent } from './zoom-slider.component';

describe('ZoomSliderComponent', () => {
  let component: ZoomSliderComponent;
  let fixture: ComponentFixture<ZoomSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoomSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
