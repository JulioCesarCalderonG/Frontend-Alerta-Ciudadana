import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  private debounceTimer?:NodeJS.Timeout;
  constructor() { }

  ngOnInit(): void {
  }
  onQueryChanged(query:string=''){
    if(this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer=setTimeout(() => {
      console.log('Mandar este query', query);

    }, 350);
  }
}
