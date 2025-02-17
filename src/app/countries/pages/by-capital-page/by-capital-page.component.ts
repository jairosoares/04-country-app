import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output } from '@angular/core';

import { SearchBoxComponent } from '../../../shared/components/search-box/search-box.component';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';
import { CountryTableComponent } from "../../components/country-table/country-table.component";
import { LoadingSpinnerComponent } from "../../../shared/components/loading-spinner/loading-spinner.component";

@Component({
  selector: 'country-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``,
  imports: [SearchBoxComponent, CommonModule, CountryTableComponent, LoadingSpinnerComponent]
})
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = [];

  public isLoading: boolean = false;

  @Output()
  public initialValueBy: string = '';

  ngOnInit():void {
    this.countries = this.contriesService.cacheStore.byCapital.countries;
    this.initialValueBy = this.contriesService.cacheStore.byCapital.term;
    console.log('ByCapitalPageComponent.initialValueByCapital:', this.initialValueBy)
  }

  constructor(private readonly contriesService: CountriesService) { }

  searchByCapital(term: string): void {
    this.isLoading = true;
    this.contriesService.searchCapital(term)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      })
  }


}
