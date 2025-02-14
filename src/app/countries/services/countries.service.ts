import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private url: string = 'https://restcountries.com/v3.1';

  constructor(private httpClient: HttpClient) { }

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

    return this.httpClient.get<Country[]>( url )
      .pipe(
        catchError( () => of([])) //Se nao encontrou nada, retorna array vazio
      );

  }

  searchCountry(term: string): Observable<Country[]> {

    const url = `${ this.url }/name/${term}`;

    return this.httpClient.get<Country[]>( url )
      .pipe(
        catchError( () => of([])) //Se nao encontrou nada, retorna array vazio
      );

  }

  searchRegion(region: string): Observable<Country[]> {

    const url = `${ this.url }/region/${region}`;

    return this.httpClient.get<Country[]>( url )
      .pipe(
        catchError( () => of([])) //Se nao encontrou nada, retorna array vazio
      );

  }

}
