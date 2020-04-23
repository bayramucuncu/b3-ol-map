import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragZoomComponent } from './drag-zoom.component';

describe('DragZoomComponent', () => {
  let component: DragZoomComponent;
  let fixture: ComponentFixture<DragZoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragZoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragZoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
