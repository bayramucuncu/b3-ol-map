import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WfsComponent } from './wfs.component';

describe('WfsComponent', () => {
  let component: WfsComponent;
  let fixture: ComponentFixture<WfsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WfsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WfsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
