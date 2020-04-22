import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerImageComponent } from './layer-image.component';

describe('LayerImageComponent', () => {
  let component: LayerImageComponent;
  let fixture: ComponentFixture<LayerImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayerImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
