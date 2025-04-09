import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChallengesPage } from './challenges.page';

describe('ChallengesPage', () => {
  let component: ChallengesPage;
  let fixture: ComponentFixture<ChallengesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
