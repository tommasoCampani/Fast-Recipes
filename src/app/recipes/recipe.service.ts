import { EventEmitter } from "@angular/core";

import { Recipe } from "../recipes/recipe.model";

export class RecipeService {
  selectedRecipe: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  private _recipes: Array<Recipe> = [
    new Recipe(
      "Test Recipe",
      "This is a test recipe",
      "https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg"
    ),
    new Recipe(
      "Test Recipe 2",
      "This is a test recipe 2",
      "https://www.recipemasters.in/wp-content/uploads/2015/05/DSC_1075.jpg"
    ),
    new Recipe(
      "Test Recipe 3",
      "This is a test recipe 3",
      "https://images.ctfassets.net/wy4h2xf1swlt/asset_26584/7344f42a430f1b47e0b321a91e92246a/AsiaExpress-Crab-Omelette-1386.jpg"
    )
  ];

  public get recipes() {
    return [...this._recipes];
  }
}
