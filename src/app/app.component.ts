import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth/auth.service';
import {UpdateService} from "./shared/service-worker/update.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    title = 'frontend-hideyoshi.com';

    constructor(private authService: AuthService, private serviceWorker: UpdateService) {
        this.serviceWorker.checkForUpdates();
    }

    ngOnInit(): void {
        this.authService.autoLogin();
    }

}
