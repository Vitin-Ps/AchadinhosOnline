import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFuncComponent } from './form-func.component';

describe('FormFuncComponent', () => {
  let component: FormFuncComponent;
  let fixture: ComponentFixture<FormFuncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormFuncComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormFuncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
