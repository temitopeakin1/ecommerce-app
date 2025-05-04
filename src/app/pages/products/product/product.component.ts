import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { HotToastService } from '@ngneat/hot-toast';
import { CartItem } from '../../../models/cart';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css'],
    standalone: false
})
export class ProductComponent implements OnInit {
  @Input() product: any;

  constructor(
    private _cartService: CartService,
    private _toast: HotToastService
  ) {}

  ngOnInit(): void {}

  addProductToCart(item: any) {
    const cartItem: CartItem = {
      product: item,
      quantity: 1,
    };
    this._cartService.setCartItem(cartItem);
    this._toast.success('Product added successfully', {
      position: 'top-left',
    });
  }
}
