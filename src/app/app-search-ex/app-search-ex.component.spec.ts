import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSearchExComponent } from './app-search-ex.component';

describe('AppSearchExComponent', () => {
  let component: AppSearchExComponent;
  let fixture: ComponentFixture<AppSearchExComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppSearchExComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSearchExComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
