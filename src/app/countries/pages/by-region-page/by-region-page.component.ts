import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from '../../../shared/components/search-box/search-box.component';
import { CountryTableComponent } from '../../components/country-table/country-table.component';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``,
  imports: [SearchBoxComponent, CommonModule, CountryTableComponent]
})
export class ByRegionPageComponent {

  public countries: Country[] = [];

  constructor(private readonly contriesService: CountriesService) { }

  searchByRegion(term: string): void {
    this.contriesService.searchRegion(term)
      .subscribe(countries => {
        console.log('Desde ByRegionPageComponent');
        this.countries = countries;
      })
  }

}
