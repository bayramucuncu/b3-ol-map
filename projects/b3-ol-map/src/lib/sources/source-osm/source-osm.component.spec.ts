import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceOsmComponent } from './source-osm.component';

describe('SourceOsmComponent', () => {
  let component: SourceOsmComponent;
  let fixture: ComponentFixture<SourceOsmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceOsmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceOsmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
