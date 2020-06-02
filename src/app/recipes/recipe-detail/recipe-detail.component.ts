import { Component, OnInit, Input } from "@angular/core";
import { Recipe } from "../recipe.model";
import { Ingredient } from "src/app/shared/ingredient.model";
import { RecipeService } from "../recipe.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: "recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"],
})
export class RecipeDetailComponent implements OnInit {
  selectedRecipe: Recipe;

  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.selectedRecipe = this.recipeService.getRecipe(params["id"]);
    });
  }

  onShoppingListAdded(ingredients: Ingredient[]) {
    this.recipeService.addIngredientsToShoppingList(ingredients);
    this.router.navigate(["/shopping-list"]);
  }

  onEditRecipe() {
    this.router.navigate(["edit"], { relativeTo: this.activatedRoute });
    /*this.router.navigate(["../", this.selectedRecipe.id, "edit"], {
      relativeTo: this.activatedRoute,
    });*/
  }

  onDeleteRecipe(id: string) {
    this.recipeService.deleteRecipe(id);
    this.router.navigate(["/recipes"], { relativeTo: this.activatedRoute });
  }
}
