import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardVendaComponent } from './card-venda.component';

describe('CardVendaComponent', () => {
  let component: CardVendaComponent;
  let fixture: ComponentFixture<CardVendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardVendaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
