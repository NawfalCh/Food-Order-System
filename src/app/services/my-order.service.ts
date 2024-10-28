import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyOrderService {
  private orderList: any[] = [];
  private totalOrderPrice: number = 0.0;

  //Änderungen im gesamten Projekt verfolgen zu können
  private ordersSubject = new BehaviorSubject<any[]>(this.orderList);
  private totalPriceSubject = new BehaviorSubject<number>(this.totalOrderPrice);

  // Observable, um die aktuellen Bestellungen und den Preis zu verfolgen
  orders$ = this.ordersSubject.asObservable();
  totalPrice$ = this.totalPriceSubject.asObservable();

  constructor() {}

  addToOrder(orderItem: any): void {
    this.orderList.push(orderItem);

    this.calculateTotalOrderPrice();
    // Die aktualisierte Liste und den Preis den Abonnenten mitteilen
    this.ordersSubject.next(this.orderList);
    this.totalPriceSubject.next(this.totalOrderPrice);
  }

  deleteOrder(index: number): void {
    if (index >= 0 && index < this.orderList.length) {
      this.orderList.splice(index, 1);
      this.calculateTotalOrderPrice();
    }
    // Die aktualisierte Liste und den Preis den Abonnenten mitteilen
    this.ordersSubject.next(this.orderList);
    this.totalPriceSubject.next(this.totalOrderPrice);
  }

  private calculateTotalOrderPrice(): void {
    // Gesamtpreis berechnen
    this.totalOrderPrice = this.orderList.reduce(
      (acc, order) => acc + order.total_preis,
      0
    );
  }

  
  /**
   * 
   * @param index 
   * könnte mit increase und decrease methoden nicht arbeite
   * da ich die Eigenschaft base_price nicht in interfaces hinzugefügt
   * also die producte in orderList enthalten nur den total_preis aus bestellung seite
   * und um base_price hinzufügen brauche ich viele änderung in code machen 
   */
  increaseQuantity(index: number): void {
    if (index >= 0 && index < this.orderList.length) {
      this.orderList[index].qty += 1;
      this.orderList[index].total_preis = this.orderList[index].qty * this.orderList[index].total_preis;
      this.calculateTotalOrderPrice();
    }
    // Die aktualisierte Liste und den Preis den Abonnenten mitteilen
    this.ordersSubject.next(this.orderList);
    this.totalPriceSubject.next(this.totalOrderPrice);
  }

  decreaseQuantity(index: number): void {
    if (index >= 0 && index < this.orderList.length && this.orderList[index].qty > 1) {
      this.orderList[index].qty -= 1;
      this.orderList[index].total_preis = this.orderList[index].qty * this.orderList[index].total_preis;
      ;
      this.calculateTotalOrderPrice();
    }
    // Die aktualisierte Liste und den Preis den Abonnenten mitteilen
    this.ordersSubject.next(this.orderList);
    this.totalPriceSubject.next(this.totalOrderPrice);
  }

  clearOrder(): void {
    this.orderList = [];
    this.totalOrderPrice = 0;
    // Die leere Liste und den Preis den Abonnenten mitteilen
    this.ordersSubject.next(this.orderList);
    this.totalPriceSubject.next(this.totalOrderPrice);
  }
}
