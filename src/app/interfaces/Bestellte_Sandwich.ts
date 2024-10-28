export interface Bestellte_Sandwich {
  name: String;
  kalorien: String;
  qty: number;
  brotart: { name: String; kalorien: String; preis: String };
  toppings: any[];
  dressings: any[];
  total_preis: number;
}
