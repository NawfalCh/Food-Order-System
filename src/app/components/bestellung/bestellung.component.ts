import { Component, OnInit } from '@angular/core';
import { BackendServiceService } from '../../services/backend-service.service';
import { ShowDialogsService } from '../../services/show-dialogs.service';
import { Salat } from '../../interfaces/Salat';
import { MyOrderService } from '../../services/my-order.service';
import { Getraenk } from '../../interfaces/Getraenk';
import { Beilage } from '../../interfaces/Beilage';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bestellung',
  templateUrl: './bestellung.component.html',
  styleUrl: './bestellung.component.css',
})
export class BestellungComponent implements OnInit {
  menus: any[] = [];
  burgers: any[] = [];
  sandwiches: any[] = [];
  salate: any[] = [];
  getraenke: any[] = [];
  beilagen: any[] = [];
  

  constructor(
    private backend: BackendServiceService,
    public showDialog: ShowDialogsService,
    private myOrder: MyOrderService,
  ) {}

  ngOnInit(): void {
    this.getBurger();
    this.getSandwich();
    this.getSalat();
    this.getMenu();    
    this.getBeilagen();
    this.getGetraenk();
  }

  getMenu(): void {
    this.backend.getMenu().subscribe(
      (res) => {
        this.menus = res;
      },
      (error) => {
        console.log('kein daten kommen vom Backend!');
      }
    );
  }

  getBurger(): void {
    this.backend.getBurger().subscribe(
      (res) => {
        console.log(res);
        this.burgers = res;
      },
      (error) => {
        console.log('kein daten kommen vom Backend!');
      }
    );
  }

  getSandwich(): void {
    this.backend.getSandwich().subscribe(
      (res) => {
        console.log(res);
        this.sandwiches = res;
      },
      (error) => {
        console.log('kein daten kommen vom Backend!');
      }
    );
  }

  getSalat(): void {
    this.backend.getSalat().subscribe(
      (res) => {
        console.log(res);
        this.salate = res;
      },
      (error) => {
        console.log('kein daten kommen vom Backend!');
      }
    );
  }

  getGetraenk(): void {
    this.backend.getGetraenk().subscribe((res) => {
      console.log(res);
      this.getraenke = res;
    },
    (error) => {
      console.log('kein daten kommen vom Backend!');
    });
  }

  getBeilagen(): void {
    this.backend.getBeilage().subscribe((res) => {
      console.log(res);
      this.beilagen = res;
    },
    (error) => {
      console.log('kein daten kommen vom Backend!');
    });
  }

  
  increasItemQuantity(artikel:any){   
    if(artikel.qty>=1){
      artikel.qty++;
      artikel.base_price*=2  
    }   
  }

  decreasItemQuantity(artikel:any){
    if(artikel.qty>1){
      artikel.qty--;
      artikel.base_price/=2
    }

  }

  //add salat to Cart
  addSalatToOrder(salat:any){
    let newSalat: Salat={
      name: salat.name,
      kalorien: salat.kalorien,
      qty: salat.qty,
      total_preis: salat.base_price

    }
    console.log(newSalat);
    this.myOrder.addToOrder(newSalat);

  }

  //add salat to Cart
  addGetraenkToOrder(getraenk:any){
    let newGetraenk: Getraenk={
      name: getraenk.name,
      kalorien: getraenk.kalorien,
      qty: getraenk.qty,
      total_preis: getraenk.base_price
    }
    this.myOrder.addToOrder(newGetraenk);
  }

  //add salat to Cart
  addBeilageToOrder(beilage:any){
    let newBeilage: Beilage={
      name: beilage.name,
      kalorien: beilage.kalorien,
      qty: beilage.qty,
      total_preis: beilage.base_price

    }
    this.myOrder.addToOrder(newBeilage);
  }
}
