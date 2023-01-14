import { Component, VERSION } from '@angular/core';
import { AutocompleteOptions } from './autocomplete/autocomplete.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  options: AutocompleteOptions = {
    apiUrl: 'https://dummyjson.com/products/search',
    queryParam: 'q',
    resultsProp: 'products',
    viewProp: 'title',
    // placeholder: 'Search products: e.g. Laptop',
    // noResultText: 'No product found!',
    // loadingText: 'Looking for products, please wait...',
  };
}
