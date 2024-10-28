import { Component, OnInit } from '@angular/core';
import { MyOrderService } from './services/my-order.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'cool-Buns';
  totalPreis: number = 0.0;
  orderList:any[]=[];

  constructor(private myOrder: MyOrderService) {}

  ngOnInit(): void {
    this.myOrder.totalPrice$.subscribe((res) => {
      this.totalPreis = res;
    });

    this.myOrder.orders$.subscribe(res =>{
      this.orderList=res;
    })
  }
}
