import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileWmtsComponent } from './tile-wmts.component';

describe('TileWmtsComponent', () => {
  let component: TileWmtsComponent;
  let fixture: ComponentFixture<TileWmtsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TileWmtsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileWmtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
