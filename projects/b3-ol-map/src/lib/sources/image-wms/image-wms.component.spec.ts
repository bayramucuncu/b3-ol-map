import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageWmsComponent } from './image-wms.component';

describe('ImageWmsComponent', () => {
  let component: ImageWmsComponent;
  let fixture: ComponentFixture<ImageWmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageWmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageWmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
