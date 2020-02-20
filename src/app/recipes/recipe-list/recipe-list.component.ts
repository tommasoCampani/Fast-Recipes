import { Component, OnInit } from "@angular/core";
import { Recipe } from "../recipe.model";

@Component({
  selector: "recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"]
})
export class RecipeListComponent implements OnInit {
  recipes: Array<Recipe> = [
    new Recipe(
      "Test Recipe",
      "This is a test recipe",
      "https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg"
    ),
    new Recipe(
      "Test Recipe 2",
      "This is a test recipe 2",
      "https://www.recipemasters.in/wp-content/uploads/2015/05/DSC_1075.jpg"
    )
  ];
  constructor() {}

  ngOnInit(): void {}
}
