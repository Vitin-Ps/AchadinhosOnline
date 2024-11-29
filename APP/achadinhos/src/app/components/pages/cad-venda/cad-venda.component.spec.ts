import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadVendaComponent } from './cad-venda.component';

describe('CadVendaComponent', () => {
  let component: CadVendaComponent;
  let fixture: ComponentFixture<CadVendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadVendaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
