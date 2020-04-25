import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsrijsonComponent } from './esrijson.component';

describe('EsrijsonComponent', () => {
  let component: EsrijsonComponent;
  let fixture: ComponentFixture<EsrijsonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsrijsonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsrijsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
