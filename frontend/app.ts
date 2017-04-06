
import { APP_BASE_HREF } from '@angular/common';
import { enableProdMode, NgModule,  Component} from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RouterModule, Routes, Router } from '@angular/router';


/******* MAIN APP LAYOUT */

@Component({
  selector: 'main',
  styles: [':host /deep/ *{ font: 18px Arial !important; }'],
  template: `
  <nav>
    <a routerLink="/welcome" routerLinkActive="active">Welcome</a>
   	<a [routerLink]="['/home',{ outlets: { pages: ['home'] } }]" routerLinkActive="active">Home</a>
    <a [routerLink]="[{ outlets: { popup: ['message'] } }]">Popup</a>
  </nav>
  <router-outlet></router-outlet>
  <router-outlet name="pages"></router-outlet>
  <router-outlet name="popup"></router-outlet>
  `
})

export class AppComponent { }


/******* PAGE 1 */

@Component({
  template: '<h2>Page not found</h2>'
})

export class PageNotFoundComponent { }

/******* POPUP */

@Component({
  template: '<h3>Popup</h3><button (click)="closePopup()">Close</button>',
  styles: [ ':host { position:absolute;top:100px;padding:20px;left:100px;opacity:0.8;width:500px;height:500px;background:green;}' ],
})

export class PopupComponent {

	constructor(private router: Router) {}

	closePopup() {
    // Providing a `null` value to the named outlet
    // clears the contents of the named outlet
    this.router.navigate([{ outlets: { popup: null }}]);
  }

}

/******* ROUTES */

const appRoutes: Routes = [
 	
 	/******* PAGE 2 (Lazy) */
  {
  	path: 'welcome',
  	loadChildren: './welcome/welcome#WelcomeModule?chunkName=welcome'
  },

  /******* PAGE 3 (Lazy) */
  {
  	path: 'home',
  	loadChildren: './home/home#HomeModule?chunkName=home'
  },

  /******* Popup */
  {
    path: 'message',
    outlet: 'popup',
    component: PopupComponent,
  
  },

  {path: '',  redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}

];

/******* MAIN APP MODULE */

@NgModule({
	providers: [
		{
			provide: APP_BASE_HREF,
			useValue : '/' 
		}
	],
  imports: [
  	BrowserModule,
    RouterModule.forRoot(appRoutes,{
    	useHash: false // If you need a hash
    }),
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    PopupComponent
  ],
  bootstrap: [
  	AppComponent
  ]
})


export class AppModule {}


/******* RUN APP */

console.log("ENV " + process.env.ENV);

if (process.env.ENV !== 'development') {
	enableProdMode();
}

document.addEventListener("DOMContentLoaded", function(event) {
	console.log('App init');
	platformBrowserDynamic().bootstrapModule(AppModule);
});


