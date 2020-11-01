import { CartComponent } from './../cart/cart.component';
import { Observable } from 'rxjs';
import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { Popover } from '@ivylab/angular-popover';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public count = new Observable<number>();
  public showCart = new Observable<boolean>();
  constructor(private dataService: DataService, private popover: Popover) { }

  ngOnInit() {
    this.showCart = this.dataService.getCartButtonStatus();
    this.count = this.dataService.getUpdateCount();
  }

  openCart(e) {
    this.popover.load({
      event: e,
      component: CartComponent
    })
  }

}
