import { Component, OnInit } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

@Component({
  selector: "shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"]
})
export class ShoppingListComponent implements OnInit {
  ingredients: Array<Ingredient> = [
    new Ingredient("apple", 5),
    new Ingredient("tomato", 10)
  ];
  constructor() {}

  ngOnInit(): void {}

  onIngredientAdded = (ingredient: Ingredient) => {
    this.ingredients.push(ingredient);
  };
}
