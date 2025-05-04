import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { HotToastService } from '@ngneat/hot-toast';
import { CartItem } from '../../../models/cart';


@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.css'],
    standalone: false
})
export class ProductDetailsComponent implements OnInit {
  backgroundPos: string = 'center center';
  startPosition: number = 0;
  @ViewChild('myCarousel') myCarousel!: ElementRef;

  slider1Settings: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    // navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: false,
    startPosition: this.startPosition,
  };

  slider2Settings: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    margin: 10,
    dots: false,
    navSpeed: 700,
    center: true,
    // navText: ['', ''],
    responsive: {
      0: {
        items: 3,
      },
      400: {
        items: 3,
      },
      740: {
        items: 3,
      },
      940: {
        items: 3,
      },
    },
    nav: false,
    // animateOut: 'slideOutUp',
    // animateIn: 'slideInUp'
  };

  slider3Settings: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    margin: 10,
    dots: false,
    navSpeed: 700,
    navText: [
      '<i class="fa-solid fa-arrow-left"></i>',
      '<i class="fa-solid fa-arrow-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 3,
      },
      940: {
        items: 5,
      },
      1200: {
        items: 5,
      },
      1400: {
        items: 5,
      },
      1600: {
        items: 5,
      },
    },
    nav: true,
  };

  product: any;
  productId!: number;
  categoryId!: number;
  imgNotFounded: boolean = false;
  cartList!: CartItem[];
  quantity!: number;
  loremText: string = `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto, quos aspernatur eum dolorr eprehenderit eos et libero debitis itaque voluptatem! Laudantium modi sequi, id numquam liberosed quaerat. Eligendi, ipsum!`;
  categoryProducts: any;
  productInCartList: any;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
      this.getproduct();
      this.getCartList();
    });
  }

  ZoomImage(event: any) {
    const { left, top, width, height } = event.target.getBoundingClientRect();
    const x = ((event.pageX - left) / width) * 100;
    const y = ((event.pageY - top) / height) * 100;
    this.backgroundPos = `${x}% ${y}%`;
  }

  nextSlide(event: any) {
    if (event.dragging == false) {
      this.startPosition = event.data.startPosition;
      const anyService = this.myCarousel as any;
    }
  }

  getproduct() {
    this.productService.getSingleProduct(this.productId).subscribe((data) => {
      this.product = data;
      this.categoryId = data.category.id;
      this.fetchProductCategory(this.categoryId);
      this.productInCartList = this.checkProductInCartList(data);
      if (data.images.length == 1) {
        this.imgNotFounded = true;
      }
    });
  }

  getCartList() {
    this.cartService.cart$.subscribe((cart) => {
      this.cartList = cart.items!;
      if (this.product) {
        this.productInCartList = this.checkProductInCartList(this.product);
      }
    });
  }

  checkProductInCartList(product: any) {
    const cartItemExist = this.cartList.find(
      (item) => item.product.id === product.id
    );
    this.quantity = cartItemExist?.quantity || 0;
    return cartItemExist;
  }

  updateCartItemQuantity(value: number, product: any, operation: string) {
    if (operation == '+') {
      value++;
    } else {
      value--;
    }
    this.cartService.setCartItem(
      {
        product: product,
        quantity: value,
      },
      true
    );
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

  fetchProductCategory(id: number) {
    this.productService.getProductsByCategory(id).subscribe((data) => {
      this.categoryProducts = data;
    });
  }
}
