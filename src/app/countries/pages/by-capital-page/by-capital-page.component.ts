import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { SearchBoxComponent } from '../../../shared/components/search-box/search-box.component';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { CountryTableComponent } from "../../components/country-table/country-table.component";

@Component({
  selector: 'country-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``,
  imports: [SearchBoxComponent, CommonModule, CountryTableComponent]
})
export class ByCapitalPageComponent {

  public countries: Country[] = [];

  constructor(private readonly contriesService: CountriesService) { }

  searchByCapital(term: string): void {
    this.contriesService.searchCapital(term)
      .subscribe(countries => {
        console.log('Desde ByCapitalPage');
        this.countries = countries;
      })
  }

}
