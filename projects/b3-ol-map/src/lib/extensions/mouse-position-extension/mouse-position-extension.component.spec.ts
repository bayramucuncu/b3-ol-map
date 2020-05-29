import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MousePositionExtensionComponent } from './mouse-position-extension.component';

describe('MousePositionExtensionComponent', () => {
  let component: MousePositionExtensionComponent;
  let fixture: ComponentFixture<MousePositionExtensionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MousePositionExtensionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MousePositionExtensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
