import { Ingredient } from "../shared/ingredient.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class ShoppingListService {
  ingredientChanged: Subject<Ingredient[]> = new Subject<Ingredient[]>();

  private _ingredients: Array<Ingredient> = [];

  get ingredients() {
    return [...this._ingredients];
  }

  addIngredients(...ingredients: Ingredient[]) {
    ingredients.forEach((ingredient) => {
      this._ingredients.push(ingredient);
    });
    this.ingredientChanged.next([...this._ingredients]);
  }
}
