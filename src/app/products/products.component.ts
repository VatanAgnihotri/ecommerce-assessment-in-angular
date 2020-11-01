import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';

interface Products {
  id: number;
  name: string;
  description: string;
  price: string;
  quantity: string | number;
  image: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public products: Products[];
  public inCart = [];
  public cartItems: Products[] = [];
  constructor(private dataService: DataService) {

  }

  ngOnInit() {
    const self = this;
    this.dataService.updateCartButton(true);
    self.dataService.getData().subscribe((res: any) => {
      self.products = res.data;
      console.log('Data :: ', res);
    }, (error) => {
      console.log(error);
    });
    self.dataService.getCartData().subscribe((res: any) => {
      self.cartItems = res;
      self.inCart = [];
      self.inCart = self.cartItems.map(data => data.id);
    })
  }

  addInCart(flag, p) {
    const self = this;
    if (flag) {
      const idIndex = self.inCart.findIndex(res => res === p.id);
      const prodcutIndex = self.cartItems.findIndex(res => res.id === p.id);
      idIndex === -1 ? self.inCart.push(p.id) : '';
      if (prodcutIndex === -1) {
        const newObj: Products = p;
        newObj.quantity = 1;
        self.cartItems.push(newObj);
      }
    } else {
      const idIndex = self.inCart.findIndex(res => res === p.id);
      const prodcutIndex = self.cartItems.findIndex(res => res.id === p.id);
      idIndex !== -1 ? self.inCart.splice(idIndex, 1) : '';
      prodcutIndex !== -1 ? self.cartItems.splice(prodcutIndex, 1) : '';
    }
    self.dataService.updateCartItemCount(self.inCart.length);
    self.dataService.updateCartData([...self.cartItems]);
    console.log("CartIds = ", self.inCart);
    console.log("Cart Items = ", self.cartItems);
  }

}
