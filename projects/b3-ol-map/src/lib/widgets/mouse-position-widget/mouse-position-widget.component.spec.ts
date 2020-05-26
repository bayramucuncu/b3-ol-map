import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MousePositionWidgetComponent } from './mouse-position-widget.component';

describe('MousePositionWidgetComponent', () => {
  let component: MousePositionWidgetComponent;
  let fixture: ComponentFixture<MousePositionWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MousePositionWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MousePositionWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
