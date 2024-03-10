import { Component } from '@angular/core';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent {
  
  constructor(private budgetSrv: BudgetService) {
    this.budgetSrv.setRemainingAmount(this.budgetSrv.quantityBudget || 0);
  }
}
