import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
  public id: string;
  public name: string;
  public description: string;
  public imgUrl: string;
  public ingredients: Ingredient[];

  constructor(
    id: string,
    name: string,
    description: string,
    imgUrl: string,
    ingredients: Ingredient[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imgUrl = imgUrl;
    this.ingredients = ingredients;
  }
}
