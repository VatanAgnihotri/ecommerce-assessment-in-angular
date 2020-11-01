import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private enableCartButton = new BehaviorSubject(true);
  private count = new BehaviorSubject(0);
  private totalAmount = new BehaviorSubject(0);
  private cartData = new BehaviorSubject([]);
  constructor(private http: HttpClient) {

  }

  getData() {
    const self = this;
    const url = `https://www.mocky.io/v2/5eda4003330000740079ea60`;
    return self.http.get(url);
  }

  updateCartItemCount(c) {
    this.count.next(c);
    this.saveCountInStorage();
  }

  getUpdateCount() {
    return this.count.asObservable();
  }

  saveCountInStorage() {
    this.getUpdateCount().subscribe((res) => {
      sessionStorage.setItem('count', res.toString());
    })
  }

  updateCartData(data) {
    this.cartData.next(data);
  }

  updateCartButton(flag) {
    this.enableCartButton.next(flag);
  }

  getCartButtonStatus() {
    return this.enableCartButton.asObservable();
  }

  getCartData() {
    return this.cartData.asObservable();
  }

  updateTotalAmount(data) {
    return this.totalAmount.next(data);
  }

  getTotalAmount() {
    return this.totalAmount.asObservable();
  }

}
