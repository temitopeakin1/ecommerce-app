import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../../models/cart';



export const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());

  constructor() {
    this.initCartLocalStorage();
  }

  initCartLocalStorage() {
    if (typeof localStorage !== 'undefined') {
      const cart: Cart = this.getCart();
      if (!cart) {
        const initialCart = { items: [] };
        const initialCartJson = JSON.stringify(initialCart);
        localStorage.setItem(CART_KEY, initialCartJson);
      }
    }
  }

  emptyCart() {
    if (typeof localStorage !== 'undefined') {
      const initialCart = { items: [] };
      const initialCartJson = JSON.stringify(initialCart);
      localStorage.setItem(CART_KEY, initialCartJson);
      this.cart$.next(initialCart);
    }
  }

  getCart(): Cart {
    if (typeof localStorage !== 'undefined') {
      const cartJsonString = localStorage.getItem(CART_KEY);
      if (cartJsonString) {
        const cart: Cart = JSON.parse(cartJsonString);
        return cart;
      }
    }
    return { items: [] }; // Return an empty cart if localStorage is not available
  }

  setCartItem(cartItem: CartItem, updateCartItem?: boolean): Cart {
    const cart = this.getCart();
    const cartItemExist = cart.items?.find((item) => item.product.id === cartItem.product.id);
    if (cartItemExist) {
      cart.items?.map((item) => {
        if (item.product.id === cartItem.product.id) {
          if (updateCartItem) {
            item.quantity = cartItem.quantity;
          } else {
            item.quantity = item.quantity! + cartItem.quantity!;
          }
        }
      });
    } else {
      cart.items?.push(cartItem);
    }

    if (typeof localStorage !== 'undefined') {
      const cartJson = JSON.stringify(cart);
      localStorage.setItem(CART_KEY, cartJson);
      this.cart$.next(cart);
    }
    return cart;
  }

  deleteCartItem(productId: string) {
    const cart = this.getCart();
    const newCart = cart.items?.filter((item: any) => item.product.id !== productId);
    cart.items = newCart;

    if (typeof localStorage !== 'undefined') {
      const cartJsonString = JSON.stringify(cart);
      localStorage.setItem(CART_KEY, cartJsonString);
      this.cart$.next(cart);
    }
  }
}
