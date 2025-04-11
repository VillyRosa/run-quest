import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RacePage } from './race.page';

describe('RacePage', () => {
  let component: RacePage;
  let fixture: ComponentFixture<RacePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
