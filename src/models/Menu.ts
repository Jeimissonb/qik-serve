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
      items:
      [
        {
          id: number, name: string, description: string, price: number,
          images: [{ id: number, image: string }]
        }
      ]
    }
  ]
}

// Created because this interface is used in more then one place