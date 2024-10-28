import { Component, OnInit } from '@angular/core';
import { ShowDialogsService } from '../../../services/show-dialogs.service';
import { BackendServiceService } from '../../../services/backend-service.service';
import { Bestellte_menu } from '../../../interfaces/Bestellte_menu';
import { MyOrderService } from '../../../services/my-order.service';

@Component({
  selector: 'app-menu-dialog',
  templateUrl: './menu-dialog.component.html',
  styleUrl: './menu-dialog.component.css',
})
export class MenuDialogComponent implements OnInit {
  burger: String = 'CoolBuns Burger Menu';
  sandwich: String = 'CoolBuns Sandwich Menu';
  originalPrice: number=0.0;

  currentStep=1;

  //Single Drink auswählen validator
  isSingleDrinkSelected = false;
  isSingleBeilageSelected = false;

  menu: Bestellte_menu={
    name: "menu",
    qty: 1,
    burger_or_sandwich: null,
    getraenk:null,
    beilage:null,
    total_preis: 0
  }
  
  getraenke: any[] = [];
  beilagen: any[] = [];

  constructor(
    public showDialog: ShowDialogsService,
    private backend: BackendServiceService,
    private myOrder: MyOrderService
  ) {}

  ngOnInit(): void {   
    this.getGetraenk();
    this.getBeilagen();
  }

  setBurger_Sandwich(artikel:any){
    if(artikel.buns || artikel.brotart){
      this.menu.burger_or_sandwich=artikel;
    }
    this.calculateTotalPrice();
  }

  setGetraenk(artikel:any){
    this.getraenke.forEach(getraenk =>{
      if(getraenk !== artikel){
        getraenk.selected = false;
      }
    })
    artikel.selected = !artikel.selected
    this.validateSingleDrink();
    this.menu.getraenk=artikel;
    this.calculateTotalPrice();
  }
  
  // Methode for disabling submit if some item not selected, this.isSingleDrinkSelected should be true 
  validateSingleDrink(){
    this.isSingleDrinkSelected = this.getraenke.some(getraenk => getraenk.selected);    
  }

  setBeilage(artikel:any){
    this.beilagen.forEach(beilage =>{
      if(beilage !== artikel){
        beilage.selected = false
      }
    })
    artikel.selected = !artikel.selected
    this.validateSingleBeilage();
    this.menu.beilage= artikel;
    this.calculateTotalPrice();  
  }

  validateSingleBeilage(){
    this.isSingleBeilageSelected = this.beilagen.some(beilage => beilage.selected);    
  }

  calculateTotalPrice(): void {
    if (this.menu.burger_or_sandwich && this.menu.getraenk && this.menu.beilage) {
      const burgerPreis = this.menu.burger_or_sandwich.total_preis;
      const getraenkPreis = this.menu.getraenk.base_price;
      const beilagePreis = this.menu.beilage.base_price;

      const total = burgerPreis + getraenkPreis + beilagePreis;
      this.originalPrice = total * (this.menu.qty);
      this.menu.total_preis = parseFloat((this.originalPrice * 0.9).toFixed(2));  
    }
  }

  addMenuToOrder(): void {
    if (this.menu.burger_or_sandwich && this.menu.getraenk && this.menu.beilage) {
      this.myOrder.addToOrder(this.menu);
    }
  }

  increasItemQuantity(){   
    if(this.menu.qty>=1){
      this.menu.qty++;
      this.calculateTotalPrice()
    }
  }

  decreasItemQuantity(){
    if(this.menu.qty>1){
      this.menu.qty--;
      this.calculateTotalPrice()
    }
  }


  getGetraenk(): void {
    this.backend.getGetraenk().subscribe(
      (res) => {
        this.getraenke = res;
      },
      (error) => {
        console.log('kein daten kommen vom Backend!');
      }
    );
  }

  getBeilagen(): void {
    this.backend.getBeilage().subscribe(
      (res) => {
        this.beilagen = res;
      },
      (error) => {
        console.log('kein daten kommen vom Backend!');
      }
    );
  }

  nextStep(): void {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }


}
