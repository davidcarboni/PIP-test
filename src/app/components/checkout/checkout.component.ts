import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { RemoveCartItems } from '../../state/kitchen.actions';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;

  get f() {
    return this.checkoutForm.controls;
  }
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private state: Store
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  onSubmit() {
    if (this.checkoutForm.invalid) {
      return;
    }
    if (this.checkoutForm.valid) {
      this.state.dispatch(new RemoveCartItems());
      this.router.navigate(['confirmation']);
    }
  }

  onReset() {
    this.checkoutForm.reset();
  }

  private createForm() {
    this.checkoutForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[0-9 ]{11}')]],
      address: ['', Validators.required],
    });
  }
}
