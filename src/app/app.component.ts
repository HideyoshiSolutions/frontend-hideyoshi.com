import {Component, OnInit} from '@angular/core';
import {AuthService} from './shared/service/auth.service';
import {UpdateService} from './shared/service-worker/update.service';
import {NgcCookieConsentService, NgcStatusChangeEvent,} from 'ngx-cookieconsent';
import {Subscription} from 'rxjs';
import {CookieConsertService} from './shared/cookie-consent/cookie-consert.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    title = 'frontend-hideyoshi.com';

    cookieStatusChangeSubscription!: Subscription;

    constructor(
        private authService: AuthService,
        private ccService: NgcCookieConsentService,
        private cookieConsentService: CookieConsertService,
        private serviceWorker: UpdateService,
    ) {
        this.serviceWorker.checkForUpdates();
    }

    ngOnInit(): void {
        this.authService.autoLogin();

        let cookieConsentStatus =
            this.cookieConsentService.getCookieConsentStatusFromLocalStorage();

        if (cookieConsentStatus) {
            this.ccService.destroy();
        }

        this.cookieStatusChangeSubscription =
            this.ccService.statusChange$.subscribe(
                (event: NgcStatusChangeEvent) => {
                    if (event.status === 'allow') {
                        this.cookieConsentService.consent();
                    } else if (event.status === 'deny') {
                        this.cookieConsentService.decline();
                    }
                },
            );
    }
}
