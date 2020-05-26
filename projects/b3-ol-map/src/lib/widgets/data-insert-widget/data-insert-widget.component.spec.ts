import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataInsertWidgetComponent } from './data-insert-widget.component';

describe('DataInsertWidgetComponent', () => {
  let component: DataInsertWidgetComponent;
  let fixture: ComponentFixture<DataInsertWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataInsertWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataInsertWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
