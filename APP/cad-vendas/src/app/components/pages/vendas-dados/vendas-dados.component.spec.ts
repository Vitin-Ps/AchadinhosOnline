import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendasDadosComponent } from './vendas-dados.component';

describe('VendasDadosComponent', () => {
  let component: VendasDadosComponent;
  let fixture: ComponentFixture<VendasDadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendasDadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendasDadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
