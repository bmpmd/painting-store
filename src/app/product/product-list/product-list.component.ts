import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{

  // prop to show products
  products:Product[] = []

  //inject 
  constructor(private productService: ProductService){}

  //fill prop with products
  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      data => {
        this.products = data
      }
    )
      
  }
  

}
