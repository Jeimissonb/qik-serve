import { IItems } from ".";

export interface IMenu {
  id: number;
  type: string;
  sections: [
    {
      id: number, name: string, description: string,
      images:
      [
        { id: number, image: string }
      ],
      items: IItems[]
    }
  ]
}

// Created because this interface is used in more then one place