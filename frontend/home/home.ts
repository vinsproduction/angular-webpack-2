import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { Component } from '@angular/core';
import { NgModule } from '@angular/core';


@Component({
  template: require('./home.pug')(),
  styles: ['h2 { color: green; }']
})

export class HomeComponent {

	test = 'Wow'

}

const routes: Routes = [
  { path: '', outlet: 'pages', component: HomeComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);


@NgModule({
  imports: [routing],
  declarations: [HomeComponent]
})

export class HomeModule {}