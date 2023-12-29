import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderModule } from './header/header.module';
import { SharedModule } from './shared/shared.module';
import { AppRouterModule } from './app-router.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppServiceWorkerModule } from './app-service-worker.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FooterComponent } from './footer/footer.component';
import {HomeModule} from "./home/home.module";
import {ProjectsModule} from "./projects/projects.module";

@NgModule({
    declarations: [AppComponent, FooterComponent],
    imports: [
        BrowserModule,
        HeaderModule,
        HomeModule,
        ProjectsModule,
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
export class AppModule {}
