import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormControl, FormArray } from "@angular/forms";
import { RecipeService } from "../recipe.service";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  recipeForm: FormGroup;

  get controls() {
    return (<FormArray>this.recipeForm.get("ingredients")).controls;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = "";
    let recipeUrl = "";
    let recipeDescription = "";
    let recipeIngredientsCtrl = new FormArray([]);

    if (this.editMode) {
      const currentRecipe = this.recipeService.getRecipe(this.id);
      recipeName = currentRecipe.name;
      recipeUrl = currentRecipe.imgUrl;
      recipeDescription = currentRecipe.description;

      if (currentRecipe["ingredients"]) {
        for (let ingredient of currentRecipe.ingredients) {
          recipeIngredientsCtrl.push(
            new FormGroup({
              ingName: new FormControl(ingredient.name),
              ingAmount: new FormControl(ingredient.amount),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, []),
      imageUrl: new FormControl(recipeUrl, []),
      description: new FormControl(recipeDescription, []),
      ingredients: recipeIngredientsCtrl,
    });
  }

  onSubmit() {
    console.log("Submit", this.recipeForm.value);
  }
}
