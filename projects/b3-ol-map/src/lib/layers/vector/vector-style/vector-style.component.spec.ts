import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VectorStyleComponent } from './vector-style.component';

describe('VectorStyleComponent', () => {
  let component: VectorStyleComponent;
  let fixture: ComponentFixture<VectorStyleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VectorStyleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VectorStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
