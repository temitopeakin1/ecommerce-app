import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

import { CartService } from '../../pages/services/cart.service';
import { CartItem } from '../../models/cart';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
    standalone: false
})
export class CartComponent implements OnInit {

  cartCount = 0;
  totalPrice!: number;
  opanCartlist: boolean = false;
  isVisible: boolean = false;
  cartList!: CartItem[];
  deleteProductId!: string;
  constructor
    (
      private router: Router,
      private cartService: CartService,
      private _toast: HotToastService
    ) { }


  openCartlist() {
    this.getCartList();
    this.opanCartlist = true;
    document.body.style.overflowY = "hidden";
  }


  closeSidebar() {
    this.opanCartlist = false;
    document.body.style.overflowY = "auto";
  }

  getCartList() {
    this.cartService.cart$.subscribe((cart) => {
      this.cartList = cart.items!;
    });
  }


  deleteCartItem() {
    this.cartService.deleteCartItem(this.deleteProductId);
    this.closeCofirmModal();
    this._toast.error('Product removed from cart',
      {
        position: 'top-left'
      });

  }

  getTotalPrice() {
    this.cartService.cart$.subscribe((cart) => {
      this.totalPrice = 0;
      if (cart) {
        cart.items?.map((item) => {
          this.totalPrice += item.product.price! * item.quantity!;
        });
      }
    });
  }


  updateCartItemQuantity(value: number, cartItem: CartItem, operation: string) {
    if (operation == "+") {
      value++;
    } else {
      value--;
    }
    this.cartService.setCartItem(
      {
        product: cartItem.product,
        quantity: value,
      },
      true
    );
  }


  navigateToCheckout() {
    this.closeSidebar();
    this.router.navigate(['/checkout']);
  }

  navigateToProductDetails(productId: string) {
    this.closeSidebar();
    this.router.navigate(['/products', productId]);
  }

  openCofirmModal(productId: string) {
    this.isVisible = true;
    this.deleteProductId = productId
  }

  closeCofirmModal() {
    this.isVisible = false;
  }
  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      this.cartCount = cart?.items?.length ?? 0;
    });
    this.getCartList();
    this.getTotalPrice();
  }

}
