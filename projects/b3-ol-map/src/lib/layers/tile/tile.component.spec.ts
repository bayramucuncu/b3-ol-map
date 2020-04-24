import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerTileComponent } from './tile.component';
import { MapComponent } from '../../b3-ol-map.component';
import { ElementRef } from '@angular/core';

export class MockElementRef extends ElementRef {
  constructor() { super(null); }
  element: { nativeElement: { firstElementChild: {} } };
}


describe('LayerTileComponent', () => {
  let component: LayerTileComponent;
  let fixture: ComponentFixture<LayerTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LayerTileComponent, MapComponent],
      providers: [
        {
          provide: MapComponent
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
    fixture = TestBed.createComponent(LayerTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
