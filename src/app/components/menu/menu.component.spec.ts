import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { GetMenus } from '../../state/kitchen.actions';
import { KitchenState } from '../../state/kitchen.state';
import { IMenu } from '../../state/model';
import { MenuComponent } from './menu.component';
const mockFoodDetails: IMenu[] = [
  {
    id: 1,
    foodName: 'Grilled Sandwich',
    foodDetails:
      'All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary',
    foodPrice: 4,
    foodImg:
      'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/wzfq7djolqxgdhghebbq',
    quantity: 0,
  },
  {
    id: 2,
    foodName: 'Veggie Supreme',
    foodDetails:
      'All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.',
    foodPrice: 3,
    foodImg:
      'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/sgbobtbxlojbtdnr2m5k',
    quantity: 0,
  },
];
describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuComponent],
      providers: [
        {
          provide: Store,
          useValue: {
            select: () => of([]),
            dispatch: () => of({}),
          },
        },
      ],
      imports: [NgxsModule.forRoot([KitchenState])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    Object.defineProperties(component, {
      menus$: {
        writable: true,
        value: of(
          mockFoodDetails.map((menu) => {
            menu.quantity = 0;
            return menu;
          })
        ),
      },
      menusLoading$: {
        writable: true,
        value: of(false),
      },
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should dispatch getMenus', () => {
      spyOn(component['state'], 'dispatch').and.callThrough();
      component.ngOnInit();
      expect(component['state'].dispatch).toHaveBeenCalledWith(new GetMenus());
    });
  });

  describe('spinner', () => {
    it('should be invisible when menuloading false', () => {
      expect(
        fixture.debugElement.nativeElement.querySelector('.spinner')
      ).toBeFalsy();
    });

    it('should be visible when menuloading true', () => {
      Object.defineProperties(component, {
        menusLoading$: {
          writable: true,
          value: of(true),
        },
      });

      fixture.detectChanges();

      expect(
        fixture.debugElement.nativeElement.querySelector('.spinner')
      ).toBeTruthy();
    });
  });

  describe('+Add button', () => {
    it('should be visible when quantity is 0', () => {
      const el = fixture.debugElement.nativeElement;

      expect(el.querySelector("[id='add2']")).toBeTruthy();
      expect(el.querySelector("[id='add-btn-2']")).toBeFalsy();
      expect(el.querySelector("[id='remove-btn-2']")).toBeFalsy();
      expect(el.querySelector("[id='quantity-input-2']")).toBeFalsy();
    });

    it('should not be visible when quantity is greater than 0', () => {
      const el = fixture.debugElement.nativeElement;

      Object.defineProperty(component, 'menus$', {
        writable: true,
        value: of(
          mockFoodDetails.map((menu) => {
            if (menu.id === 2) {
              menu.quantity = 2;
            }
            return menu;
          })
        ),
      });

      fixture.detectChanges();

      expect(el.querySelector("[id='add2']")).toBeFalsy();
      expect(el.querySelector("[id='add-btn-2']")).toBeTruthy();
      expect(el.querySelector("[id='remove-btn-2']")).toBeTruthy();
      expect(el.querySelector("[id='quantity-input-2']")).toBeTruthy();
    });
  });

  describe('add remove buttons', () => {
    it('should add quantity when plus button is clicked', () => {
      spyOn(component, 'add');
      fixture.detectChanges();
      const el = fixture.debugElement.nativeElement;
      el.querySelector("[id='add2']").click();
      fixture.detectChanges();
      expect(component.add).toHaveBeenCalledTimes(1);

      Object.defineProperty(component, 'menus$', {
        writable: true,
        value: of(
          mockFoodDetails.map((menu) => {
            if (menu.id === 2) {
              menu.quantity = 1;
            }
            return menu;
          })
        ),
      });

      fixture.detectChanges();

      expect(el.querySelector("[id='quantity-input-2']").value).toBe('1');
      expect(el.querySelector("[id='add2']")).toBeFalsy();
    });

    it('should remove quantity when minus button is clicked', () => {
      spyOn(component, 'remove');
      fixture.detectChanges();
      const el = fixture.debugElement.nativeElement;

      Object.defineProperty(component, 'menus$', {
        writable: true,
        value: of(
          mockFoodDetails.map((menu) => {
            if (menu.id === 2) {
              menu.quantity = 2;
            }
            return menu;
          })
        ),
      });

      fixture.detectChanges();

      el.querySelector("[id='remove-btn-2']").click();

      expect(el.querySelector("[id='quantity-input-2']").value).toBe('2');
      expect(component.remove).toHaveBeenCalledTimes(1);

      Object.defineProperty(component, 'menus$', {
        writable: true,
        value: of(
          mockFoodDetails.map((menu) => {
            if (menu.id === 2) {
              menu.quantity = 1;
            }
            return menu;
          })
        ),
      });

      fixture.detectChanges();

      expect(el.querySelector("[id='quantity-input-2']").value).toBe('1');
      expect(el.querySelector("[id='add2']")).toBeFalsy();
    });

    it('should hide +, - and quantity input if quantity reach to 0 and show +Add button', () => {
      spyOn(component, 'remove');
      fixture.detectChanges();
      const el = fixture.debugElement.nativeElement;

      Object.defineProperty(component, 'menus$', {
        writable: true,
        value: of(
          mockFoodDetails.map((menu) => {
            if (menu.id === 2) {
              menu.quantity = 1;
            }
            return menu;
          })
        ),
      });

      fixture.detectChanges();

      el.querySelector("[id='remove-btn-2']").click();
      expect(component.remove).toHaveBeenCalledTimes(1);

      Object.defineProperty(component, 'menus$', {
        writable: true,
        value: of(
          mockFoodDetails.map((menu) => {
            if (menu.id === 2) {
              menu.quantity = 0;
            }
            return menu;
          })
        ),
      });

      fixture.detectChanges();
      expect(el.querySelector("[id='add-btn-2']")).toBeFalsy();
      expect(el.querySelector("[id='remove-btn-2']")).toBeFalsy();
      expect(el.querySelector("[id='quantity-input-2']")).toBeFalsy();
      expect(el.querySelector("[id='add2']")).toBeTruthy();
    });
  });
});
