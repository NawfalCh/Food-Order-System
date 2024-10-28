import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BackendServiceService } from '../../../services/backend-service.service';
import { ShowDialogsService } from '../../../services/show-dialogs.service';
import { Bestellte_Burger } from '../../../interfaces/Bestellte_Burger';


@Component({
  selector: 'app-burger',
  templateUrl: './burger.component.html',
  styleUrl: './burger.component.css'
})
export class BurgerComponent implements OnInit {

  //shared Burger Object with menu-dialog component
  @Output() selectedBurger= new EventEmitter<Bestellte_Burger>();

  burgers: any[] = [];
  selectedBun: any[]=[];
  chosen_buns:any;
  selectedToppings: any[] = [];
  selectedDressings: any[] = [];
  totalPrice: number = 0.0;
  //daten die ich sofort nach aufruf von getBurger() inizialisiere
  basePrice: number =0.0;
  burger_name: String="";
  burger_kalorien: String="";
  //öffnen und schliessen Accordion
  isBunsActive=false;
  isToppingsActive=false;
  isDressingActive=false;
  //Single brotart auswählen validator
  isSingleBunSelected:boolean=false;

  constructor(
    private backend: BackendServiceService,
    public showDialog: ShowDialogsService,
    
  ) {}


  ngOnInit(): void {
    this.getBurger();
    
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
          this.basePrice=burger.base_price;
          this.burger_name=burger.name;
          this.burger_kalorien=burger.kalorien;
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
    this.updateBurger();
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
    this.updateBurger();
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
    this.updateBurger();
  }

  calculateTotal(): void {
    let total = this.basePrice;

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

  increasItemQuantity(artikel:any){
    if(artikel.qty>=1){
      artikel.qty++;
      this.calculateTotal();
    }
    this.updateBurger();
  }

  decreasItemQuantity(artikel:any){
    if(artikel.qty>1){
      artikel.qty--;
    this.calculateTotal();
    }
    this.updateBurger();
  }

  private updateBurger():void{

    const burger: Bestellte_Burger={
      name: this.burger_name,
      kalorien: this.burger_kalorien,
      qty: 1,
      buns: this.chosen_buns,
      toppings: this.selectedToppings,
      dressings: this.selectedDressings,
      total_preis: this.totalPrice,
    }

    this.selectedBurger.emit(burger);

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
