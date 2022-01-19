import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetSpeciality } from '../../state/kitchen.actions';
import { KitchenSelectors } from '../../state/kitchen.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private state: Store) {}
  specility$ = this.state.select(KitchenSelectors.specility);
  specilityLoading$ = this.state.select(KitchenSelectors.specilityLoading);

  ngOnInit(): void {
    this.state.dispatch(new GetSpeciality());
  }
}
