import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './b3-ol-map.component';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { ElementRef } from '@angular/core';

export class MockElementRef extends ElementRef {
  constructor() { super(null); }
  element: { nativeElement: { firstElementChild: {} } };
}

describe('B3OlMapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  const activatedRouteStub = {
    queryParams: {
      subscribe() {
        return from([{ lon: 1, lat: 2 }]);
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MapComponent],
      imports: [RouterModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteStub
        }, 
        {
          provide: ElementRef, 
          useClass: MockElementRef
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
