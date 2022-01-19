import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { IMenu, ISpeciality } from '../state/model';

@Injectable({
  providedIn: 'root',
})
export class KitchenService {
  constructor() {
    this.getStorage();
  }

  foodDetails: IMenu[] = [
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
    {
      id: 3,
      foodName: 'Chicken Burger',
      foodDetails:
        'All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.',
      foodPrice: 1.5,
      foodImg:
        'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/xbeqlsck3p0kei53to7k',
      quantity: 0,
    },
    {
      id: 4,
      foodName: 'Veg Wrap',
      foodDetails:
        'All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.',
      foodPrice: 1,
      foodImg:
        'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/l2ng6gtge30sqaafqng7',
      quantity: 0,
    },
    {
      id: 5,
      foodName: 'Indulgence Brownie',
      foodDetails:
        '(Eggless) Indulge in richly decadent chocolate brownie crafted with love & topped with bitter-sweet chocolate that provides ultra-rich chocolate experience.',
      foodPrice: 1,
      foodImg:
        'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/iqlmbg1hlyc0dspdyzzv',
      quantity: 0,
    },
    {
      id: 6,
      foodName: 'Oreo Cheesecake Ice Cream',
      foodDetails: 'Oreo ice cream',
      foodPrice: 2,
      foodImg:
        'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/wtj8esaeslvlscv8glj6',
      quantity: 0,
    },
    {
      id: 7,
      foodName: 'Ice cream Brownie',
      foodDetails:
        '(Eggless) Indulge in richly decadent chocolate brownie crafted with love & topped with bitter-sweet chocolate that provides ultra-rich chocolate experience.',
      foodPrice: 1,
      foodImg:
        'https://www.cookingclassy.com/wp-content/uploads/2020/04/small-batch-brownies-39-500x500.jpg',
      quantity: 0,
    },
    {
      id: 8,
      foodName: 'Ice Cream',
      foodDetails: 'Ice cream',
      foodPrice: 2,
      foodImg:
        'https://cdn2.atlantamagazine.com/wp-content/uploads/sites/4/2016/07/Screen-Shot-2016-07-08-at-5.20.40-PM.png',
      quantity: 0,
    },
    {
      id: 9,
      foodName: 'Cold Drink',
      foodDetails: 'Cold Drink',
      foodPrice: 2,
      foodImg:
        'https://d1yfjw4ro643jd.cloudfront.net/8_2021/bf18a511-eb32-49dc-a044-816d7f6bd04b.jpg',
      quantity: 0,
    },
  ];

  speciality: ISpeciality[] = [
    {
      id: 1,
      name: 'All cuisines',
      image: 'assets/img/speciality/all-cuisines.jpg',
    },
    {
      id: 2,
      name: 'Indian',
      image: 'assets/img/speciality/indian-cuisine.jpg',
    },
    {
      id: 3,
      name: 'Mexican',
      image: 'assets/img/speciality/mexican-cuisine.jpg',
    },
    {
      id: 4,
      name: 'Italian',
      image: 'assets/img/speciality/italian-cuisine.jpg',
    },
  ];

  getMenus(): Observable<IMenu[]> {
    this.setStorage();
    return of(this.foodDetails).pipe(delay(1500));
  }

  getSpeciality(): Observable<ISpeciality[]> {
    this.setStorage();
    return of(this.speciality).pipe(delay(1500));
  }

  getCartMenus(): Observable<IMenu[]> {
    this.foodDetails.filter((menu) => menu.quantity > 0);
    return of(this.foodDetails);
  }

  putMenus(menuId: number, quantity: number): Observable<IMenu[]> {
    this.foodDetails.map((menu) => {
      if (menu.id === menuId) {
        menu.quantity = quantity;
      }
      return menu;
    });

    this.setStorage();
    return of(this.foodDetails);
  }

  deleteMenus() {
    this.foodDetails.map((menu) => {
      menu.quantity = 0;
      return menu;
    });
    this.setStorage();
    return of(this.foodDetails);
  }
  
  private getStorage() {
    if ('foodDetails' in localStorage) {
      this.foodDetails = JSON.parse(localStorage.getItem('foodDetails')!);
    }
  }
  private setStorage() {
    localStorage.clear();
    localStorage.setItem('foodDetails', JSON.stringify(this.foodDetails));
  }
}
