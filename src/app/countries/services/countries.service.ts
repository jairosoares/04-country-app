import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { CacheStore } from '../interfaces/cache-store.interface';
import { Country } from '../interfaces/country.interface';
import { Region } from './../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private url: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital:    {term: '', countries: []},
    byCountries:  {term: '', countries: []},
    byRegion:     {region: '', countries: []}
  }

  constructor(private httpClient: HttpClient) {
    this.loadFromLocalStorage();
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {

    const url = `${ this.url }/alpha/${code}`;

    return this.httpClient.get<Country[]>( url )
      .pipe(
        map( countries => countries.length > 0 ? countries[0] : null),
        catchError( () => of(null)) //Se nao encontrou nada, retorna null
      );

  }

  searchCapital(term: string): Observable<Country[]> {

    const url = `${ this.url }/capital/${term}`;

    return this.getCountryRequest(url)
      .pipe(
        tap( () => console.log("CountriesService.searchCapital - term:", term )),
        tap( countries => this.cacheStore.byCapital = { term, countries }),
        tap( () => this.saveToLocalStorage())
      );

  }

  searchCountry(term: string): Observable<Country[]> {

    const url = `${ this.url }/name/${term}`;

    return this.getCountryRequest(url)
    .pipe(
      tap( () => console.log("CountriesService.searchCountry - term:", term )),
      tap( countries => this.cacheStore.byCountries = { term, countries }),
      tap( () => this.saveToLocalStorage())
    );


  }

  searchRegion(region: Region): Observable<Country[]> {

    const url = `${ this.url }/region/${region}`;

    return this.getCountryRequest(url)
    .pipe(
      tap( () => console.log("CountriesService.searchRegion - region:", region )),
      tap( countries => this.cacheStore.byRegion = { region, countries }),
      tap( () => this.saveToLocalStorage())
    );

  }

  private getCountryRequest(url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>( url )
    .pipe(
      catchError( () => of([])), //Se nao encontrou nada, retorna array vazio
    );
  }

  private loadFromLocalStorage():void {
    if (!localStorage.getItem( 'cacheStore')) return;
    this.cacheStore = JSON.parse( localStorage.getItem( 'cacheStore')! );

  }

  private saveToLocalStorage():void {
    localStorage.setItem( 'cacheStore', JSON.stringify(this.cacheStore));
  }

}
