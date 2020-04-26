import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaleLineComponent } from './scale-line.component';

describe('ScaleLineComponent', () => {
  let component: ScaleLineComponent;
  let fixture: ComponentFixture<ScaleLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScaleLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaleLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
