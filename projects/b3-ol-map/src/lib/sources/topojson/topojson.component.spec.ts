import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopojsonComponent } from './topojson.component';

describe('TopojsonComponent', () => {
  let component: TopojsonComponent;
  let fixture: ComponentFixture<TopojsonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopojsonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopojsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
