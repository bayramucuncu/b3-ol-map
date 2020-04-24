import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileWmsComponent } from './tile-wms.component';

describe('TileWmsComponent', () => {
  let component: TileWmsComponent;
  let fixture: ComponentFixture<TileWmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TileWmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileWmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
