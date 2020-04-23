import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractionContainerComponent } from './interaction-container.component';

describe('InteractionContainerComponent', () => {
  let component: InteractionContainerComponent;
  let fixture: ComponentFixture<InteractionContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteractionContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
