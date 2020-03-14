import { Ingredient } from "../shared/ingredient.model";
import { EventEmitter } from "@angular/core";

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

  addIngredient(ingredient: Ingredient) {
    this._ingredients.push(ingredient);
    this.ingredientChanged.emit(this._ingredients);
  }
}
