import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpxComponent } from './gpx.component';

describe('GpxComponent', () => {
  let component: GpxComponent;
  let fixture: ComponentFixture<GpxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
