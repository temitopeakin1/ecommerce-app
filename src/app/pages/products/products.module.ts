import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
//import { AllProductsComponent } from './all-products/all-products.component';
import { Routes, RouterModule } from "@angular/router";
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';
import { ProductDetailsComponent } from "./product-details/product-details.component";
import { ProductComponent } from "./product/product.component";
import { ProductsComponent } from "./products.component";
import { AllProductsComponent } from "./all-products/all-products.component";
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { FilterPipe } from "./pipe/filter.pipe";



const routes: Routes = [
    {
        path: '',
        component: ProductsComponent,
        children: [
          {
            path: '',
            component: AllProductsComponent,
          },
          {
            path: ':id',
            component: ProductDetailsComponent,
          },
        ],
      },
]

@NgModule({
    declarations: [
        ProductsComponent,
        AllProductsComponent,
        ProductDetailsComponent,
        ProductComponent,
        FilterPipe
    ],
    imports: [
        CommonModule,
        CarouselModule,
        FormsModule,
        RouterModule.forChild(routes),
        NgxSkeletonLoaderModule,
        InfiniteScrollModule,
      ]

})

export class ProductsModule {}