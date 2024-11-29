import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncDadosComponent } from './func-dados.component';

describe('FuncDadosComponent', () => {
  let component: FuncDadosComponent;
  let fixture: ComponentFixture<FuncDadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FuncDadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FuncDadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
