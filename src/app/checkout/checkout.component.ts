import { Router } from '@angular/router';
import { element } from 'protractor';
import { Observable } from 'rxjs';
import { Popover } from '@ivylab/angular-popover';
import { DataService } from './../data.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('one') one: ElementRef;
  @ViewChild('two') two: ElementRef;
  @ViewChild('three') three: ElementRef;
  @ViewChild('four') four: ElementRef;
  public cartData = [];
  public total = new Observable<number>();
  public payload = {
    date: '01',
    four: '',
    name: '',
    one: '',
    pin: '',
    three: '',
    two: '',
    year: '2020'
  };
  constructor(private dataService: DataService, private popover: Popover, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.popover.close();
    this.dataService.updateCartButton(false);
    this.total = this.dataService.getTotalAmount();
    this.dataService.getCartData().subscribe((res) => {
      this.cartData = [...res];
    }, (err) => {
      console.log(err);
    })
  }

  cardNumber(element) {
    if (element === 'one' && this.payload[element].length === 4) {
      this.two.nativeElement.focus();
    } else if (element === 'two' && this.payload[element].length === 4) {
      this.three.nativeElement.focus();
    } else if (element === 'three' && this.payload[element].length === 4) {
      this.four.nativeElement.focus();
    }
  }

  check() {
    for (const key in this.payload) {
      if (this.payload[key] == '' || this.payload[key] == undefined || this.payload[key] == null) {
        this.toastr.error('Please fill all the fields.', 'Error!');
        return;
      }
    }
    this.toastr.success('Congartulations!! Your items will be shipped shortly.', 'Success!');
    this.dataService.updateCartButton(true);
    this.dataService.updateCartData([]);
    this.dataService.updateCartItemCount(0);
    this.dataService.updateTotalAmount(0);
    sessionStorage.setItem('count', '0');
    this.router.navigate(['/']);
  }

}
