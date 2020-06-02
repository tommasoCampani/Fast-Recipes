import { Injectable } from "@angular/core";

import { Recipe } from "../recipes/recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class RecipeService {
  onUpdatedRecipe: Subject<Recipe[]> = new Subject<Recipe[]>();
  private _recipes: Array<Recipe> = [];

  constructor(private shoppingListService: ShoppingListService) {}

  public get recipes() {
    return [...this._recipes];
  }

  public setRecipes(recipes: Recipe[]) {
    this._recipes = recipes;
    this.onUpdatedRecipe.next([...this._recipes]);
  }

  public getNextId() {
    const max = Math.max.apply(
      null,
      this._recipes.map((item) => item.id)
    );
    return max + 1;
  }
  public getRecipe(id: string | number) {
    return this._recipes.find((r) => r.id == id);
  }

  public addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(...ingredients);
  }

  public saveRecipe(newRecipe: Recipe) {
    newRecipe.id = this.getNextId();
    this._recipes.push(newRecipe);
    this.onUpdatedRecipe.next(this._recipes);
  }

  public updateRecipe(id: string, newRecipe: Recipe) {
    let editingRecipe = this.getRecipe(id);
    const idx = this._recipes.indexOf(editingRecipe);
    this._recipes[idx] = newRecipe;
    this.onUpdatedRecipe.next(this._recipes);
  }

  public deleteRecipe(id: string) {
    let deletingRecipe = this.getRecipe(id);
    const idx = this._recipes.indexOf(deletingRecipe);
    this._recipes.splice(idx, 1);
    this.onUpdatedRecipe.next(this._recipes);
  }
}
