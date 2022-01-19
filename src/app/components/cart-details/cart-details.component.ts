import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetCartMenus, UpdateQauntity } from '../../state/kitchen.actions';
import { KitchenSelectors } from '../../state/kitchen.selectors';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartDetailsComponent implements OnInit {
  total$: Observable<number> | undefined;
  cartMenus$ = this.state.select(KitchenSelectors.cartMenus);
  cartMenusLoading$ = this.state.select(KitchenSelectors.cartMenusLoading);

  constructor(private state: Store) {}
  ngOnInit(): void {
    this.state.dispatch(new GetCartMenus());
    this.getCartTotal();
  }

  removeOrder(menuId: number) {
    const confirmResult = confirm('Are you sure you want delete order?');
    if (confirmResult) this.deleteOrder(menuId);
  }
  add(menuId: number, quantity: number) {
    this.state.dispatch(new UpdateQauntity(menuId, ++quantity));
    this.getCartTotal();
  }
  remove(menuId: number, quantity: number) {
    if (quantity) this.state.dispatch(new UpdateQauntity(menuId, --quantity));
    this.getCartTotal();
  }

  private deleteOrder(menuId: number) {
    this.state.dispatch(new UpdateQauntity(menuId, 0));
    this.getCartTotal();
  }

  private getCartTotal() {
    this.total$ = this.cartMenus$.pipe(
      map((x) => {
        if (x) {
          return x.reduce((p, c) => (p += c.foodPrice * c.quantity), 0);
        }
        return 0;
      })
    );
  }
}
