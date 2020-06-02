import { Injectable } from "@angular/core";

import { Recipe } from "../recipes/recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class RecipeService {
  onUpdatedRecipe: Subject<Recipe[]> = new Subject<Recipe[]>();
  private _recipes: Array<Recipe> = [
    new Recipe(
      1,
      "Test Recipe 1",
      "This is a test recipe",
      "https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg",
      [new Ingredient("Potatos", 1), new Ingredient("Meat", 1)]
    ),
    new Recipe(
      2,
      "Test Recipe 2",
      "This is a test recipe 2",
      "https://www.recipemasters.in/wp-content/uploads/2015/05/DSC_1075.jpg",
      [new Ingredient("Tomatoes", 10), new Ingredient("Meat", 1)]
    ),
    new Recipe(
      3,
      "Test Recipe 3",
      "This is a test recipe 3",
      "https://images.ctfassets.net/wy4h2xf1swlt/asset_26584/7344f42a430f1b47e0b321a91e92246a/AsiaExpress-Crab-Omelette-1386.jpg",
      [new Ingredient("Potatos", 1), new Ingredient("Chikken", 2)]
    ),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  public get recipes() {
    return [...this._recipes];
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

  public updateRecipe(id: number, newRecipe: Recipe) {
    let editingRecipe = this.getRecipe(id);
    const idx = this._recipes.indexOf(editingRecipe);
    this._recipes[idx] = newRecipe;
    this.onUpdatedRecipe.next(this._recipes);
  }

  public deleteRecipe(id: number) {
    let deletingRecipe = this.getRecipe(id);
    const idx = this._recipes.indexOf(deletingRecipe);
    this._recipes.splice(idx, 1);
    this.onUpdatedRecipe.next(this._recipes);
  }
}
