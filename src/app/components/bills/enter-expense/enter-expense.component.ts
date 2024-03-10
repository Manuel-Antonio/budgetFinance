import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Budget } from 'src/app/models/budget';
import { Category } from 'src/app/models/category';
import { EditBudget } from 'src/app/models/editBudget';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-enter-expense',
  templateUrl: './enter-expense.component.html',
  styleUrls: ['./enter-expense.component.css']
})
export class EnterExpenseComponent implements OnDestroy {
  budgetSubs !: Subscription;
  frmBudget !: FormGroup;
  categoryList: Category[] = [];
  statusError: boolean = false;
  messageError: string = "";
  modeEditBudget: boolean = false;
  budgetEdit !: EditBudget;

  remainingAmount: number = 0;

  constructor(private frmBuild: FormBuilder, private budgetSrv: BudgetService) {
    this.categoryList = this.budgetSrv.categoryList;
    this.frmBudget = this.frmBuild.group({
      budget: ['', Validators.required],
      amount: [0, Validators.required],
      category: ['', Validators.required],
    })
    this.budgetSubs = this.budgetSrv.getModeEditBudget().subscribe(result => {
      this.modeEditBudget = result;
      if (!this.modeEditBudget) {
        this.frmBudget.reset();
      }
    });
    this.budgetSubs = this.budgetSrv.getBudgetEdit().subscribe(result => {
      this.budgetEdit = result;
      this.fillFormWithEditBudget();
      this.statusError = false;
    });

    this.budgetSubs = this.budgetSrv.getRemainingAmount().subscribe(result => {
      this.remainingAmount = result;
    });
  }
  ngOnDestroy(): void {
    if (this.budgetSubs) {
      this.budgetSubs.unsubscribe();
    }
  }

  fillFormWithEditBudget() {
    this.frmBudget.patchValue({
      budget: this.budgetEdit.budget?.budget,
      amount: this.budgetEdit.budget?.amount,
      category: this.budgetEdit.budget?.category
    });
  }

  submitBudget() {
    if (!this.frmBudget.valid) {
      this.statusError = true;
      this.messageError = "¡Todos los campos son obligatorios!";
      return
    }
    if (this.frmBudget.value.amount <= 0) {
      this.statusError = true;
      this.messageError = "¡El monto debe ser mayor a 0!";
      return
    }
console.log(this.remainingAmount)
console.log(this.frmBudget.value.amount)
    if (this.frmBudget.value.amount > this.remainingAmount) {
      this.statusError = true;
      this.messageError = "¡El monto del gasto es mayor al que te queda!";
      return
    }
    this.statusError = false;
    const budget: Budget = this.frmBudget.value;
    if (this.modeEditBudget) {
      this.budgetSrv.updateToBudgetList(this.budgetEdit?.index, budget);
      this.budgetSrv.setModeEditBudget(false);
      return;
    }
    this.budgetSrv.addToBudgetList(budget);
    this.frmBudget.reset();
  }
}
