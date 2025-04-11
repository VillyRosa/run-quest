import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RunHistoryPage } from './run-history.page';

describe('RunHistoryPage', () => {
  let component: RunHistoryPage;
  let fixture: ComponentFixture<RunHistoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RunHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
