import { Injectable } from '@angular/core';
import { Budget } from '../models/budget';
import { Observable, Subject } from 'rxjs';
import { Category } from '../models/category';
import { EditBudget } from '../models/editBudget';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  quantityBudget: number = 0;
  private budgetEdit$ = new Subject<EditBudget>()
  private budgetList$ = new Subject<Budget[]>();
  private modeEditBudget$ = new Subject<boolean>();
  private remainingAmount$ = new Subject<number>();
  private quantityBudget$ = new Subject<number>();

  budgetsList: Budget[] = [];

  categoryList: Category[] = [
    new Category("Alimentación"),
    new Category("Vivienda"),
    new Category("Transporte"),
    new Category("Salud"),
    new Category("Entretenimiento"),
    new Category("Educación"),
    new Category("Finanzas personales"),
    new Category("Ropa y accesorios"),
    new Category("Viajes y vacaciones"),
    new Category("Otros"),
  ];

  constructor() {
    this.loadLS();
  }

  getQuantityBudget(): Observable<number> {
    return this.quantityBudget$.asObservable();
  }
  setQuantityBudget(totalAmount: number): void {
    this.quantityBudget$.next(totalAmount);
    this.quantityBudget = totalAmount;
    this.saveTotalAmountLS(totalAmount);
  }

  getRemainingAmount(): Observable<number> {
    return this.remainingAmount$.asObservable();
  }

  setRemainingAmount(remaining: number): void {
    this.remainingAmount$.next(remaining);
    this.saveRemainingAmountLS(remaining);
  }

  getBudgetEdit(): Observable<EditBudget> {
    return this.budgetEdit$.asObservable();
  }

  setBudgetEdit(budgetEdit: EditBudget): void {
    this.budgetEdit$.next(budgetEdit);
  }

  getModeEditBudget(): Observable<boolean> {
    return this.modeEditBudget$.asObservable();
  }

  setModeEditBudget(mode: boolean): void {
    this.modeEditBudget$.next(mode);
  }

  getBudgetList(): Observable<Budget[]> {
    return this.budgetList$.asObservable()
  }

  setBudgetList(budgetList: Budget[]): void {
    this.budgetList$.next(budgetList);
  }

  addToBudgetList(budget: Budget) {
    this.budgetsList = [...this.budgetsList, budget]
    this.budgetList$.next(this.budgetsList);
    this.saveBudgetListLS(this.budgetsList);
  }

  updateToBudgetList(index: number, editedBudget: Budget) {
    this.budgetsList[index] = editedBudget;
    this.budgetList$.next(this.budgetsList);
    this.saveBudgetListLS(this.budgetsList);
  }

  deleteToBudgetList(index: number) {
    this.budgetsList = this.budgetsList.filter((_, i) => i !== index);
    this.budgetList$.next(this.budgetsList);
    this.saveBudgetListLS(this.budgetsList);
  }

  calculateTotalBudgetList() {
    return this.budgetsList.reduce((total, budget) => total += budget?.amount || 0, 0);
  }

  saveBudgetListLS(budgetsList: Budget[]): void {
    localStorage.setItem("budgetList", JSON.stringify(budgetsList));
  }

  saveRemainingAmountLS(remaining: number) {
    localStorage.setItem("remainingAmount", JSON.stringify(remaining));
  }
  saveTotalAmountLS(totalAmount: number) {
    localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
  }

  loadLS() {
    const budgetList = JSON.parse(localStorage.getItem("budgetList") || "[]");
    const remainingAmount = JSON.parse(localStorage.getItem("remainingAmount") || "0");
    const totalAmount = JSON.parse(localStorage.getItem("totalAmount") || "0");
    
    this.budgetsList = budgetList;

    this.setBudgetList(budgetList);
    this.setRemainingAmount(remainingAmount);
    this.setQuantityBudget(totalAmount);
  }

  resetApp(){
    this.quantityBudget = 0;
    this.setBudgetEdit({
      index: 0,
      budget: {}
    });
    this.budgetsList = [];
    this.setBudgetList([]);
    this.setModeEditBudget(false);
    this.setRemainingAmount(0);
    this.setQuantityBudget(0);

    this.saveBudgetListLS([]);
    this.saveRemainingAmountLS(0);
    this.saveTotalAmountLS(0);
  }
}
