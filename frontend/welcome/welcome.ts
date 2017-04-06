import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { Component } from '@angular/core';
import { NgModule } from '@angular/core';


@Component({
  template: require('./welcome.pug')(),
  styles: ['h2 { color: red; } ']
})

export class WelcomeComponent {

	test = 1

	do() { 
		
		this.test++;

	}

}

const routes: Routes = [
  { path: '', component: WelcomeComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);


@NgModule({
  imports: [routing],
  declarations: [WelcomeComponent]
})

export class WelcomeModule {}