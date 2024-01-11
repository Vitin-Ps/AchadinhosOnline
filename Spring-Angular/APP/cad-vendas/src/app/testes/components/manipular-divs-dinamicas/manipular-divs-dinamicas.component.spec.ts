import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManipularDivsDinamicasComponent } from './manipular-divs-dinamicas.component';

describe('ManipularDivsDinamicasComponent', () => {
  let component: ManipularDivsDinamicasComponent;
  let fixture: ComponentFixture<ManipularDivsDinamicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManipularDivsDinamicasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManipularDivsDinamicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
