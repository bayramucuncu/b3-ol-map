import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileArcgisRestComponent } from './tile-arcgis-rest.component';

describe('TileArcgisRestComponent', () => {
  let component: TileArcgisRestComponent;
  let fixture: ComponentFixture<TileArcgisRestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TileArcgisRestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileArcgisRestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
