import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';
import { Budget } from 'src/app/models/budget';
import { EditBudget } from 'src/app/models/editBudget';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-list-expense',
  templateUrl: './list-expense.component.html',
  styleUrls: ['./list-expense.component.css']
})
export class ListExpenseComponent implements  OnDestroy,OnInit {
  budgetSubs !: Subscription
  budgetList: Budget[] = [];
  totalAmount !: number;
  quantityBudget: number = 0;
  constructor(private budgetSrv: BudgetService) {

  }

  ngOnInit(): void {
    this.quantityBudget = this.budgetSrv.quantityBudget;
    this.budgetList = this.budgetSrv.budgetsList;
    this.totalAmount = this.budgetList.reduce((total, budget) => total += budget.amount || 0, 0);
    this.budgetSrv.setRemainingAmount(this.quantityBudget - this.totalAmount);

    this.budgetSrv.getBudgetList().subscribe(budgetList => {
      this.budgetList = budgetList;
      this.totalAmount = this.budgetList.reduce((total, budget) => total += budget.amount || 0, 0);
      this.budgetSrv.setRemainingAmount(this.quantityBudget - this.totalAmount);
    });

  }

  deleteBudget(index: number) {
    this.budgetSrv.deleteToBudgetList(index);
    this.budgetSrv.setModeEditBudget(false);

  }
  editBudget(budget: EditBudget) {
    this.budgetSrv.setModeEditBudget(true);
    this.budgetSrv.setBudgetEdit(budget);
  }
  ngOnDestroy(): void {
    if (this.budgetSubs) {
      this.budgetSubs.unsubscribe();
    }
  }
}
