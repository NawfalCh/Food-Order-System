import { Component, OnInit } from '@angular/core';
import { ShowDialogsService } from '../../../services/show-dialogs.service';
import { BackendServiceService } from '../../../services/backend-service.service';
import { Bestellte_Sandwich } from '../../../interfaces/Bestellte_Sandwich'
import { MyOrderService } from '../../../services/my-order.service';

@Component({
  selector: 'app-sandwich-konfig-dialog',
  templateUrl: './sandwich-konfig-dialog.component.html',
  styleUrl: './sandwich-konfig-dialog.component.css',
})
export class SandwichKonfigDialogComponent implements OnInit {


  sandwiches: any[] = [];
  selectedBrot: any[]=[];
  chosen_brot:any;
  selectedToppings: any[] = [];
  selectedDressings: any[] = [];
  totalPrice: number = 0.0;
  //öffnen und schliessen Accordion
  isBunsActive=false;
  isToppingsActive=false;
  isDressingActive=false;
  //Single brotart auswählen validator
  isSingleBrotSelected:boolean=false;
  
  constructor(
    public showDialog: ShowDialogsService,
    private backend: BackendServiceService,
    private myOrder: MyOrderService
  ) {}


  ngOnInit(): void {
      this.getSandwich();
      this.totalPrice=this.showDialog.getSandwichPrice();
      
    console.log(this.selectedToppings);
    console.log(this.selectedBrot);
      
  }
 
  onBrotSelect(Brot: any) {
    this.selectedBrot.forEach(option => {
      if (option !== Brot) {
        option.selected = false;
      }
    });
    Brot.selected=!Brot.selected
    this.validateSingleBrot();
    this.calculateTotal();
  }

  //ein brotart auswählen validator
  validateSingleBrot(){
    this.isSingleBrotSelected = this.selectedBrot.some(option => option.selected);
    
  }


 getSandwich():void{
  this.backend.getSandwich().subscribe(res =>{
    this.sandwiches=res;
    this.sandwiches.forEach(sandwich =>{
      sandwich.toppings.forEach((topping:any) =>{
        if(topping.selected){
          this.selectedToppings.push(topping);
        }
      })
      sandwich.brotart.forEach((brotart:any) =>{
        this.selectedBrot.push(brotart);
      })
    })

  })
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
        topping.qty=1;
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
    let total = this.showDialog.getSandwichPrice();

    this.selectedBrot.forEach((brot) =>{
      if(brot.selected){
        total+=brot.preis;
        this.chosen_brot=brot;
      }
    })

    this.selectedToppings.forEach((topping) => {
      total += topping.preis * (topping.qty || 1);
    });

    this.selectedDressings.forEach((dressing) => {
      total += dressing.preis * (dressing.qty || 1);
    });
    this.sandwiches.forEach((sandwiche) =>{
      total*=(sandwiche.qty || 1);
    })

    this.totalPrice = total;
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

  addToOrder(sandwich:any){
    let newSandwich: Bestellte_Sandwich={
      name: sandwich.name,
      kalorien: sandwich.kalorien,
      qty: sandwich.qty,
      brotart: this.chosen_brot,
      toppings: this.selectedToppings,
      dressings: this.selectedDressings,
      total_preis: this.totalPrice,

    }
    console.log(newSandwich);
    this.myOrder.addToOrder(newSandwich);
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
