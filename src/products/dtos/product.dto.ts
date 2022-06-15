export class ProductDTO {
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly stock: number;
  readonly image: string;

  constructor(
    name: string,
    description: string,
    price: number,
    stock: number,
    image: string,
  ) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.image = image;
  }
}
