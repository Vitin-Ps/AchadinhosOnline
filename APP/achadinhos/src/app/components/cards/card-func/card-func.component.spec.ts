import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFuncComponent } from './card-func.component';

describe('CardFuncComponent', () => {
  let component: CardFuncComponent;
  let fixture: ComponentFixture<CardFuncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardFuncComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardFuncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
