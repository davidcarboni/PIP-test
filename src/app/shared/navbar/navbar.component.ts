import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetCartMenus } from '../../state/kitchen.actions';
import { KitchenSelectors } from '../../state/kitchen.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  cartItemsCount$ = this.state.select(KitchenSelectors.cartMenusCount);
  constructor(private state: Store) {
    this.state.dispatch(new GetCartMenus());
  }
}
