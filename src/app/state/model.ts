export interface Entity<T> {
  items: T;
  loading: boolean;
}

export interface KitchenStateModel {
  menus: Entity<IMenu[]>;
  cartMenus: Entity<IMenu[]>;
  specility: Entity<ISpeciality[]>;
}

export interface IMenu {
  id: number;
  foodName: string;
  foodDetails: string;
  foodPrice: number;
  foodImg: string;
  quantity: number;
}

export interface ISpeciality {
  id: number;
  name: string;
  image: string;
}
