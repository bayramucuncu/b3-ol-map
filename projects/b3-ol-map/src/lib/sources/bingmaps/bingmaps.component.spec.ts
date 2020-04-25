import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BingmapsComponent } from './bingmaps.component';

describe('BingmapsComponent', () => {
  let component: BingmapsComponent;
  let fixture: ComponentFixture<BingmapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BingmapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BingmapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
