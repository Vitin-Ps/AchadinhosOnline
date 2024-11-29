import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardItemCarrinhoComponent } from './card-item-carrinho.component';

describe('CardItemCarrinhoComponent', () => {
  let component: CardItemCarrinhoComponent;
  let fixture: ComponentFixture<CardItemCarrinhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardItemCarrinhoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardItemCarrinhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
