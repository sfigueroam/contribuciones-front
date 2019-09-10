import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinclaveComponent } from './sinclave.component';

describe('SinclaveComponent', () => {
  let component: SinclaveComponent;
  let fixture: ComponentFixture<SinclaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinclaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinclaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
