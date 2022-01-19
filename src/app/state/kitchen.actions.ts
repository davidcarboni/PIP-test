export class GetMenus {
  static readonly type = '[KState] GetMenus';
}

export class GetSpeciality {
  static readonly type = '[KState] GetSpeciality';
}

export class UpdateQauntity {
  static readonly type = '[KState] UpdateQauntity';
  constructor(public menuId: number, public quantity: number = 0) {}
}

export class RemoveCartItems {
  static readonly type = '[KState] RemoveCartItems';
}

export class GetCartMenus {
  static readonly type = '[KState] GetCartMenus';
}
