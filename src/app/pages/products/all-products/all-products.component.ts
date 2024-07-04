import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../services/product.service';
import { HotToastService } from '@ngneat/hot-toast';
import { CartItem } from '../../../models/cart';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  productList: any[] = [];
  PageNumber: number = 1;
  numberOfPages: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  isFavourite: boolean = false;
  fliterValue: string = 'Default';
  items = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22,
  ];
  Loading: boolean = false;

  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  limit: number = 20;
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private toast: HotToastService
  ) {}


  ngOnInit(): void {
    debugger;
    this.fetchProducts();
  }

  //fetch all products
  fetchProducts() {
    this.Loading = true;
    this.productService.getAllProducts().subscribe((res: any) => {
      this.productList = res.products;
    });
  }

  addProductToCart(item: any) {
    const cartItem: CartItem = {
      product: item,
      quantity: 1,
    };
    this.cartService.setCartItem(cartItem);
    this.toast.success('Product added to cart successfully', {
      position: 'top-left',
    });
  }


}
