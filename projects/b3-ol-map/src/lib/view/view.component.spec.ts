import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewComponent } from './view.component';
import { MapComponent } from '../b3-ol-map.component';
import { ElementRef } from '@angular/core';

export class MockElementRef extends ElementRef {
  constructor() { super(null); }
  element: { nativeElement: { firstElementChild: {} } };
}

export class MockMap {
  map: any = {
     setView() {

    }
  }
}

describe('ViewComponent', () => {
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewComponent ],
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
    fixture = TestBed.createComponent(ViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});