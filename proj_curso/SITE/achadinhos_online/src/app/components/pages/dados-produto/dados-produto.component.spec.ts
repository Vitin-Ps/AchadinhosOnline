import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosProdutoComponent } from './dados-produto.component';

describe('DadosProdutoComponent', () => {
  let component: DadosProdutoComponent;
  let fixture: ComponentFixture<DadosProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DadosProdutoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadosProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
