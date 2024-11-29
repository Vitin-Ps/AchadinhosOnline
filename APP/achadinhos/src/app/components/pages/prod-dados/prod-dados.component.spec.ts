import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdDadosComponent } from './prod-dados.component';

describe('ProdDadosComponent', () => {
  let component: ProdDadosComponent;
  let fixture: ComponentFixture<ProdDadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProdDadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProdDadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
