import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-enter-budget',
  templateUrl: './enter-budget.component.html',
  styleUrls: ['./enter-budget.component.css']
})
export class EnterBudgetComponent {
  quantityBudget: number = 0;
  statusError: boolean = false;
  messageError: string = "";
  constructor(private budgetSrv: BudgetService, private router: Router) {
    this.quantityBudget = this.budgetSrv.quantityBudget || 0;
  }

  applyQuantityBudget() {
    if (this.quantityBudget === 0) {
      this.statusError = true;
      this.messageError = "La cantidad no debe ser cero"
      return;
    }
    this.statusError = false;
    this.budgetSrv.quantityBudget = this.quantityBudget;
    this.budgetSrv.setQuantityBudget(this.quantityBudget);
    this.router.navigate(['/bills'])
  }


}
