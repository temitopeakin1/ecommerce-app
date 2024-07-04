import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../services/product.service';
import { HotToastService } from '@ngneat/hot-toast';
import { CartItem } from '../../../models/cart';
import { Product } from '../../../product';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  productList: Product[] = [];
  filteredProductList: Product[] = [];
  filterValue: string = 'Default';
  listFilter: string = '';
  items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20];
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
    this.fetchProducts();
  }

  // Fetch all products
  fetchProducts() {
    this.Loading = true;
    this.productService.getAllProducts().subscribe((res: any) => {
      this.productList = res.products;
      this.filteredProductList = this.productList;
      this.applyFilter();
      this.Loading = false;
    });
  }

  // Add product to cart
  addProductToCart(item: Product) {
    const cartItem: CartItem = {
      product: item,
      quantity: 1,
    };
    this.cartService.setCartItem(cartItem);
    this.toast.success('Product added to cart successfully', {
      position: 'top-left',
    });
  }

  applyFilter() {
    let tempList = this.productList;

    if (this.listFilter) {
      tempList = tempList.filter(product =>
        product.title.toLowerCase().includes(this.listFilter.toLowerCase())
      );
    }

// Sort products
    switch (this.filterValue) {
      case 'Low to High':
        tempList = tempList.sort((a, b) => a.price - b.price);
        break;
      case 'High to Low':
        tempList = tempList.sort((a, b) => b.price - a.price);
        break;
      case 'A to Z':
        tempList = tempList.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'Z to A':
        tempList = tempList.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    this.filteredProductList = tempList;
  }
}
