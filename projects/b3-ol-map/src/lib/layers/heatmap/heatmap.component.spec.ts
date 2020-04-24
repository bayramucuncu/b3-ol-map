import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatmapComponent } from './heatmap.component';
import { MapComponent } from '../../b3-ol-map.component';
import { ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Map } from 'ol';

export class MockElementRef extends ElementRef {
  constructor() { super(null); }
  element: { nativeElement: { firstElementChild: {} } };
}

export class MockMap extends Map {
  map: any = {
    getLayers() : any[] {
      return [];
    }
  }
}

describe('LayerHeatmapComponent', () => {
  let component: HeatmapComponent;
  let fixture: ComponentFixture<HeatmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeatmapComponent, MapComponent ],
      providers: [ 
        {
          provide: MapComponent,
          useClass: MockMap
        },

        {
          provide: ElementRef,
          useClass: MockElementRef
        }
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
