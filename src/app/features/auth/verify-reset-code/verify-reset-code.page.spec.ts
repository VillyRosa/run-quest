import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerifyResetCodePage } from './verify-reset-code.page';

describe('VerifyResetCodePage', () => {
  let component: VerifyResetCodePage;
  let fixture: ComponentFixture<VerifyResetCodePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyResetCodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
