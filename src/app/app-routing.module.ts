import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnterBudgetComponent } from './components/enter-budget/enter-budget.component';
import { BillsComponent } from './components/bills/bills.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: "enterbudget",
    pathMatch: "full"
  },
  {
    path: 'enterbudget',
    component: EnterBudgetComponent
  },
  {
    path: 'bills',
    component: BillsComponent
  },
  {
    path: '**',
    redirectTo: "enterbudget",
    pathMatch: "full"

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
