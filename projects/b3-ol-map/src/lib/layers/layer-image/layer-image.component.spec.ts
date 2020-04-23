import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerImageComponent } from './layer-image.component';
import { MapComponent } from '../../b3-ol-map.component';
import { ElementRef } from '@angular/core';
import { from } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

export class MockElementRef extends ElementRef {
  constructor() { super(null); }
  element: { nativeElement: { firstElementChild: {} } };
}

export class MockMap {
  map: any = {
    getLayers() {
      return [];
    }
  }
}

describe('LayerImageComponent', () => {
  let component: LayerImageComponent;
  let fixture: ComponentFixture<LayerImageComponent>;

  const activatedRouteStub = {
    queryParams: {
      subscribe() {
        return from([{ lon: 1, lat: 2 }]);
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LayerImageComponent, MapComponent],
      providers: [
        {
          provide: MapComponent,
          useClass: MockMap
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteStub
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
    fixture = TestBed.createComponent(LayerImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
