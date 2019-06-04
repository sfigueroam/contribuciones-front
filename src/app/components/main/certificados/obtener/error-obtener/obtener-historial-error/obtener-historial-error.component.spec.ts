import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObtenerHistorialErrorComponent } from './obtener-historial-error.component';

describe('ObtenerHistorialErrorComponent', () => {
  let component: ObtenerHistorialErrorComponent;
  let fixture: ComponentFixture<ObtenerHistorialErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObtenerHistorialErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObtenerHistorialErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
