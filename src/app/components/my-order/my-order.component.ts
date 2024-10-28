import { Component, OnInit } from '@angular/core';
import { MyOrderService } from '../../services/my-order.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrl: './my-order.component.css',
})
export class MyOrderComponent implements OnInit {
  orderList: any[] = [];
  totalPreis: number = 0.0;

  constructor(private myorder: MyOrderService) {}

  ngOnInit(): void {
    this.myorder.orders$.subscribe((res) => {
      this.orderList = res;
      console.log(this.orderList);
    });
    this.myorder.totalPrice$.subscribe((res) => {
      this.totalPreis = res;
    });
  }

  deleteOrder(index:number):void{
    this.myorder.deleteOrder(index);
  }

  

  clear(): void {
    this.myorder.clearOrder();
  }
}
