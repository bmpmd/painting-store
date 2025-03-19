import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrl: './cart-view.component.css'
})
export class CartViewComponent implements OnInit {


  //prop  to show on template
  cart: Product[] = []
  totalPrice = 0;

  //inject service 
  constructor(private cartService:CartService){}

  //populate prop using injected service 
  ngOnInit(): void {
      this.cartService.getCart().subscribe(
        data => {
          this.cart = data
          this.totalPrice = this.getTotalPrice()
        }
      )
  }

  getTotalPrice(): number{
    let x = 0; 
    for(let y of this.cart){
      x += y.price
    }
    return x
  }

  clearCart():void{
    this.cartService.clearCart().subscribe()
  }
  checkout(cart:Product[]){
    this.cartService.checkout(cart).subscribe()
  }


  

}
