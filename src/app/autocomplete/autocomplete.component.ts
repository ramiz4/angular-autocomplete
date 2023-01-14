import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface AutocompleteOptions {
  apiUrl: string;
  queryParam: string;
  resultsProp: string;
  viewProp: string;
  placeholder?: string;
  noResultText?: string;
  loadingText?: string;
}

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
})
export class AutocompleteComponent implements OnInit {
  @Output() selected = new EventEmitter<any>();
  @Input() options: AutocompleteOptions;

  selectedValue: string = '';
  results$: Observable<any>;
  loading: boolean;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.setDefaultValues();
  }

  search(event: any) {
    const searchTerm = event.target.value;
    if (!searchTerm) {
      this.loading = false;
      this.results$ = null;
      return;
    }
    this.loading = true;
    this.results$ = this.http
      .get(`${this.options.apiUrl}?${this.options.queryParam}=${searchTerm}`)
      .pipe(
        tap({
          next: (val) => {
            console.log('on next', val);
          },
          error: (error) => {
            console.log('on error', error.message);
          },
          complete: () => {
            console.log('on complete');
            this.loading = false;
          },
        })
      );
  }

  select(result: any) {
    this.selectedValue = result[this.options.viewProp];
    this.selected.emit(result);
    this.results$ = null;
  }

  private setDefaultValues() {
    if (!this.options.placeholder) {
      this.options.placeholder = 'Search';
    }
    if (!this.options.noResultText) {
      this.options.noResultText = 'No results.';
    }
    if (!this.options.loadingText) {
      this.options.loadingText = 'Loading...';
    }
  }
}
