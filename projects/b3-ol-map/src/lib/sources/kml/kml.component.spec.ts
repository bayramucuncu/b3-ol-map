import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KmlComponent } from './kml.component';

describe('KmlComponent', () => {
  let component: KmlComponent;
  let fixture: ComponentFixture<KmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
