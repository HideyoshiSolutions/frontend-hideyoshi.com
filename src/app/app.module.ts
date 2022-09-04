import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderModule } from './header/header.module';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { AppRouterModule } from './app-router.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppServiceWorkerModule } from './app-service-worker.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        HeaderModule,
        AppRouterModule,
        AppServiceWorkerModule,
        SharedModule,
        FontAwesomeModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
