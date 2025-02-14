import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmModelComponent } from './confirm-model.component';

describe('ConfirmModelComponent', () => {
  let component: ConfirmModelComponent;
  let fixture: ComponentFixture<ConfirmModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
