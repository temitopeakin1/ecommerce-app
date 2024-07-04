import { Component, HostListener, OnInit } from '@angular/core';
import { CartService } from '../../pages/services/cart.service';
import { Product } from '../../product';
import { ProductService } from '../../pages/products/services/product.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  cartCount = 1;
  sticky: boolean = false;
  private _listFilter = "";
  filteredProducts: Product[] = [];
  productList: Product[] = [];

  constructor(private cartService: CartService, private productService: ProductService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      this.cartCount = cart?.items?.length ?? 0;
    });

    this.productService.getAllProducts().subscribe((products: Product[]) => {
      this.productList = products;
      this.filteredProducts = this.productList;
    });
  }

  // filter method implementation
  performFilter(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.productList.filter((product: Product) =>
      product.title.toLocaleLowerCase().includes(filterBy)
    );
  }

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.performFilter(value);
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.scrollY;
    if (windowScroll >= 300) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }
}
