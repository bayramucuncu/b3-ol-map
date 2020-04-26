import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomToExtentComponent } from './zoom-to-extent.component';

describe('ZoomToExtentComponent', () => {
  let component: ZoomToExtentComponent;
  let fixture: ComponentFixture<ZoomToExtentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoomToExtentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomToExtentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
