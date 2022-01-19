import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';
import { KitchenService } from '../services/kitchen.service';
import {
  GetCartMenus,
  GetMenus,
  GetSpeciality,
  RemoveCartItems,
  UpdateQauntity,
} from './kitchen.actions';
import { KitchenStateModel } from './model';

@State<KitchenStateModel>({
  name: 'KState',
})
@Injectable()
export class KitchenState {
  constructor(private kitchenService: KitchenService) {}

  @Action(GetMenus)
  getMenus(ctx: StateContext<KitchenStateModel>) {
    ctx.patchState({
      menus: {
        ...ctx.getState().menus,
        loading: true,
      },
    });

    return this.kitchenService.getMenus().pipe(
      distinctUntilChanged(),
      tap((menus) => {
        ctx.patchState({
          menus: {
            items: menus,
            loading: false,
          },
        });
      })
    );
  }

  @Action(GetSpeciality)
  getSpeciality(ctx: StateContext<KitchenStateModel>) {
    ctx.patchState({
      specility: {
        ...ctx.getState().specility,
        loading: true,
      },
    });

    return this.kitchenService.getSpeciality().pipe(
      distinctUntilChanged(),
      tap((menus) => {
        ctx.patchState({
          specility: {
            items: menus,
            loading: false,
          },
        });
      })
    );
  }

  @Action(GetCartMenus)
  getCartMenus(ctx: StateContext<KitchenStateModel>) {
    ctx.patchState({
      cartMenus: {
        ...ctx.getState().cartMenus,
        loading: true,
      },
    });

    return this.kitchenService.getCartMenus().pipe(
      map((menus) => menus.filter((menu) => menu.quantity > 0)),
      tap((menus) => {
        ctx.patchState({
          cartMenus: {
            items: menus,
            loading: false,
          },
        });
      })
    );
  }

  @Action(UpdateQauntity)
  updateQauntity(
    ctx: StateContext<KitchenStateModel>,
    { menuId, quantity }: UpdateQauntity
  ) {
    return this.kitchenService.putMenus(menuId, quantity).pipe(
      map((menus) => menus.filter((menu) => menu.quantity > 0)),
      tap((menus) => {
        ctx.patchState({
          cartMenus: {
            items: menus,
            loading: false,
          },
        });
      })
    );
  }

  @Action(RemoveCartItems)
  removeCartItems(ctx: StateContext<KitchenStateModel>) {
    return this.kitchenService.deleteMenus().pipe(
      tap(() => {
        ctx.patchState({
          cartMenus: {
            items: [],
            loading: false,
          },
        });
      })
    );
  }
}
