import { Ingredient } from "../shared/ingredient.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class ShoppingListService {
  ingredientChanged: Subject<Ingredient[]> = new Subject<Ingredient[]>();
  onEditIngredient: Subject<number> = new Subject<number>();

  private _ingredients: Array<Ingredient> = [];

  get ingredients() {
    return [...this._ingredients];
  }

  getIngredientByIdx(idx: number) {
    return this.ingredients[idx];
  }

  addIngredients(...ingredients: Ingredient[]) {
    ingredients.forEach((ingredient) => {
      this._ingredients.push(ingredient);
    });
    this.ingredientChanged.next([...this._ingredients]);
  }

  updateIngredient(idx: number, newIngredient: Ingredient) {
    this._ingredients[idx] = newIngredient;
    this.ingredientChanged.next([...this._ingredients]);
  }

  deleteIngredient(idx: number) {
    this._ingredients.splice(idx, 1);
    this.ingredientChanged.next([...this._ingredients]);
  }
}
