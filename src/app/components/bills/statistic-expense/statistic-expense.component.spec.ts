import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticExpenseComponent } from './statistic-expense.component';

describe('StatisticExpenseComponent', () => {
  let component: StatisticExpenseComponent;
  let fixture: ComponentFixture<StatisticExpenseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatisticExpenseComponent]
    });
    fixture = TestBed.createComponent(StatisticExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
