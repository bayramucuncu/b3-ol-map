import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasureExtensionComponent } from './measure-extension.component';

describe('MeasureExtensionComponent', () => {
  let component: MeasureExtensionComponent;
  let fixture: ComponentFixture<MeasureExtensionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasureExtensionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasureExtensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
