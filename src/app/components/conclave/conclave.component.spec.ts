import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConclaveComponent } from './conclave.component';

describe('ConclaveComponent', () => {
  let component: ConclaveComponent;
  let fixture: ComponentFixture<ConclaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConclaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConclaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
