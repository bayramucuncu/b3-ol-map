import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureInfoWidgetComponent } from './feature-info-widget.component';

describe('FeatureInfoWidgetComponent', () => {
  let component: FeatureInfoWidgetComponent;
  let fixture: ComponentFixture<FeatureInfoWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureInfoWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureInfoWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
