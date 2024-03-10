import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observer, Subscription, combineLatest } from 'rxjs';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-statistic-expense',
  templateUrl: './statistic-expense.component.html',
  styleUrls: ['./statistic-expense.component.css']
})
export class StatisticExpenseComponent implements OnDestroy,OnInit {
  budgetSubs !: Subscription;

  quantityBudget: number = 1;
  remainingAmount: number = 0;
  percentageCircle: number = 0;
  outerColorCircle !: string;

  constructor(private budgetSrv: BudgetService, private router : Router) {
  
  }
  ngOnInit(): void {
    this.quantityBudget = this.budgetSrv.quantityBudget;
    this.remainingAmount = this.budgetSrv.quantityBudget;
    this.budgetSrv.setRemainingAmount(this.remainingAmount);
    
    this.budgetSubs = this.budgetSrv.getRemainingAmount().subscribe(remaining => {
      this.quantityBudget = this.budgetSrv.quantityBudget;
      this.remainingAmount = remaining;
      this.percentageCircle = 100 - (this.remainingAmount / this.quantityBudget) * 100;
      this.outerColorCircle = this.calculateTypeColor(this.percentageCircle);
    });
  }
  ngOnDestroy(): void {
    if (this.budgetSubs) {
      this.budgetSubs.unsubscribe();
    }
  }

  calculateTypeColor(percentage: number): string {
    if (percentage < 33.33) {
      return "#198754"
    } else if (percentage < 66.66) {
      return "#ffca2c"
    } else {
      return "#e93848"
    }
  }

  resetApp() {
    this.budgetSrv.resetApp();
    this.router.navigateByUrl("enterbudget")
  }
}
