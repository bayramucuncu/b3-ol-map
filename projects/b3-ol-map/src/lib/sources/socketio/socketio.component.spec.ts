import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocketioComponent } from './socketio.component';

describe('SocketioComponent', () => {
  let component: SocketioComponent;
  let fixture: ComponentFixture<SocketioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocketioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocketioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
