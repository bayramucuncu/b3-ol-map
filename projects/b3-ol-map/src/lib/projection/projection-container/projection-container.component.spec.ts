import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionContainerComponent } from './projection-container.component';

describe('ProjectionContainerComponent', () => {
  let component: ProjectionContainerComponent;
  let fixture: ComponentFixture<ProjectionContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectionContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
