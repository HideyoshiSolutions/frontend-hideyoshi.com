import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HeaderModule} from './header/header.module';
import {SharedModule} from './shared/shared.module';
import {AppRouterModule} from './app-router.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AppServiceWorkerModule} from './app-service-worker.module';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {FooterComponent} from './footer/footer.component';
import {Object} from "@sinclair/typebox";
import {Router} from "@angular/router";

@NgModule({
    declarations: [AppComponent, FooterComponent],
    imports: [
        BrowserModule,
        HeaderModule,
        AppRouterModule,
        AppServiceWorkerModule,
        SharedModule,
        FontAwesomeModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            registrationStrategy: 'registerWhenStable:30000',
        }),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {

    constructor(private router: Router) {
        if (environment.production) {
            this.disableDevTools();
        }
    }

    private disableDevTools() {
        const t0 = Date.now();
        eval('debugger');
        const t1 = Date.now();

        console.log('DevTools is open: ', t1 - t0);
        if (t1 - t0 > 100) {
            window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
        }
    }
}
