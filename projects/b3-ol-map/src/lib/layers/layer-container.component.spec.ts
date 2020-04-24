import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerContainerComponent } from './layer-container.component';

describe('LayerContainerComponent', () => {
  let component: LayerContainerComponent;
  let fixture: ComponentFixture<LayerContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayerContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
