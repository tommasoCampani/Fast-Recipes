import { Ingredient } from "../shared/ingredient.model";
import { EventEmitter, Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ShoppingListService {
  ingredientChanged: EventEmitter<Ingredient[]> = new EventEmitter<
    Ingredient[]
  >();

  private _ingredients: Array<Ingredient> = [
    new Ingredient("apple", 5),
    new Ingredient("tomato", 10)
  ];

  get ingredients() {
    return [...this._ingredients];
  }

  addIngredients(...ingredients: Ingredient[]) {
    ingredients.forEach(ingredient => {
      this._ingredients.push(ingredient);
    });
    this.ingredientChanged.emit([...this._ingredients]);
  }
}
