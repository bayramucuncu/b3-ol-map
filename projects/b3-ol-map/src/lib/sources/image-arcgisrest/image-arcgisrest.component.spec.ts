import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageArcgisrestComponent } from './image-arcgisrest.component';

describe('ImageArcgisrestComponent', () => {
  let component: ImageArcgisrestComponent;
  let fixture: ComponentFixture<ImageArcgisrestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageArcgisrestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageArcgisrestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
