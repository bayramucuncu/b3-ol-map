import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataInsertExtensionComponent } from './data-insert-extension.component';

describe('DataInsertExtensionComponent', () => {
  let component: DataInsertExtensionComponent;
  let fixture: ComponentFixture<DataInsertExtensionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataInsertExtensionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataInsertExtensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
