import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureInfoWidgetContainerComponent } from './feature-info-widget-container.component';

describe('FeatureInfoWidgetContainerComponent', () => {
  let component: FeatureInfoWidgetContainerComponent;
  let fixture: ComponentFixture<FeatureInfoWidgetContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureInfoWidgetContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureInfoWidgetContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
