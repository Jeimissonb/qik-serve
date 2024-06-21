export interface IItems {
  id: number;
  fatherId?: number;
  fatherName?: string;
  name?: string;
  description?: string;
  images?: [{ id: number, image: string }];
  price?: number;
  modifiers?: [{
    id: number, name: string, minChoices: number, maxChoices: number,
    items: [{ id: number, name: string, price: number }]
  }]

}