import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  Output,
} from "@angular/core";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from "../shopping-list.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild("slForm", { static: false }) slForm: NgForm;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  editingItem: Ingredient;
  editingItemIdx: number;
  editMode: boolean = false;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.shoppingListService.onEditIngredient.subscribe((idx: number) => {
      this.editingItemIdx = idx;
      this.editingItem = this.shoppingListService.getIngredientByIdx(idx);
      this.editMode = true;
      this.slForm.setValue({
        name: this.editingItem.name,
        amount: this.editingItem.amount,
      });
    });
  }

  onSubmit = () => {
    var formValue = this.slForm.value;
    var newIngredient = new Ingredient(formValue.name, formValue.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(
        this.editingItemIdx,
        newIngredient
      );
    } else {
      this.shoppingListService.addIngredients(newIngredient);
    }
    this.editMode = false;
    this.slForm.reset({
      name: "",
      amount: 1,
    });
  };

  onRemoveIngredient = () => {
    this.shoppingListService.deleteIngredient(this.editingItemIdx);
    this.onClearData();
  };

  onClearData = () => {
    this.editMode = false;
    this.slForm.reset({
      name: "",
      amount: 1,
    });
  };
}
