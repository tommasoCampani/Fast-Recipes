import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Recipe } from "../../recipe.model";

@Component({
  selector: "recipe-item",
  templateUrl: "./recipe-item.component.html",
  styleUrls: ["./recipe-item.component.css"]
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Output() selectRecipe = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onRecipeSelect = () => {
    this.selectRecipe.emit();
  };
}
