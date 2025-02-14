import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from '../../../shared/components/search-box/search-box.component';
import { CountryTableComponent } from '../../components/country-table/country-table.component';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``,
  imports: [SearchBoxComponent, CommonModule, CountryTableComponent]
})
export class ByCountryPageComponent {

  public countries: Country[] = [];

  constructor(private readonly contriesService: CountriesService) { }

  searchByCountry(term: string): void {
    this.contriesService.searchCountry(term)
      .subscribe(countries => {
        console.log('Desde ByCountryPageComponent');
        this.countries = countries;
      })
  }

}
