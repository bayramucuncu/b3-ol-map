import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageStaticComponent } from './image-static.component';

describe('ImageStaticComponent', () => {
  let component: ImageStaticComponent;
  let fixture: ComponentFixture<ImageStaticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageStaticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
