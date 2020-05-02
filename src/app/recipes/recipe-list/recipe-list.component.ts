import { Component, OnInit, OnDestroy } from "@angular/core";
import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Array<Recipe> = [];
  subscription: Subscription;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.recipes;
    this.subscription = this.recipeService.onUpdatedRecipe.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
  }

  onNewRecipe() {
    //sono già su recipes quindi scrivo solo new (il parametro)
    this.router.navigate(["new"], { relativeTo: this.activatedRoute });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
