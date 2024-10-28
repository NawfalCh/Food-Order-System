import { Component, OnInit } from '@angular/core';
import { BackendServiceService } from '../../../services/backend-service.service';
import { ShowDialogsService } from '../../../services/show-dialogs.service';
import { Bestellte_Burger } from '../../../interfaces/Bestellte_Burger';
import { MyOrderService } from '../../../services/my-order.service';

@Component({
  selector: 'app-burger-konfig-dialog',
  templateUrl: './burger-konfig-dialog.component.html',
  styleUrl: './burger-konfig-dialog.component.css',
})
export class BurgerKonfigDialogComponent implements OnInit {
  
  burgers: any[] = [];
  selectedBun: any[]=[];
  chosen_buns:any;
  selectedToppings: any[] = [];
  selectedDressings: any[] = [];
  totalPrice: number = 0.0;
  //öffnen und schliessen Accordion
  isBunsActive=false;
  isToppingsActive=false;
  isDressingActive=false;
  //Single brotart auswählen validator
  isSingleBunSelected:boolean=false;
  

  constructor(
    private backend: BackendServiceService,
    public showDialog: ShowDialogsService,
    private myOrder: MyOrderService
  ) {}

  ngOnInit(): void {
    this.getBurger();
    this.totalPrice=this.showDialog.getBurgerPrice();
  }

  getBurger(): void {
    this.backend.getBurger().subscribe(
      (res) => {
        this.burgers = res;
        this.burgers.forEach(burger =>{
          burger.toppings.forEach((topping:any) =>{
            if(topping.selected){
              this.selectedToppings.push(topping);
            }
          })
          burger.buns.forEach((bun:any) =>{
            this.selectedBun.push(bun);
          })
        })
      },
      (error) => {
        console.log('kein daten kommen vom Backend!');
      }
    );
  }

  onBunSelect(selectedBun: any) {
    this.selectedBun.forEach(option => {
      if (option !== selectedBun) {
        option.selected = false;
      }
    });
    selectedBun.selected=!selectedBun.selected
    this.validateSingleBun();
    this.calculateTotal();
  }

  //ein brotart auswählen validator
  validateSingleBun(){
    this.isSingleBunSelected = this.selectedBun.some(option => option.selected);
    
  }

  toppingSelected(topping: any): boolean {
    return this.selectedToppings.includes(topping);
  }

  dressingSelected(dressing: any): boolean {
    return this.selectedDressings.includes(dressing);
  }

  toggleTopping(event: any, topping: any): void {
    if (event.target.checked) {
      topping.qty = topping.qty || 1;
      this.selectedToppings.push(topping);
    } else {
      const index = this.selectedToppings.indexOf(topping);
      if (index > -1) {
        this.selectedToppings.splice(index, 1);
      }
    }
    this.calculateTotal();
  }

  toggleDressing(event: any, dressing: any): void {
    if (event.target.checked) {
      dressing.qty = dressing.qty || 1;
      this.selectedDressings.push(dressing);
    } else {
      const index = this.selectedDressings.indexOf(dressing);
      if (index > -1) {
        this.selectedDressings.splice(index, 1);
      }
    }
    this.calculateTotal();
  }

  calculateTotal(): void {
    let total = this.showDialog.getBurgerPrice();

    this.selectedBun.forEach((bun) =>{
      if(bun.selected){
        total+=bun.preis;
        this.chosen_buns=bun;
      }
    })

    this.selectedToppings.forEach((topping) => {
      total += topping.preis * (topping.qty || 1);
    });

    this.selectedDressings.forEach((dressing) => {
      total += dressing.preis * (dressing.qty || 1);
    });
    this.burgers.forEach((burger) =>{
      total*=(burger.qty || 1);
    })

    this.totalPrice = total;
  }

  addToOrder(burger: any): void {
    let newBurger: Bestellte_Burger = {
      name: burger.name,
      kalorien: burger.kalorien,
      qty: burger.qty,
      buns: this.chosen_buns,
      toppings: this.selectedToppings,
      dressings: this.selectedDressings,
      total_preis: this.totalPrice,
    };
    console.log(newBurger);
    this.myOrder.addToOrder(newBurger);

    
  }

  increasItemQuantity(artikel:any){
    
    if(artikel.qty>=1){
      artikel.qty++;
      this.calculateTotal();
    }
  }

  decreasItemQuantity(artikel:any){
    if(artikel.qty>1){
      artikel.qty--;
    this.calculateTotal();
    }
  }

   //Methoden für öffnen und schliessen Accordion
   toggleBunAccordion(){
    this.isBunsActive=!this.isBunsActive;
  }

  toggleToppingAccordion(){
    this.isToppingsActive=!this.isToppingsActive;
  }

  toggleDressingAccordion(){
    this.isDressingActive=!this.isDressingActive;
  }
}
