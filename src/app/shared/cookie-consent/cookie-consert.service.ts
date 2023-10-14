import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root',
})
export class CookieConsertService {
    private storage: Storage;

    cookieStatusChangeSubscription!: BehaviorSubject<boolean>;

    constructor(private cookieService: CookieService) {
        this.storage = window.localStorage;

        this.cookieStatusChangeSubscription = new BehaviorSubject<boolean>(
            this.getCookieConsentStatusFromLocalStorage(),
        );
    }

    consent() {
        let status = true;

        this.cookieStatusChangeSubscription.next(status);
        this.setCookieConsentStatusToLocalStorage(status);
    }

    decline() {
        let status = false;

        this.cookieStatusChangeSubscription.next(status);
        this.setCookieConsentStatusToLocalStorage(status);

        this.cookieService.deleteAll();
    }

    setCookieConsentStatusToLocalStorage(status: boolean) {
        this.storage.setItem('cookieConsentStatus', status.toString());
    }

    getCookieConsentStatusFromLocalStorage(): boolean {
        let status = this.storage.getItem('cookieConsentStatus');

        if (status === null) {
            return false;
        }

        return status === 'true';
    }
}
