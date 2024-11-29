import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFuncComponent } from './edit-func.component';

describe('EditFuncComponent', () => {
  let component: EditFuncComponent;
  let fixture: ComponentFixture<EditFuncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditFuncComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditFuncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
