import { Component, OnInit, Output } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
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
export class ByCountryPageComponent implements OnInit  {

  public countries: Country[] = [];

  @Output()
  public initialValueBy: string = '';

  constructor(private readonly contriesService: CountriesService) { }

  ngOnInit():void {
    this.countries = this.contriesService.cacheStore.byCountries.countries;
    this.initialValueBy = this.contriesService.cacheStore.byCountries.term;
    console.log('ByCountryPageComponent.initialValueBy:', this.initialValueBy)
  }

  searchByCountry(term: string): void {
    this.contriesService.searchCountry(term)
      .subscribe(countries => {
        console.log('Desde ByCountryPageComponent');
        this.countries = countries;
      })
  }

}
