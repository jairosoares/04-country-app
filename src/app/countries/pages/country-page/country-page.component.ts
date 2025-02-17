import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``,
  imports: [CommonModule]
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  constructor(
    private readonly activatedRoute:ActivatedRoute,
    private readonly router: Router,
    private readonly countriesService:CountriesService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.countriesService.searchCountryByAlphaCode( id )),
      ).subscribe( country => {
          if (!country) return this.router.navigateByUrl('');
          return this.country = country;
    });

  }

}
