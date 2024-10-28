export interface Bestellte_Burger {
  name: String;
  kalorien: String;
  qty: number;
  buns: { name: String; kalorien: String; preis: String };
  toppings: any[];
  dressings: any[];
  total_preis: number;
}
