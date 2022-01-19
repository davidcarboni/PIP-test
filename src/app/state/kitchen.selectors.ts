import { Selector } from '@ngxs/store';
import { KitchenState } from './kitchen.state';
import { KitchenStateModel } from './model';

export class KitchenSelectors {
  @Selector([KitchenState])
  static menus({ menus }: KitchenStateModel) {
    return menus.items;
  }

  @Selector([KitchenState])
  static menusLoading({ menus }: KitchenStateModel) {
    return menus.loading;
  }

  @Selector([KitchenState])
  static specility({ specility }: KitchenStateModel) {
    return specility.items;
  }

  @Selector([KitchenState])
  static specilityLoading({ specility }: KitchenStateModel) {
    return specility.loading;
  }

  @Selector([KitchenState])
  static cartMenusCount({ cartMenus }: KitchenStateModel) {
    return cartMenus.items.reduce((a, b) => +a + +b.quantity, 0);
  }

  @Selector([KitchenState])
  static cartMenus({ cartMenus }: KitchenStateModel) {
    return cartMenus.items.length > 0 ? cartMenus.items : undefined;
  }
  @Selector([KitchenState])
  static cartMenusLoading({ cartMenus }: KitchenStateModel) {
    return cartMenus.loading;
  }
}
