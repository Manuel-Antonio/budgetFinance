import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { AppComponent } from './app.component';
import { BillsComponent } from './components/bills/bills.component';
import { EnterExpenseComponent } from './components/bills/enter-expense/enter-expense.component';
import { ListExpenseComponent } from './components/bills/list-expense/list-expense.component';
import { EnterBudgetComponent } from './components/enter-budget/enter-budget.component';
import { StatisticExpenseComponent } from './components/bills/statistic-expense/statistic-expense.component';
import { ErrorComponent } from './components/error/error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BillsComponent,
    EnterExpenseComponent,
    ListExpenseComponent,
    EnterBudgetComponent,
    StatisticExpenseComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
