import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManipulacaoDivComponent } from './manipulacao-div.component';

describe('ManipulacaoDivComponent', () => {
  let component: ManipulacaoDivComponent;
  let fixture: ComponentFixture<ManipulacaoDivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManipulacaoDivComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManipulacaoDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
