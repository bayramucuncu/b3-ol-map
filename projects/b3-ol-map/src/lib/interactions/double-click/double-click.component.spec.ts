import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubleClickComponent } from './double-click.component';

describe('DoubleClickComponent', () => {
  let component: DoubleClickComponent;
  let fixture: ComponentFixture<DoubleClickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoubleClickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoubleClickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
