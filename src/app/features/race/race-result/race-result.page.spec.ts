import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RaceResultPage } from './race-result.page';

describe('RaceResultPage', () => {
  let component: RaceResultPage;
  let fixture: ComponentFixture<RaceResultPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
