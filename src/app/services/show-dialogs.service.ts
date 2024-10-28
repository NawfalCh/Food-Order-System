import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShowDialogsService {
  //sharing data between bestellung.component and  dialogs
  private menuDialog = false;
  private menuType: String = '';
  private burgerDialog = false;
  private burger_base_price: number = 0.0;
  private sandwichDialog= false;
  private sandwich_base_price: number=0.0;

  constructor() {}

  /***Methoden zu Menu Dialog */
  showMenu(menuName: String): void {
    this.menuDialog = true;
    this.menuType = menuName;
  }

  closeMenu(): void {
    this.menuDialog = false;
  }

  getMenuDialogSatus(): boolean {
    return this.menuDialog;
  }

  getMenuType(): String {
    return this.menuType;
  }

  /***Methoden zu burger Dialog */
  showBurger(price: number): void {
    this.burgerDialog = true;
    this.burger_base_price = price;
  }

  closeBurger(): void {
    this.burgerDialog = false;
  }

  getBurgerStatus(): boolean {
    return this.burgerDialog;
  }

  getBurgerPrice(): number {
    return this.burger_base_price;
  }

  /***Methoden zu sandwich Dialog */
  showSandwich(price: number): void {
    this.sandwichDialog=true;
    this.sandwich_base_price=price;
  }

  closeSandwich(): void {
    this.sandwichDialog=false;
  }

  getSandwichStatus(): boolean {
    return this.sandwichDialog;
  }

  getSandwichPrice(): number {
    return this.sandwich_base_price;
  }
}
