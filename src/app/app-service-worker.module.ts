import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';



@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            registrationStrategy: 'registerWhenStable:30000'
        })
    ],
    exports: [
        ServiceWorkerModule
    ]
})
export class AppServiceWorkerModule { }
