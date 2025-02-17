import { CommonModule } from '@angular/common';
import { Component, OnInit, Output } from '@angular/core';

import { CountryTableComponent } from '../../components/country-table/country-table.component';
import { Country } from '../../interfaces/country.interface';
import { Region } from '../../interfaces/region.type';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``,
  imports: [CommonModule, CountryTableComponent]
})
export class ByRegionPageComponent implements OnInit {

  public countries: Country[] = [];
  public regions:Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public regionSelected?: Region;

  ngOnInit():void {
    this.countries = this.contriesService.cacheStore.byRegion.countries;
    this.regionSelected = this.contriesService.cacheStore.byRegion.region;
    console.log('ByRegionPageComponent.ngOnInit - regionSelected:', this.regionSelected)
  }

  constructor(private readonly contriesService: CountriesService) { }

  searchByRegion(region: Region): void {
    this.regionSelected = region;
    this.contriesService.searchRegion(region)
      .subscribe(countries => {
        console.log('Desde ByRegionPageComponent');
        this.countries = countries;
      })
  }

}
