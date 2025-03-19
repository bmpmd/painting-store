import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../product.service';
import { CartService } from '../../cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{

  // prop to show products
  products:Product[] = []

  //inject 
  constructor(private productService: ProductService,
    private cartService:CartService,
    private snackbar:MatSnackBar
  ){}

  //fill prop with products
  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      data => {
        this.products = data
      }
    )
      
  }

  addToCart(product:Product):void{
    //when async done, call snackbar 
    this.cartService.addToCart(product).subscribe({
      next: ()=>{
        this.snackbar.open("Added product to cart!", "", {
          duration: 2000,
          horizontalPosition: "right",
          verticalPosition: "top"
        
        })

      }
    })


  }
  

}
