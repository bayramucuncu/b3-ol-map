import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalrComponent } from './signalr.component';

describe('SignalrComponent', () => {
  let component: SignalrComponent;
  let fixture: ComponentFixture<SignalrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignalrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignalrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
