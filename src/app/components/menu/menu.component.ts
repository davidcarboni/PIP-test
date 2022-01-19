import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetMenus, UpdateQauntity } from '../../state/kitchen.actions';
import { KitchenSelectors } from '../../state/kitchen.selectors';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  constructor(private state: Store) {}
  menus$ = this.state.select(KitchenSelectors.menus);
  menusLoading$ = this.state.select(KitchenSelectors.menusLoading);
  more: boolean = false;
  ngOnInit(): void {
    this.state.dispatch(new GetMenus());
  }

  add(menuId: number, quantity: number) {
    this.state.dispatch(new UpdateQauntity(menuId, ++quantity));
  }

  remove(menuId: number, quantity: number) {
    this.state.dispatch(new UpdateQauntity(menuId, --quantity));
  }
}
