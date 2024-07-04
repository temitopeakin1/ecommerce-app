import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { FormsModule } from '@angular/forms';
import { ConfirmModelComponent } from './confirm-model/confirm-model.component';

@NgModule({
  declarations: [CartComponent, ConfirmModelComponent],
  imports: [CommonModule],
  exports: [CommonModule, FormsModule, CartComponent],
  
})
export class SharedModule {}
