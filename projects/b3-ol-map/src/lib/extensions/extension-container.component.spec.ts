import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtensionContainerComponent } from './extension-container.component';

describe('ExtensionContainerComponent', () => {
  let component: ExtensionContainerComponent;
  let fixture: ComponentFixture<ExtensionContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtensionContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtensionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
