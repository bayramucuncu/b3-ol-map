import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerGroupComponent } from './group.component';
import { MapComponent } from '../../b3-ol-map.component';
import { ElementRef } from '@angular/core';

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

describe('LayerGroupComponent', () => {
  let component: LayerGroupComponent;
  let fixture: ComponentFixture<LayerGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayerGroupComponent, MapComponent ],
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
    fixture = TestBed.createComponent(LayerGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
