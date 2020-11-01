import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public cartItems = [];
  public total = 0;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    console.log("Cart component");
    this.dataService.getCartData().subscribe((res) => {
      this.cartItems = res;
      this.getTotal();
    })
  }

  checkQuantity(e, product) {
    const self = this;
    const quantity = e.target.value;
    // debugger;
    if (!(/^[0-9]*$/.test(quantity))) {
      e.target.value = quantity.slice(0, -1);
      product.quantity = quantity.slice(0, -1);
      return;
    }
    if (quantity === '0') {
      self.removeItem(product);
    }
    self.getTotal();
  }

  getTotal() {
    const self = this;
    self.total = 0;
    self.cartItems.forEach((res) => {
      self.total += (res.price * (res.quantity !== '' ? res.quantity : 1));
    });
    self.dataService.updateTotalAmount(self.total);
  }

  removeItem(product, e?) {
    const self = this;
    if (e) { e.stopPropagation(); }
    const index = self.cartItems.findIndex(res => res.id === product.id);
    index !== -1 ? self.cartItems.splice(index, 1) : '';
    self.dataService.updateCartData([...self.cartItems]);
    self.dataService.updateCartItemCount(self.cartItems.length);
    self.getTotal();
  }

}
