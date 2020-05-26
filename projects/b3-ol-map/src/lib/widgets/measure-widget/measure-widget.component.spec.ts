import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasureWidgetComponent } from './measure-widget.component';

describe('MeasureWidgetComponent', () => {
  let component: MeasureWidgetComponent;
  let fixture: ComponentFixture<MeasureWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasureWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasureWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
