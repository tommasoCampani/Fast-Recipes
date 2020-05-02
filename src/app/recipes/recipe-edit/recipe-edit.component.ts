import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { RecipeService } from "../recipe.service";
import { Recipe } from "../recipe.model";

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
    private recipeService: RecipeService,
    private router: Router
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
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9][0-9]*$/),
              ]),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, [Validators.required]),
      imgUrl: new FormControl(recipeUrl, [Validators.required]),
      description: new FormControl(recipeDescription, [Validators.required]),
      ingredients: recipeIngredientsCtrl,
    });
  }

  onSubmit() {
    let newRecipe = new Recipe(
      this.id,
      this.recipeForm.get("name").value,
      this.recipeForm.get("description").value,
      this.recipeForm.get("imgUrl").value,
      this.recipeForm.get("ingredients").value
    );

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe);
    } else {
      this.recipeService.saveRecipe(newRecipe);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.activatedRoute });
  }

  onAddIngredient() {
    let ingredient = <FormArray>this.recipeForm.get("ingredients");
    ingredient.push(
      new FormGroup({
        name: new FormControl("", Validators.required),
        amount: new FormControl(1, [
          Validators.required,
          Validators.pattern(/^[1-9][0-9]*$/),
        ]),
      })
    );
  }

  onRemoveIngredient(index: number) {
    let ingredient = <FormArray>this.recipeForm.get("ingredients");
    ingredient.removeAt(index);
  }
}
