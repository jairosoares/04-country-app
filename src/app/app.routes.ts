import { Routes } from '@angular/router';
import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';

export const APP_ROUTES: Routes = [
  // {
  //   path: '',
  //   component: HomePageComponent
  // },
  {
    path: 'about',
    component: AboutPageComponent
  },
  {
    path: 'contact',
    component: ContactPageComponent
  },
  { path: 'countries',
    loadChildren: () => import('./countries/countries-routes').then(m => m.COUNTRIES_ROUTES)
  },
  {
    path: '**',
    redirectTo: 'countries'
  }
];
