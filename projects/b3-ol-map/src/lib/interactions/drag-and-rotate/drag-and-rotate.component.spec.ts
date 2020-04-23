import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragAndRotateComponent } from './drag-and-rotate.component';

describe('DragAndRotateComponent', () => {
  let component: DragAndRotateComponent;
  let fixture: ComponentFixture<DragAndRotateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragAndRotateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragAndRotateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
