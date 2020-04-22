import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerTileComponent } from './layer-tile.component';

describe('LayerTileComponent', () => {
  let component: LayerTileComponent;
  let fixture: ComponentFixture<LayerTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayerTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
