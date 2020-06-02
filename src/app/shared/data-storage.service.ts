import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, tap } from "rxjs/operators";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({
  providedIn: "root",
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  fetchRecipes() {
    return this.http
      .get("https://fastrecipes-a0b01.firebaseio.com/recipes.json", {
        observe: "body",
        params: new HttpParams().set("print", "pretty"),
      })
      .pipe(
        map((responseData) => {
          console.log(responseData);
          const recipes = new Array<Recipe>();

          for (const key in responseData) {
            const ingredients = responseData[key].ingredients
              ? responseData[key].ingredients
              : [];
            const recipe = new Recipe(
              key,
              responseData[key].name,
              responseData[key].description,
              responseData[key].imgUrl,
              ingredients
            );
            recipes.push(recipe);
          }

          console.log(recipes);

          return recipes;
        }),
        tap((recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }

  createRecipe(id: string) {
    const recipe = this.recipeService.getRecipe(id);
    this.http
      .post("https://fastrecipes-a0b01.firebaseio.com/recipes.json", recipe)
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  createRecipes() {
    const recipes = this.recipeService.recipes;
    this.http
      .put("https://fastrecipes-a0b01.firebaseio.com/recipes.json", recipes)
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }
}
