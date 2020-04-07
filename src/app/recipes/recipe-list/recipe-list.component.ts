import { Component, OnInit } from "@angular/core";
import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"],
})
export class RecipeListComponent implements OnInit {
  recipes: Array<Recipe> = [];

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.recipes;
  }

  onNewRecipe() {
    //sono già su recipes quindi scrivo solo new (il parametro)
    this.router.navigate(["new"], { relativeTo: this.activatedRoute });
  }
}
