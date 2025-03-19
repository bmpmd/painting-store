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
  filteredProducts:Product[] = [] 
  sortOrder = ''

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
        this.filteredProducts = data
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

  applyFilter(event: Event){
    //grab search term from event, happens each keypress
    let searchTerm = (event.target as HTMLInputElement).value
    searchTerm = searchTerm.toLowerCase()

    //filter products
    this.filteredProducts = this.products.filter(
      product => product.name.toLowerCase().includes(searchTerm)
    )

    //apply current sort method 
    this.sortProducts(this.sortOrder)

  }

  sortProducts(value:string){
    this.sortOrder = value;

    if(this.sortOrder === "lowToHigh"){
      this.filteredProducts.sort((a, b) => a.price - b.price)

    }
    else if (this.sortOrder=== "highToLow"){
      this.filteredProducts.sort((a,b) => b.price - a.price)
    }
    else if(this.sortOrder === 'alphabetical'){
      this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
    }
   
  }
  

}
