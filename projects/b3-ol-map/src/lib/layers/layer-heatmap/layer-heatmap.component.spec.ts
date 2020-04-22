import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerHeatmapComponent } from './layer-heatmap.component';

describe('LayerHeatmapComponent', () => {
  let component: LayerHeatmapComponent;
  let fixture: ComponentFixture<LayerHeatmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayerHeatmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
