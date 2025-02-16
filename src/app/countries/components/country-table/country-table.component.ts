import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { Country } from '../../interfaces/country';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'countries-table',
  templateUrl: './country-table.component.html',
  styleUrls: ['./country-table.component.css'],
  imports: [CommonModule, RouterModule]
})
export class CountryTableComponent implements OnInit {

  @Input()
  public countries: Country[] = [];

  constructor() { }

  ngOnInit() {
  }

}
