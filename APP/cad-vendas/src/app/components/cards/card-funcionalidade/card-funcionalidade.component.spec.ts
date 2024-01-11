import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFuncionalidadeComponent } from './card-funcionalidade.component';

describe('CardFuncionalidadeComponent', () => {
  let component: CardFuncionalidadeComponent;
  let fixture: ComponentFixture<CardFuncionalidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardFuncionalidadeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardFuncionalidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
