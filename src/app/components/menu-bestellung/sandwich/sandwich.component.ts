import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ShowDialogsService } from '../../../services/show-dialogs.service';
import { BackendServiceService } from '../../../services/backend-service.service';
import { Bestellte_Sandwich } from '../../../interfaces/Bestellte_Sandwich'

@Component({
  selector: 'app-sandwich',
  templateUrl: './sandwich.component.html',
  styleUrl: './sandwich.component.css'
})
export class SandwichComponent implements OnInit {

  //shared Sandwich Object with menu-dialog component
  @Output() selectedSandwich = new EventEmitter<Bestellte_Sandwich>();

  sandwiches: any[] = [];
  selectedBrot: any[]=[];
  chosen_brot:any;
  selectedToppings: any[] = [];
  selectedDressings: any[] = [];
  totalPrice: number = 0.0;
  //daten die ich sofort nach aufruf von getBurger() inizialisiere
  basePrice: number =0.0;
  sandwich_name: String="";
  sandwich_kalorien: String="";
  //öffnen und schliessen Accordion
  isBunsActive=false;
  isToppingsActive=false;
  isDressingActive=false;
  //Single brotart auswählen validator
  isSingleBrotSelected:boolean=false;

  constructor(
    public showDialog: ShowDialogsService,
    private backend: BackendServiceService,
    
  ) {}

  ngOnInit(): void {
    this.getSandwich();
    
  console.log(this.selectedToppings);
  console.log(this.basePrice);
    
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
        this.basePrice=sandwich.base_price;
        this.sandwich_name=sandwich.name;
        this.sandwich_kalorien= sandwich.kalorien;
      })
  
    })
   }


   onBrotSelect(selectedBrot: any) {
    this.selectedBrot.forEach(option => {
      if (option !== selectedBrot) {
        option.selected = false;
      }
    });
    selectedBrot.selected=!selectedBrot.selected
    this.validateSingleBrot();
    this.calculateTotal();
    this.updateSandwich();
  }

  //ein brotart auswählen validator
  validateSingleBrot(){
    this.isSingleBrotSelected = this.selectedBrot.some(option => option.selected);
    
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
      this.updateSandwich();
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
      this.updateSandwich();
    }
  
    calculateTotal(): void {
      let total = this.basePrice;
  
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
      this.updateSandwich();
    }
  
    decreasItemQuantity(artikel:any){
      if(artikel.qty>1){
        artikel.qty--;
        this.calculateTotal();
      }
      this.updateSandwich();
  
    }

    private updateSandwich():void{
      const sandwich: Bestellte_Sandwich={
        name: this.sandwich_name,
        kalorien: this.sandwich_kalorien,
        qty: 1,
        brotart: this.chosen_brot,
        toppings: this.selectedToppings,
        dressings: this.selectedDressings,
        total_preis: this.totalPrice
      }
      this.selectedSandwich.emit(sandwich);

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
