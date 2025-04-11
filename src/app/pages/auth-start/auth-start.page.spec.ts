import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthStartPage } from './auth-start.page';

describe('AuthStartPage', () => {
  let component: AuthStartPage;
  let fixture: ComponentFixture<AuthStartPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthStartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
